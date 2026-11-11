/* ============================================================
   IRON LOG — IndexedDB Persistence Layer
   Robust client-side database management via native browser IndexedDB
   ============================================================ */

const DB_NAME = "IronLogDB";
const DB_VERSION = 6;

let dbInstance = null;

/**
 * Opens or initializes the IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
function initDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      return resolve(dbInstance);
    }

    if (!window.indexedDB) {
      return reject(new Error("IndexedDB is not supported by this browser."));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 1. Exercises Store
      if (!db.objectStoreNames.contains("exercises")) {
        const exerciseStore = db.createObjectStore("exercises", { keyPath: "id" });
        exerciseStore.createIndex("muscleGroup", "muscleGroup", { unique: false });
        exerciseStore.createIndex("order", "order", { unique: false });
      }

      // 2. Progression Store
      if (!db.objectStoreNames.contains("progression")) {
        const progressionStore = db.createObjectStore("progression", { keyPath: "exerciseId" });
        progressionStore.createIndex("lastUpdated", "lastUpdated", { unique: false });
      }

      // 3. Preferences Store
      if (!db.objectStoreNames.contains("preferences")) {
        db.createObjectStore("preferences", { keyPath: "key" });
      }
    };

    request.onsuccess = async (event) => {
      dbInstance = event.target.result;

      dbInstance.onversionchange = () => {
        dbInstance.close();
        dbInstance = null;
      };

      try {
        await seedDefaultExercisesIfNeeded();
        resolve(dbInstance);
      } catch (err) {
        console.error("Error during database seeding:", err);
        resolve(dbInstance);
      }
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Seeds initial exercises if the exercises store is empty,
 * or backfills YouTube embed codes on default exercises.
 */
async function seedDefaultExercisesIfNeeded() {
  const existing = await getAllExercises();
  if (existing.length === 0 && typeof INITIAL_EXERCISES !== "undefined") {
    const tx = dbInstance.transaction(["exercises", "progression"], "readwrite");
    const store = tx.objectStore("exercises");
    INITIAL_EXERCISES.forEach((ex) => store.put(ex));

    if (typeof INITIAL_PROGRESSION !== "undefined" && Array.isArray(INITIAL_PROGRESSION)) {
      const progStore = tx.objectStore("progression");
      INITIAL_PROGRESSION.forEach((p) => progStore.put(p));
    }

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } else if (existing.length > 0 && typeof INITIAL_EXERCISES !== "undefined") {
    const tx = dbInstance.transaction(["exercises", "progression"], "readwrite");
    const store = tx.objectStore("exercises");
    const existingIds = new Set(existing.map((item) => item.id));

    // 1. Remove "chest-standing-fly" if it was previously saved in the database
    if (existingIds.has("chest-standing-fly")) {
      store.delete("chest-standing-fly");
    }

    // 2. Remove legacy custom chest pullover id so standard "chest-pullover" is used
    if (existingIds.has("custom-1794364964997-9vxo4")) {
      store.delete("custom-1794364964997-9vxo4");
    }

    // 3. Seed any starter exercises that don't exist yet (including chest-pullover)
    INITIAL_EXERCISES.forEach((starterEx) => {
      if (!existingIds.has(starterEx.id) || starterEx.id === "chest-pullover") {
        store.put(starterEx);
      }
    });

    // 4. Update default exercises with the latest official YouTube embed codes & IDs
    existing.forEach((item) => {
      if (item.id === "chest-standing-fly" || item.id === "custom-1794364964997-9vxo4") return;

      const defaultMatch = INITIAL_EXERCISES.find((i) => i.id === item.id);
      if (defaultMatch) {
        let changed = false;
        if (item.isCustom) {
          delete item.isCustom;
          changed = true;
        }
        if (defaultMatch.youtubeId && item.youtubeId !== defaultMatch.youtubeId) {
          item.youtubeId = defaultMatch.youtubeId;
          changed = true;
        }
        if (defaultMatch.rawEmbedCode && item.rawEmbedCode !== defaultMatch.rawEmbedCode) {
          item.rawEmbedCode = defaultMatch.rawEmbedCode;
          changed = true;
        }
        if (defaultMatch.name && item.name !== defaultMatch.name) {
          item.name = defaultMatch.name;
          changed = true;
        }
        if (defaultMatch.defaultReps && item.defaultReps !== 12) {
          item.defaultReps = 12;
          changed = true;
        }
        if (changed) {
          store.put(item);
        }
      }
    });

    // 3. Seed progression if currently empty
    if (typeof INITIAL_PROGRESSION !== "undefined" && Array.isArray(INITIAL_PROGRESSION)) {
      const progStore = tx.objectStore("progression");
      const countReq = progStore.count();
      countReq.onsuccess = () => {
        if (countReq.result === 0) {
          INITIAL_PROGRESSION.forEach((p) => progStore.put(p));
        }
      };
    }

    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  }
}

/**
 * Retrieves all exercises from IndexedDB.
 * @returns {Promise<Array>}
 */
async function getAllExercises() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["exercises"], "readonly");
    const store = tx.objectStore("exercises");
    const request = store.getAll();

    request.onsuccess = () => {
      const items = request.result || [];
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves exercises for a specific muscle group, ordered by their 'order' index.
 * @param {string} muscleGroup
 * @returns {Promise<Array>}
 */
async function getExercisesByGroup(muscleGroup) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["exercises"], "readonly");
    const store = tx.objectStore("exercises");
    const index = store.index("muscleGroup");
    const request = index.getAll(IDBKeyRange.only(muscleGroup));

    request.onsuccess = () => {
      const items = request.result || [];
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Gets a single exercise by ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function getExerciseById(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["exercises"], "readonly");
    const store = tx.objectStore("exercises");
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Adds a new exercise with YouTube embed code validation.
 * @param {Object} exercise
 * @returns {Promise<Object>}
 */
async function addExercise(exercise) {
  const db = await initDB();
  const id = exercise.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const groupExercises = await getExercisesByGroup(exercise.muscleGroup);
  const nextOrder = groupExercises.length > 0 ? Math.max(...groupExercises.map((e) => e.order ?? 0)) + 1 : 0;

  let yId = exercise.youtubeId || null;
  let rawCode = exercise.rawEmbedCode || "";

  if (exercise.rawEmbedCode !== undefined && typeof parseAndValidateYouTubeEmbed === "function") {
    const parsed = parseAndValidateYouTubeEmbed(exercise.rawEmbedCode);
    if (!parsed.valid) {
      throw new Error(parsed.error || "Invalid YouTube embed code.");
    }
    yId = parsed.videoId;
    rawCode = parsed.raw;
  } else if (yId && !rawCode && typeof buildStandardEmbedCode === "function") {
    rawCode = buildStandardEmbedCode(yId);
  }

  const fullRecord = {
    id,
    name: exercise.name.trim(),
    muscleGroup: exercise.muscleGroup,
    equipment: (exercise.equipment || "dumbbell").trim().toLowerCase(),
    defaultSets: Number(exercise.defaultSets) || DEFAULT_SETS,
    defaultReps: Number(exercise.defaultReps) || DEFAULT_REPS,
    order: exercise.order !== undefined ? exercise.order : nextOrder,
    youtubeId: yId,
    rawEmbedCode: rawCode,
    isCustom: true,
    createdAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["exercises"], "readwrite");
    const store = tx.objectStore("exercises");
    const request = store.put(fullRecord);

    request.onsuccess = () => resolve(fullRecord);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Updates an existing exercise with YouTube embed code validation.
 * @param {Object} exercise
 * @returns {Promise<Object>}
 */
async function updateExercise(exercise) {
  const db = await initDB();
  const existing = await getExerciseById(exercise.id);
  if (!existing) {
    throw new Error(`Exercise with ID ${exercise.id} not found.`);
  }

  let yId = existing.youtubeId || null;
  let rawCode = existing.rawEmbedCode || "";

  if (exercise.rawEmbedCode !== undefined && typeof parseAndValidateYouTubeEmbed === "function") {
    const parsed = parseAndValidateYouTubeEmbed(exercise.rawEmbedCode);
    if (!parsed.valid) {
      throw new Error(parsed.error || "Invalid YouTube embed code.");
    }
    yId = parsed.videoId;
    rawCode = parsed.raw;
  } else if (exercise.youtubeId !== undefined) {
    yId = exercise.youtubeId;
    if (yId && !rawCode && typeof buildStandardEmbedCode === "function") {
      rawCode = buildStandardEmbedCode(yId);
    }
  }

  const updatedRecord = {
    ...existing,
    name: exercise.name !== undefined ? exercise.name.trim() : existing.name,
    muscleGroup: exercise.muscleGroup || existing.muscleGroup,
    equipment: exercise.equipment !== undefined ? exercise.equipment.trim().toLowerCase() : existing.equipment,
    defaultSets: exercise.defaultSets !== undefined ? Number(exercise.defaultSets) : existing.defaultSets,
    defaultReps: exercise.defaultReps !== undefined ? Number(exercise.defaultReps) : existing.defaultReps,
    order: exercise.order !== undefined ? exercise.order : existing.order,
    youtubeId: yId,
    rawEmbedCode: rawCode,
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["exercises"], "readwrite");
    const store = tx.objectStore("exercises");
    const request = store.put(updatedRecord);

    request.onsuccess = () => resolve(updatedRecord);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Deletes an exercise and its progression data.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function deleteExercise(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["exercises", "progression"], "readwrite");
    const exStore = tx.objectStore("exercises");
    const progStore = tx.objectStore("progression");

    exStore.delete(id);
    progStore.delete(id);

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Reorders exercises within a muscle group.
 * @param {string} muscleGroup
 * @param {string[]} orderedIds - array of exercise IDs in new sequence
 * @returns {Promise<void>}
 */
async function reorderExercises(muscleGroup, orderedIds) {
  const db = await initDB();
  const tx = db.transaction(["exercises"], "readwrite");
  const store = tx.objectStore("exercises");

  return new Promise((resolve, reject) => {
    orderedIds.forEach((id, index) => {
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const item = getReq.result;
        if (item) {
          item.order = index;
          store.put(item);
        }
      };
    });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ============================================================
   PROGRESSION TRACKING (IndexedDB)
   ============================================================ */

/**
 * Loads progression for a specific exercise.
 * @param {string} exerciseId
 * @returns {Promise<Object|null>}
 */
async function getProgression(exerciseId) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["progression"], "readonly");
    const store = tx.objectStore("progression");
    const request = store.get(exerciseId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves completed sets progression for an exercise, maintaining previous sessions history.
 * @param {string} exerciseId
 * @param {Array<number|null>} setsData
 * @returns {Promise<Object>}
 */
async function saveProgression(exerciseId, setsData) {
  const db = await initDB();
  const existing = await getProgression(exerciseId);

  const history = existing && Array.isArray(existing.history) ? [...existing.history] : [];
  const sessionEntry = {
    timestamp: Date.now(),
    dateString: new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    sets: setsData,
  };
  history.unshift(sessionEntry);
  if (history.length > 30) history.pop();

  const record = {
    exerciseId,
    lastSets: setsData,
    lastUpdated: Date.now(),
    history,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["progression"], "readwrite");
    const store = tx.objectStore("progression");
    const request = store.put(record);

    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

/* ============================================================
   DATA EXPORT & IMPORT (IndexedDB)
   ============================================================ */

/**
 * Exports all application data into a portable JSON object.
 * @returns {Promise<Object>}
 */
async function exportAllData() {
  const db = await initDB();

  const [exercises, progressions] = await Promise.all([
    new Promise((resolve, reject) => {
      const tx = db.transaction(["exercises"], "readonly");
      const req = tx.objectStore("exercises").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    }),
    new Promise((resolve, reject) => {
      const tx = db.transaction(["progression"], "readonly");
      const req = tx.objectStore("progression").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    }),
  ]);

  return {
    appName: "RepFlow",
    schemaVersion: 3,
    exportedAt: new Date().toISOString(),
    muscleGroups: MUSCLE_GROUPS.map((g) => g.id),
    exercises,
    progression: progressions,
  };
}

/**
 * Validates and imports data into IndexedDB.
 * @param {Object} data - imported JSON data
 * @param {boolean} overwrite - whether to clear existing data
 * @returns {Promise<{success: boolean, message: string, count: number}>}
 */
async function importAllData(data, overwrite = false) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid import file format.");
  }

  if (!Array.isArray(data.exercises)) {
    throw new Error("Import data must contain an 'exercises' list.");
  }

  const validGroups = MUSCLE_GROUPS.map((g) => g.id);
  const validatedExercises = [];

  for (const item of data.exercises) {
    if (!item.name || typeof item.name !== "string") {
      throw new Error(`Exercise is missing a valid name: ${JSON.stringify(item)}`);
    }
    if (!item.muscleGroup || !validGroups.includes(item.muscleGroup)) {
      throw new Error(`Exercise "${item.name}" has invalid muscle group: ${item.muscleGroup}`);
    }

    let yId = item.youtubeId || null;
    let rawCode = item.rawEmbedCode || "";

    if (rawCode && typeof parseAndValidateYouTubeEmbed === "function") {
      const parsed = parseAndValidateYouTubeEmbed(rawCode);
      if (parsed.valid && parsed.videoId) {
        yId = parsed.videoId;
      }
    } else if (yId && !rawCode && typeof buildStandardEmbedCode === "function") {
      rawCode = buildStandardEmbedCode(yId);
    }

    validatedExercises.push({
      id: item.id || `import-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: item.name.trim(),
      muscleGroup: item.muscleGroup,
      equipment: (item.equipment || "dumbbell").trim().toLowerCase(),
      defaultSets: Number(item.defaultSets) || DEFAULT_SETS,
      defaultReps: Number(item.defaultReps) || DEFAULT_REPS,
      order: Number(item.order) || 0,
      youtubeId: yId,
      rawEmbedCode: rawCode,
      isCustom: Boolean(item.isCustom),
    });
  }

  const db = await initDB();
  const tx = db.transaction(["exercises", "progression"], "readwrite");
  const exStore = tx.objectStore("exercises");
  const progStore = tx.objectStore("progression");

  if (overwrite) {
    exStore.clear();
    progStore.clear();
  }

  validatedExercises.forEach((ex) => exStore.put(ex));

  if (Array.isArray(data.progression)) {
    data.progression.forEach((p) => {
      if (p.exerciseId) progStore.put(p);
    });
  }

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => {
      resolve({
        success: true,
        message: `Successfully imported ${validatedExercises.length} exercises.`,
        count: validatedExercises.length,
      });
    };
    tx.onerror = () => reject(tx.error);
  });
}
