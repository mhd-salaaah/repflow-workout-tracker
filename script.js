/* ============================================================
   IRON LOG — Application Logic & Controller
   Vanilla JavaScript with IndexedDB and Manual YouTube Embed Feature
   ============================================================ */

/* ---------------- App State ---------------- */
const appState = {
  currentMuscleGroup: null,
  searchTerm: "",
  activeExercises: [],
  deleteTargetId: null,
  pendingImportData: null,
};

/* ---------------- DOM Elements ---------------- */
const homeView = document.getElementById("homeView");
const exerciseView = document.getElementById("exerciseView");
const muscleGroupGrid = document.getElementById("muscleGroupGrid");
const exerciseList = document.getElementById("exerciseList");
const exerciseViewTitle = document.getElementById("exerciseViewTitle");
const exerciseCountBadge = document.getElementById("exerciseCountBadge");
const exerciseViewSubtitle = document.getElementById("exerciseViewSubtitle");
const backButton = document.getElementById("backButton");
const headerLogo = document.getElementById("headerLogo");
const breadcrumbHome = document.getElementById("breadcrumbHome");
const breadcrumbGroup = document.getElementById("breadcrumbGroup");
const noExercisesMessage = document.getElementById("noExercisesMessage");
const noExercisesAddBtn = document.getElementById("noExercisesAddBtn");
const globalAddBtn = document.getElementById("globalAddBtn");
const groupAddExerciseBtn = document.getElementById("groupAddExerciseBtn");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFileInput = document.getElementById("importFileInput");

// Guide Elements
const guideView = document.getElementById("guideView");
const guideNavBtn = document.getElementById("guideNavBtn");
const homeGuideLinkBtn = document.getElementById("homeGuideLinkBtn");
const guideBackToHomeBtn = document.getElementById("guideBackToHomeBtn");
const guideBreadcrumbHome = document.getElementById("guideBreadcrumbHome");

// Modals: Add / Edit Exercise
const exerciseModal = document.getElementById("exerciseModal");
const modalTitle = document.getElementById("modalTitle");
const exerciseForm = document.getElementById("exerciseForm");
const formExerciseId = document.getElementById("formExerciseId");
const formExerciseName = document.getElementById("formExerciseName");
const formEmbedCode = document.getElementById("formEmbedCode");
const embedCodeError = document.getElementById("embedCodeError");
const formMuscleGroup = document.getElementById("formMuscleGroup");
const formEquipment = document.getElementById("formEquipment");
const formDefaultSets = document.getElementById("formDefaultSets");
const formDefaultReps = document.getElementById("formDefaultReps");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalCancelBtn = document.getElementById("modalCancelBtn");

// Delete Modal
const deleteModal = document.getElementById("deleteModal");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const deleteModalCloseBtn = document.getElementById("deleteModalCloseBtn");
const deleteModalCancelBtn = document.getElementById("deleteModalCancelBtn");
const deleteModalConfirmBtn = document.getElementById("deleteModalConfirmBtn");

// History Modal
const historyModal = document.getElementById("historyModal");
const historyExerciseSubtitle = document.getElementById("historyExerciseSubtitle");
const historyModalContent = document.getElementById("historyModalContent");
const historyModalCloseBtn = document.getElementById("historyModalCloseBtn");
const historyModalDoneBtn = document.getElementById("historyModalDoneBtn");

// Import Modal
const importModal = document.getElementById("importModal");
const importSummaryText = document.getElementById("importSummaryText");
const importModalCloseBtn = document.getElementById("importModalCloseBtn");
const importModalCancelBtn = document.getElementById("importModalCancelBtn");
const importModalConfirmBtn = document.getElementById("importModalConfirmBtn");

// Toast Container
const toastContainer = document.getElementById("toastContainer");

/* ============================================================
   TOAST NOTIFICATION HELPER
   ============================================================ */
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast--error" : ""}`;
  toast.innerHTML = `
    <span>${type === "error" ? "⚠️" : "✓"}</span>
    <span>${escapeHtml(message)}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ============================================================
   HOME VIEW: 7 MUSCLE GROUP DASHBOARD
   ============================================================ */

/**
 * Renders the seven muscle groups with live exercise count badges.
 */
async function renderMuscleGroupGrid() {
  muscleGroupGrid.innerHTML = "";

  for (const group of MUSCLE_GROUPS) {
    const exercises = await getExercisesByGroup(group.id);
    const count = exercises.length;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "muscle-card";
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-label", `View ${group.label} exercises`);

    card.innerHTML = `
      <div class="muscle-card__top">
        <span class="muscle-card__icon" aria-hidden="true">${group.icon}</span>
        <span class="muscle-card__count">${count} ${count === 1 ? "Exercise" : "Exercises"}</span>
      </div>
      <div>
        <h2 class="muscle-card__name">${group.label}</h2>
        <p class="muscle-card__desc">${group.description || "Target routines & progression"}</p>
      </div>
      <div class="muscle-card__action">
        <span>View Routine</span>
        <span aria-hidden="true">&rarr;</span>
      </div>
    `;

    card.addEventListener("click", () => openMuscleGroup(group.id));
    muscleGroupGrid.appendChild(card);
  }
}

/* ============================================================
   NAVIGATION: HOME, EXERCISE LIST & GUIDE
   ============================================================ */

/**
 * Opens a specific muscle group workout page.
 * @param {string} groupId
 */
async function openMuscleGroup(groupId) {
  const group = MUSCLE_GROUPS.find((g) => g.id === groupId);
  if (!group) return;

  appState.currentMuscleGroup = groupId;

  exerciseViewTitle.textContent = group.label;
  breadcrumbGroup.textContent = group.label;
  exerciseViewSubtitle.textContent = `Log your ${group.label.toLowerCase()} sets and watch video demonstrations directly inside each card.`;

  homeView.classList.add("hidden");
  if (guideView) guideView.classList.add("hidden");
  exerciseView.classList.remove("hidden");
  backButton.classList.remove("hidden");

  await renderExercisesForCurrentGroup();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/**
 * Opens the dedicated Help & User Guide page.
 */
function openGuide() {
  appState.currentMuscleGroup = null;
  homeView.classList.add("hidden");
  exerciseView.classList.add("hidden");
  if (guideView) guideView.classList.remove("hidden");
  backButton.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/**
 * Returns to the home muscle group dashboard.
 */
async function goHome() {
  appState.currentMuscleGroup = null;
  exerciseView.classList.add("hidden");
  if (guideView) guideView.classList.add("hidden");
  homeView.classList.remove("hidden");
  backButton.classList.add("hidden");

  await renderMuscleGroupGrid();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ============================================================
   EXERCISE LIST RENDERING & CARDS
   ============================================================ */

/**
 * Loads exercises for current muscle group and renders cards.
 */
async function renderExercisesForCurrentGroup() {
  if (!appState.currentMuscleGroup) return;

  const allInGroup = await getExercisesByGroup(appState.currentMuscleGroup);
  appState.activeExercises = allInGroup;

  exerciseCountBadge.textContent = `${allInGroup.length} ${allInGroup.length === 1 ? "Exercise" : "Exercises"}`;

  exerciseList.innerHTML = "";

  if (allInGroup.length === 0) {
    noExercisesMessage.classList.remove("hidden");
    exerciseList.classList.add("hidden");
  } else {
    noExercisesMessage.classList.add("hidden");
    exerciseList.classList.remove("hidden");

    for (let i = 0; i < allInGroup.length; i++) {
      const exercise = allInGroup[i];
      const isFirst = i === 0;
      const isLast = i === allInGroup.length - 1;
      const cardEl = await buildExerciseCardElement(exercise, isFirst, isLast, allInGroup);
      exerciseList.appendChild(cardEl);
    }
  }
}

/**
 * Builds a single exercise card DOM element.
 * Displays exercise image normally when no embed code is provided.
 * Shows a "Watch Video" button if embed code exists, opening a video player inside that card.
 */
async function buildExerciseCardElement(exercise, isFirst, isLast, currentList) {
  const card = document.createElement("article");
  card.className = "exercise-card";
  card.dataset.id = exercise.id;

  const progressionData = await getProgression(exercise.id);
  const lastSets = progressionData ? progressionData.lastSets : null;

  const equipmentLabel = (exercise.equipment || "Dumbbell").toUpperCase();
  const hasVideo = Boolean(exercise.youtubeId);
  const exerciseImageUrl = createExerciseImage(exercise.name, exercise.muscleGroup, exercise.equipment);
  const thumbnailUrl = hasVideo ? `https://img.youtube.com/vi/${exercise.youtubeId}/hqdefault.jpg` : exerciseImageUrl;

  card.innerHTML = `
    <div class="exercise-card__header">
      <div class="exercise-card__title-wrap">
        <h2 class="exercise-card__name">${escapeHtml(exercise.name)}</h2>
        <div class="exercise-card__tags">
          <span class="badge badge--equipment">${escapeHtml(equipmentLabel)}</span>
          ${exercise.isCustom ? `<span class="badge badge--custom">Custom</span>` : ""}
          ${hasVideo ? `<span class="badge" style="background-color: rgba(255, 82, 82, 0.15); color: #ff5252; border: 1px solid rgba(255, 82, 82, 0.3);">Video Available</span>` : ""}
        </div>
      </div>
      <div class="reorder-controls" aria-label="Reorder exercise">
        <button class="reorder-btn reorder-btn--up" type="button" title="Move Up" ${isFirst ? "disabled" : ""} aria-label="Move exercise up">▲</button>
        <button class="reorder-btn reorder-btn--down" type="button" title="Move Down" ${isLast ? "disabled" : ""} aria-label="Move exercise down">▼</button>
      </div>
    </div>

    <!-- Media / Video Player Area -->
    <div class="exercise-card__media-area ${hasVideo ? "exercise-card__media-area--has-video" : ""}">
      <img
        class="exercise-card__image"
        src="${thumbnailUrl}"
        alt="${escapeHtml(exercise.name)} demonstration thumbnail"
        loading="lazy"
        onerror="this.onerror=null; this.src='${exerciseImageUrl}';"
      />
      ${
        hasVideo
          ? `
          <div class="exercise-card__media-overlay" title="Watch video demonstration inside this card">
            <span class="media-play-badge">
              <span class="media-play-badge__icon" aria-hidden="true">▶</span>
              <span>Watch Video</span>
            </span>
          </div>
          `
          : ""
      }
    </div>

    <!-- Action Buttons Row -->
    <div class="exercise-card__actions-row">
      ${
        hasVideo
          ? `
          <button class="card-action-btn card-action-btn--watch" type="button" title="Play demonstration video">
            <span aria-hidden="true">▶</span> Watch Video
          </button>
          `
          : ""
      }
      <button class="card-action-btn card-action-btn--history" type="button" title="View past workout history">
        <span aria-hidden="true">📊</span> History
      </button>
      <button class="card-action-btn card-action-btn--edit" type="button" title="Edit exercise name, embed code, sets or reps">
        <span aria-hidden="true">✏️</span> Edit
      </button>
      <button class="card-action-btn card-action-btn--delete" type="button" title="Delete exercise">
        <span aria-hidden="true">🗑️</span> Delete
      </button>
    </div>

    <!-- Previous Workout Readout -->
    <div class="exercise-card__section">
      <div class="exercise-card__section-header">
        <h3 class="exercise-card__section-title">Previous Workout</h3>
        ${lastSets && lastSets.length ? `<span style="font-size: 0.68rem; color: var(--text-muted);">${progressionData.history && progressionData.history[0] ? progressionData.history[0].dateString : "Last session"}</span>` : ""}
      </div>
      <div class="previous-workout"></div>
    </div>

    <!-- Today's Workout Logging -->
    <div class="exercise-card__section">
      <div class="exercise-card__section-header">
        <h3 class="exercise-card__section-title">Today's Workout</h3>
        <div class="set-adjust-controls">
          <button class="set-adjust-btn set-adjust-btn--add" type="button" title="Add another set">+ Set</button>
          <button class="set-adjust-btn set-adjust-btn--remove" type="button" title="Remove last set">- Set</button>
        </div>
      </div>
      <div class="today-workout-sets"></div>
    </div>

    <button class="save-button" type="button">
      <span aria-hidden="true">💾</span> Save Workout
    </button>
    <p class="save-confirmation hidden">Workout Saved ✓</p>
  `;

  // Media & Video Player Area controller
  const mediaArea = card.querySelector(".exercise-card__media-area");

  const openVideoPlayer = () => {
    if (!exercise.youtubeId) return;

    // Generate safe iframe using the validated video ID
    const isFileProtocol = window.location.protocol === "file:";
    mediaArea.innerHTML = `
      <div class="exercise-card__video-player">
        <div class="video-player-bar">
          <a
            class="video-ext-btn"
            href="https://www.youtube.com/watch?v=${exercise.youtubeId}"
            target="_blank"
            rel="noopener noreferrer"
            title="Open video directly on YouTube"
          >
            <span aria-hidden="true">↗</span> Open on YouTube
          </a>
          <button class="video-close-btn" type="button" title="Close video player">&times; Close Video</button>
        </div>
        <iframe
          class="exercise-card__iframe"
          src="https://www.youtube.com/embed/${exercise.youtubeId}?autoplay=1&rel=0"
          title="${escapeHtml(exercise.name)} video player"
          frameborder="0"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        ${
          isFileProtocol
            ? `
          <div class="video-file-hint">
            <span>⚠️ <strong>Error 153 Note:</strong> YouTube restricts inline video embeds on local files (<code>file://</code>). Use <strong>Open on YouTube ↗</strong> above, or serve with a local web server (e.g. <code>npx serve</code> or VS Code Live Server).</span>
          </div>
          `
            : ""
        }
      </div>
    `;

    const closeBtn = mediaArea.querySelector(".video-close-btn");
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeVideoPlayer();
    });
  };

  const closeVideoPlayer = () => {
    // Restore normal thumbnail/illustration display
    mediaArea.innerHTML = `
      <img
        class="exercise-card__image"
        src="${thumbnailUrl}"
        alt="${escapeHtml(exercise.name)} demonstration thumbnail"
        loading="lazy"
        onerror="this.onerror=null; this.src='${exerciseImageUrl}';"
      />
      ${
        hasVideo
          ? `
          <div class="exercise-card__media-overlay" title="Watch video demonstration inside this card">
            <span class="media-play-badge">
              <span class="media-play-badge__icon" aria-hidden="true">▶</span>
              <span>Watch Video</span>
            </span>
          </div>
          `
          : ""
      }
    `;

    if (hasVideo) {
      const overlay = mediaArea.querySelector(".exercise-card__media-overlay");
      if (overlay) {
        overlay.addEventListener("click", openVideoPlayer);
      }
    }
  };

  if (hasVideo) {
    const overlay = mediaArea.querySelector(".exercise-card__media-overlay");
    if (overlay) {
      overlay.addEventListener("click", openVideoPlayer);
    }
    const watchActionBtn = card.querySelector(".card-action-btn--watch");
    if (watchActionBtn) {
      watchActionBtn.addEventListener("click", openVideoPlayer);
    }
  }

  // Render Previous Workout sets
  const prevWorkoutContainer = card.querySelector(".previous-workout");
  renderPreviousWorkoutSets(prevWorkoutContainer, lastSets);

  // Determine initial number of sets for today
  const setCount = lastSets && lastSets.length > 0 ? lastSets.length : Number(exercise.defaultSets) || DEFAULT_SETS;
  const todayContainer = card.querySelector(".today-workout-sets");
  renderTodaySetInputs(todayContainer, setCount, exercise.defaultReps || DEFAULT_REPS, lastSets);

  // Wire Reorder buttons
  const upBtn = card.querySelector(".reorder-btn--up");
  const downBtn = card.querySelector(".reorder-btn--down");

  upBtn.addEventListener("click", async () => {
    const currentIndex = currentList.findIndex((e) => e.id === exercise.id);
    if (currentIndex > 0) {
      const swapped = [...currentList];
      const temp = swapped[currentIndex - 1];
      swapped[currentIndex - 1] = swapped[currentIndex];
      swapped[currentIndex] = temp;
      await reorderExercises(exercise.muscleGroup, swapped.map((e) => e.id));
      await renderExercisesForCurrentGroup();
      showToast(`Reordered "${exercise.name}"`);
    }
  });

  downBtn.addEventListener("click", async () => {
    const currentIndex = currentList.findIndex((e) => e.id === exercise.id);
    if (currentIndex >= 0 && currentIndex < currentList.length - 1) {
      const swapped = [...currentList];
      const temp = swapped[currentIndex + 1];
      swapped[currentIndex + 1] = swapped[currentIndex];
      swapped[currentIndex] = temp;
      await reorderExercises(exercise.muscleGroup, swapped.map((e) => e.id));
      await renderExercisesForCurrentGroup();
      showToast(`Reordered "${exercise.name}"`);
    }
  });

  // Wire Set adjustments (+ Set / - Set)
  const addSetBtn = card.querySelector(".set-adjust-btn--add");
  const removeSetBtn = card.querySelector(".set-adjust-btn--remove");

  addSetBtn.addEventListener("click", () => {
    const currentFields = card.querySelectorAll(".set-input__field");
    if (currentFields.length < 8) {
      renderTodaySetInputs(todayContainer, currentFields.length + 1, exercise.defaultReps || DEFAULT_REPS);
    }
  });

  removeSetBtn.addEventListener("click", () => {
    const currentFields = card.querySelectorAll(".set-input__field");
    if (currentFields.length > 1) {
      renderTodaySetInputs(todayContainer, currentFields.length - 1, exercise.defaultReps || DEFAULT_REPS);
    }
  });

  // Wire Card Actions (Edit, Delete, History)
  const editBtn = card.querySelector(".card-action-btn--edit");
  const deleteBtn = card.querySelector(".card-action-btn--delete");
  const historyBtn = card.querySelector(".card-action-btn--history");

  editBtn.addEventListener("click", () => openEditExerciseModal(exercise));
  deleteBtn.addEventListener("click", () => openDeleteModal(exercise));
  historyBtn.addEventListener("click", () => openHistoryModal(exercise));

  // Wire Save Workout
  const saveBtn = card.querySelector(".save-button");
  const saveConfirm = card.querySelector(".save-confirmation");

  saveBtn.addEventListener("click", async () => {
    const inputFields = card.querySelectorAll(".set-input__field");
    const sets = Array.from(inputFields).map((input) => {
      const val = parseInt(input.value, 10);
      return Number.isFinite(val) && val >= 0 ? val : 0;
    });

    await saveProgression(exercise.id, sets);
    renderPreviousWorkoutSets(prevWorkoutContainer, sets);

    saveConfirm.classList.remove("hidden");
    clearTimeout(saveBtn._timeout);
    saveBtn._timeout = setTimeout(() => {
      saveConfirm.classList.add("hidden");
    }, 2000);

    showToast(`Logged workout for ${exercise.name}!`);
  });

  return card;
}

/**
 * Renders previous workout sets readout.
 */
function renderPreviousWorkoutSets(container, sets) {
  container.innerHTML = "";

  if (!Array.isArray(sets) || sets.length === 0 || sets.every((s) => s === null || s === undefined)) {
    const empty = document.createElement("p");
    empty.className = "previous-workout__empty";
    empty.textContent = "No previous workout logged yet.";
    container.appendChild(empty);
    return;
  }

  sets.forEach((reps, index) => {
    const setEl = document.createElement("div");
    setEl.className = "previous-workout__set";
    setEl.innerHTML = `
      <span class="previous-workout__set-label">Set ${index + 1}</span>
      <span class="previous-workout__set-value">${reps !== null && reps !== undefined ? reps : "&ndash;"}</span>
    `;
    container.appendChild(setEl);
  });
}

/**
 * Renders Today's workout set input fields.
 */
function renderTodaySetInputs(container, numSets, defaultReps, prefillSets = null) {
  const existingValues = Array.from(container.querySelectorAll(".set-input__field")).map((i) => i.value);
  container.innerHTML = "";

  for (let i = 0; i < numSets; i++) {
    const col = document.createElement("div");
    col.className = "set-input-col";

    let initialVal = "";
    if (existingValues[i] !== undefined && existingValues[i] !== "") {
      initialVal = existingValues[i];
    } else if (prefillSets && prefillSets[i] !== undefined && prefillSets[i] !== null) {
      initialVal = prefillSets[i];
    } else {
      initialVal = defaultReps;
    }

    col.innerHTML = `
      <label for="set-${i}">Set ${i + 1}</label>
      <input
        type="number"
        min="0"
        max="200"
        inputmode="numeric"
        class="set-input__field"
        data-set-index="${i}"
        value="${initialVal}"
        placeholder="${defaultReps}"
      />
    `;
    container.appendChild(col);
  }
}

/* ============================================================
   MODAL CONTROLLER: ADD / EDIT EXERCISE
   ============================================================ */

function openAddExerciseModal(preselectedGroup = null) {
  modalTitle.textContent = "Add New Exercise";
  formExerciseId.value = "";
  formExerciseName.value = "";
  formEmbedCode.value = "";
  embedCodeError.classList.add("hidden");
  formMuscleGroup.value = preselectedGroup || appState.currentMuscleGroup || "chest";
  formEquipment.value = "dumbbell";
  formDefaultSets.value = DEFAULT_SETS;
  formDefaultReps.value = DEFAULT_REPS;

  exerciseModal.classList.remove("hidden");
  formExerciseName.focus();
}

function openEditExerciseModal(exercise) {
  modalTitle.textContent = "Edit Exercise";
  formExerciseId.value = exercise.id;
  formExerciseName.value = exercise.name;

  // Show previous embed code or generated standard embed code
  formEmbedCode.value = exercise.rawEmbedCode || (exercise.youtubeId ? buildStandardEmbedCode(exercise.youtubeId) : "");
  embedCodeError.classList.add("hidden");

  formMuscleGroup.value = exercise.muscleGroup;
  formEquipment.value = exercise.equipment || "dumbbell";
  formDefaultSets.value = exercise.defaultSets || DEFAULT_SETS;
  formDefaultReps.value = exercise.defaultReps || DEFAULT_REPS;

  exerciseModal.classList.remove("hidden");
  formExerciseName.focus();
}

function closeExerciseModal() {
  exerciseModal.classList.add("hidden");
  embedCodeError.classList.add("hidden");
  exerciseForm.reset();
}

// Clear error on input
formEmbedCode.addEventListener("input", () => {
  embedCodeError.classList.add("hidden");
});

exerciseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = formExerciseName.value.trim();
  if (!name) {
    showToast("Exercise name is required", "error");
    formExerciseName.focus();
    return;
  }

  // Validate YouTube Embed Code safely without arbitrary HTML injection
  const embedInput = formEmbedCode.value.trim();
  const validation = parseAndValidateYouTubeEmbed(embedInput);

  if (!validation.valid) {
    embedCodeError.textContent = validation.error || "Invalid YouTube embed code. Please paste a valid YouTube iframe or link.";
    embedCodeError.classList.remove("hidden");
    formEmbedCode.focus();
    return;
  }

  embedCodeError.classList.add("hidden");

  const payload = {
    name,
    muscleGroup: formMuscleGroup.value,
    equipment: formEquipment.value,
    defaultSets: parseInt(formDefaultSets.value, 10) || DEFAULT_SETS,
    defaultReps: parseInt(formDefaultReps.value, 10) || DEFAULT_REPS,
    youtubeId: validation.videoId,
    rawEmbedCode: validation.raw || (validation.videoId ? buildStandardEmbedCode(validation.videoId) : ""),
  };

  const isEditing = Boolean(formExerciseId.value);

  try {
    if (isEditing) {
      payload.id = formExerciseId.value;
      await updateExercise(payload);
      showToast(`Updated "${name}"`);
    } else {
      await addExercise(payload);
      showToast(`Added "${name}" to ${payload.muscleGroup.toUpperCase()}`);
    }

    closeExerciseModal();

    if (appState.currentMuscleGroup) {
      await renderExercisesForCurrentGroup();
    } else {
      await renderMuscleGroupGrid();
    }
  } catch (err) {
    console.error("Save exercise error:", err);
    showToast(err.message || "Failed to save exercise", "error");
  }
});

modalCloseBtn.addEventListener("click", closeExerciseModal);
modalCancelBtn.addEventListener("click", closeExerciseModal);
exerciseModal.addEventListener("click", (e) => {
  if (e.target === exerciseModal) closeExerciseModal();
});

/* ============================================================
   MODAL CONTROLLER: DELETE CONFIRMATION
   ============================================================ */

function openDeleteModal(exercise) {
  appState.deleteTargetId = exercise.id;
  deleteModalMessage.textContent = `Are you sure you want to delete "${exercise.name}"? This will also remove all saved workout history for it.`;
  deleteModal.classList.remove("hidden");
}

function closeDeleteModal() {
  appState.deleteTargetId = null;
  deleteModal.classList.add("hidden");
}

deleteModalConfirmBtn.addEventListener("click", async () => {
  if (!appState.deleteTargetId) return;

  try {
    const id = appState.deleteTargetId;
    await deleteExercise(id);
    closeDeleteModal();
    showToast("Exercise deleted successfully");

    if (appState.currentMuscleGroup) {
      await renderExercisesForCurrentGroup();
    } else {
      await renderMuscleGroupGrid();
    }
  } catch (err) {
    console.error("Delete error:", err);
    showToast("Failed to delete exercise", "error");
  }
});

deleteModalCloseBtn.addEventListener("click", closeDeleteModal);
deleteModalCancelBtn.addEventListener("click", closeDeleteModal);
deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) closeDeleteModal();
});

/* ============================================================
   MODAL CONTROLLER: WORKOUT HISTORY
   ============================================================ */

async function openHistoryModal(exercise) {
  historyExerciseSubtitle.textContent = `${exercise.name} (${exercise.muscleGroup.toUpperCase()})`;
  historyModalContent.innerHTML = "<p>Loading history...</p>";
  historyModal.classList.remove("hidden");

  try {
    const progression = await getProgression(exercise.id);
    const history = progression && Array.isArray(progression.history) ? progression.history : [];

    historyModalContent.innerHTML = "";

    if (history.length === 0) {
      historyModalContent.innerHTML = `
        <div class="previous-workout__empty" style="text-align: center; padding: 30px 0;">
          No logged workout sessions for this exercise yet. Complete sets and click "Save Workout" to start tracking.
        </div>
      `;
      return;
    }

    history.forEach((session) => {
      const item = document.createElement("div");
      item.className = "history-item";

      const setsHtml = (session.sets || [])
        .map((reps, idx) => `<span class="history-set-pill">S${idx + 1}: ${reps}</span>`)
        .join("");

      item.innerHTML = `
        <div>
          <span class="history-item__date">${session.dateString || new Date(session.timestamp).toLocaleDateString()}</span>
        </div>
        <div class="history-item__sets">
          ${setsHtml || "<span>No sets recorded</span>"}
        </div>
      `;
      historyModalContent.appendChild(item);
    });
  } catch (err) {
    console.error("Load history error:", err);
    historyModalContent.innerHTML = `<p class="text-danger">Failed to load history.</p>`;
  }
}

function closeHistoryModal() {
  historyModal.classList.add("hidden");
}

historyModalCloseBtn.addEventListener("click", closeHistoryModal);
historyModalDoneBtn.addEventListener("click", closeHistoryModal);
historyModal.addEventListener("click", (e) => {
  if (e.target === historyModal) closeHistoryModal();
});

/* ============================================================
   IMPORT & EXPORT CONTROLLER
   ============================================================ */

exportBtn.addEventListener("click", async () => {
  try {
    const exportData = await exportAllData();
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `repflow-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Exported ${exportData.exercises.length} exercises!`);
  } catch (err) {
    console.error("Export error:", err);
    showToast("Export failed: " + err.message, "error");
  }
});

importBtn.addEventListener("click", () => {
  importFileInput.value = "";
  importFileInput.click();
});

importFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (!parsed || !Array.isArray(parsed.exercises)) {
        throw new Error("Invalid file structure: missing 'exercises' array.");
      }

      appState.pendingImportData = parsed;
      const exCount = parsed.exercises.length;
      const progCount = Array.isArray(parsed.progression) ? parsed.progression.length : 0;

      importSummaryText.textContent = `Found ${exCount} exercises and ${progCount} progression records in this backup file. Please select how you want to import this data:`;
      importModal.classList.remove("hidden");
    } catch (err) {
      console.error("JSON parse error:", err);
      showToast("Invalid JSON file: " + err.message, "error");
    }
  };
  reader.readAsText(file);
});

importModalConfirmBtn.addEventListener("click", async () => {
  if (!appState.pendingImportData) return;

  const selectedMode = document.querySelector('input[name="importMode"]:checked')?.value;
  const overwrite = selectedMode === "overwrite";

  try {
    const result = await importAllData(appState.pendingImportData, overwrite);
    importModal.classList.add("hidden");
    appState.pendingImportData = null;

    showToast(result.message);

    if (appState.currentMuscleGroup) {
      await renderExercisesForCurrentGroup();
    } else {
      await renderMuscleGroupGrid();
    }
  } catch (err) {
    console.error("Import error:", err);
    showToast("Import failed: " + err.message, "error");
  }
});

function closeImportModal() {
  appState.pendingImportData = null;
  importModal.classList.add("hidden");
}

importModalCloseBtn.addEventListener("click", closeImportModal);
importModalCancelBtn.addEventListener("click", closeImportModal);
importModal.addEventListener("click", (e) => {
  if (e.target === importModal) closeImportModal();
});

/* ============================================================
   EMPTY STATE ACTION HANDLER
   ============================================================ */

if (noExercisesAddBtn) {
  noExercisesAddBtn.addEventListener("click", () => {
    openAddExerciseModal(appState.currentMuscleGroup);
  });
}

/* ============================================================
   ADD EXERCISE BUTTON HANDLERS
   ============================================================ */

globalAddBtn.addEventListener("click", () => openAddExerciseModal(appState.currentMuscleGroup));
groupAddExerciseBtn.addEventListener("click", () => openAddExerciseModal(appState.currentMuscleGroup));

/* ============================================================
   FLOATING REST TIMER
   ============================================================ */

let timerSecondsSetting = 60;
const timerState = {
  remaining: 60,
  intervalId: null,
  running: false,
};

const restTimerEl = document.getElementById("restTimer");
const timerDisplay = document.getElementById("timerDisplay");
const timerStatus = document.getElementById("timerStatus");
const timerStartBtn = document.getElementById("timerStart");
const timerPauseBtn = document.getElementById("timerPause");
const timerResetBtn = document.getElementById("timerReset");
const timerPresetBtns = document.querySelectorAll(".timer-preset-btn");

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function renderTimerDisplay() {
  timerDisplay.textContent = formatTime(timerState.remaining);
}

function startTimer() {
  if (timerState.running) return;

  if (timerState.remaining <= 0) {
    timerState.remaining = timerSecondsSetting;
  }

  timerState.running = true;
  timerStatus.textContent = "Resting...";
  restTimerEl.classList.remove("rest-timer--complete");
  timerStartBtn.textContent = "Resume";

  timerState.intervalId = window.setInterval(() => {
    timerState.remaining -= 1;
    renderTimerDisplay();

    if (timerState.remaining <= 0) {
      stopTimer();
      timerStatus.textContent = "Rest Complete!";
      restTimerEl.classList.add("rest-timer--complete");
      timerStartBtn.textContent = "Start";
      playBeep();
      showToast("Rest time is up! Ready for next set.");
    }
  }, 1000);
}

function pauseTimer() {
  stopTimer();
  if (timerState.remaining > 0 && timerState.remaining < timerSecondsSetting) {
    timerStatus.textContent = "Paused";
  }
}

function resetTimer() {
  stopTimer();
  timerState.remaining = timerSecondsSetting;
  timerStatus.textContent = "";
  restTimerEl.classList.remove("rest-timer--complete");
  timerStartBtn.textContent = "Start";
  renderTimerDisplay();
}

function stopTimer() {
  if (timerState.intervalId) {
    window.clearInterval(timerState.intervalId);
    timerState.intervalId = null;
  }
  timerState.running = false;
}

function playBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch (err) {
    console.warn("Unable to play Web Audio beep:", err);
  }
}

timerStartBtn.addEventListener("click", startTimer);
timerPauseBtn.addEventListener("click", pauseTimer);
timerResetBtn.addEventListener("click", resetTimer);

timerPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    timerPresetBtns.forEach((b) => b.classList.remove("timer-preset-btn--active"));
    btn.classList.add("timer-preset-btn--active");
    const seconds = parseInt(btn.dataset.seconds, 10) || 60;
    timerSecondsSetting = seconds;
    resetTimer();
  });
});

/* ============================================================
   GLOBAL NAVIGATION WIRING & INIT
   ============================================================ */

backButton.addEventListener("click", goHome);
breadcrumbHome.addEventListener("click", goHome);
headerLogo.addEventListener("click", (e) => {
  e.preventDefault();
  goHome();
});

if (guideNavBtn) guideNavBtn.addEventListener("click", openGuide);
if (homeGuideLinkBtn) homeGuideLinkBtn.addEventListener("click", openGuide);
if (guideBackToHomeBtn) guideBackToHomeBtn.addEventListener("click", goHome);
if (guideBreadcrumbHome) guideBreadcrumbHome.addEventListener("click", goHome);

// Escape key closes open modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!exerciseModal.classList.contains("hidden")) closeExerciseModal();
    if (!deleteModal.classList.contains("hidden")) closeDeleteModal();
    if (!historyModal.classList.contains("hidden")) closeHistoryModal();
    if (!importModal.classList.contains("hidden")) closeImportModal();
  }
});

/**
 * Initializes the entire application on load.
 */
async function initApp() {
  try {
    // 1. Initialize IndexedDB
    await initDB();

    // 2. Render initial dashboard
    await renderMuscleGroupGrid();

    // 3. Render initial timer display
    renderTimerDisplay();

    console.log("RepFlow initialized with minimalist aesthetic design.");
  } catch (err) {
    console.error("Initialization failed:", err);
    showToast("Failed to initialize database: " + err.message, "error");
  }
}

// Start application
initApp();
