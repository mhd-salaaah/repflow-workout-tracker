/* ============================================================
   IRON LOG — Exercise Database & Metadata Defaults
   Seven Target Muscle Groups with Manual YouTube Embed Support
   ============================================================ */

const DEFAULT_SETS = 3;
const DEFAULT_REPS = 12;

/* Muscle group metadata: id, display label, icon, and description */
const MUSCLE_GROUPS = [
  { id: "chest", label: "Chest", icon: "💪", description: "Pectorals, upper & lower chest" },
  { id: "back", label: "Back", icon: "🧍", description: "Lats, rhomboids, upper & lower back" },
  { id: "shoulders", label: "Shoulders", icon: "🏋️", description: "Deltoids: anterior, lateral & posterior" },
  { id: "biceps", label: "Biceps", icon: "🦾", description: "Brachii, brachialis & peak" },
  { id: "triceps", label: "Triceps", icon: "🥊", description: "Long head, lateral head & medial head" },
  { id: "legs", label: "Legs", icon: "🦵", description: "Quads, hamstrings, glutes & calves" },
  { id: "forearms", label: "Forearms", icon: "✊", description: "Flexors, extensors & grip strength" },
  { id: "abs", label: "Abs", icon: "🍫", description: "Rectus abdominis, obliques & core stability" },
];

/**
 * Builds a standard, safe YouTube iframe embed code from a video ID.
 * @param {string} videoId
 * @returns {string}
 */
function buildStandardEmbedCode(videoId) {
  if (!videoId) return "";
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

/* Starter exercises with verified YouTube video IDs and standard embed codes */
const INITIAL_EXERCISES = [
  // ---------------- Chest ----------------
  {
    id: "chest-bench-press",
    name: "Dumbbell Bench Press",
    muscleGroup: "chest",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "YQ2s_Y7g5Qk",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YQ2s_Y7g5Qk?si=tN9P5aClGcBeSYeP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "chest-flyes",
    name: "Dumbbell Flyes",
    muscleGroup: "chest",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "Nhvz9EzdJ4U",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Nhvz9EzdJ4U?si=B_JwrrUna9wU6JkZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "chest-pullover",
    name: "Dumbbell Pullover",
    muscleGroup: "chest",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "CmgP3fDguaM",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/CmgP3fDguaM?si=UakPcHiI2F9l_n4M&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Back ----------------
  {
    id: "back-one-arm-row",
    name: "One-Arm Dumbbell Row",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "DMo3HJoawrU",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DMo3HJoawrU?si=sH5FYQMCjR5PoyvY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "back-deadlift",
    name: "Dumbbell Deadlift",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "xAL7lHwj30E",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xAL7lHwj30E?si=czYXhSX3SCcErLkh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "back-pullover",
    name: "Dumbbell Pullover",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "jQjWlIwG4sI",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jQjWlIwG4sI?si=oswTJWhAoGRMMIA3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "back-incline-shrugs",
    name: "Shrugs",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "jIKfmiWh590",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jIKfmiWh590?si=68Lj5XBpr8Z5Zy_-&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Shoulders ----------------
  {
    id: "shoulders-press",
    name: "Dumbbell Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "t-hqRPjpaw8",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/t-hqRPjpaw8?si=IB0URv6sPwr4Vzh3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "shoulders-lateral-raise",
    name: "Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "XPPfnSEATJA",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XPPfnSEATJA?si=5HiK6Z1xXzYqec0R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "shoulders-rear-delt-raise",
    name: "Rear Delt Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "Z0HTsZEMedA",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Z0HTsZEMedA?si=P5iN9sxh4uoRZEJQ&amp;start=29" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Biceps ----------------
  {
    id: "biceps-curl",
    name: "Dumbbell Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "6DeLZ6cbgWQ",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6DeLZ6cbgWQ?si=yN0Dn2fFRUWgbno2&amp;start=29" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "biceps-hammer-curl",
    name: "Hammer Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "0IAM2YtviQY",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/0IAM2YtviQY?si=6S1UBCCtzatxEqnf&amp;start=29" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "biceps-concentration-curl",
    name: "Concentration Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "VMbDQ8PZazY",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VMbDQ8PZazY?si=bx4VvDvV_Ut-Moaj&amp;start=29" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Triceps ----------------
  {
    id: "triceps-overhead-extension",
    name: "Overhead Dumbbell Extension",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "IV7SekKI7Ns",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/IV7SekKI7Ns?si=PGqsTV0Y7P8QFg96&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "triceps-close-grip-press",
    name: "Close-Grip Dumbbell Press",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "eebXpmPGy2Y",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/eebXpmPGy2Y?si=s3CKKNOAdcj6zzZ9&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "triceps-skull-crushers",
    name: "Dumbbell Skull Crushers",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "jPjhQ2hsAds",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jPjhQ2hsAds?si=hIm6moAcwKhk5kkS&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "triceps-kickback",
    name: "Dumbbell Kickback",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "m_UlDFNX4mk",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/m_UlDFNX4mk?si=twhcHd7vqOM7396y&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Legs ----------------
  {
    id: "legs-squat",
    name: "Dumbbell Squat",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "MJao9o7ROs0",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/MJao9o7ROs0?si=_zWSQemYilTL2kZp&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "legs-lunge",
    name: "Dumbbell Lunge",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "lf4gJgKyLpI",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/lf4gJgKyLpI?si=ce6i3QXilYt8tPz8&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "legs-romanian-deadlift",
    name: "Romanian Deadlift",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "xAL7lHwj30E",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xAL7lHwj30E?si=xjmAHsiEzOBzu-iC&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "legs-calf-raise",
    name: "Standing Calf Raise",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "hPA98_r-6e4",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hPA98_r-6e4?si=QxQyKd6fUiWneBh2&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Forearms ----------------
  {
    id: "forearms-wrist-curl",
    name: "Wrist Curl",
    muscleGroup: "forearms",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "3VLTzIrnb5g",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3VLTzIrnb5g?si=va4A-l_bo27dkNKr&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "forearms-reverse-wrist-curl",
    name: "Reverse Wrist Curl",
    muscleGroup: "forearms",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "osYPwlBiCRM",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/osYPwlBiCRM?si=j1Gs6nCUR4P3OvVY&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "forearms-farmers-carry",
    name: "Farmer's Carry",
    muscleGroup: "forearms",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "8OtwXwrJizk",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8OtwXwrJizk?si=orttnnnhZ_d91TdQ&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },

  // ---------------- Abs ----------------
  {
    id: "abs-floor-crunches",
    name: "Dumbbell Floor Crunches",
    muscleGroup: "abs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 0,
    youtubeId: "v2fpgjq6L5M",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v2fpgjq6L5M?si=mxfajDO3rYMziF7r&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "abs-russian-twists",
    name: "Weighted Russian Twists",
    muscleGroup: "abs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "Hn0sdqn2t7k",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Hn0sdqn2t7k?si=cc1WjFbIu8XD6xqj&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    id: "abs-leg-drops",
    name: "Leg Drops",
    muscleGroup: "abs",
    equipment: "bodyweight",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "T83sB7ZTscc",
    rawEmbedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/T83sB7ZTscc?si=sueEXF1kEkqUBO0r&amp;start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
];

/* Starter workout progression history from backup */
const INITIAL_PROGRESSION = [
  {
    exerciseId: "back-deadlift",
    lastSets: [13, 11, 10],
    lastUpdated: 1794359184140,
    history: [
      {
        timestamp: 1794359184139,
        dateString: "Nov 11, 06:36 AM",
        sets: [13, 11, 10],
      },
    ],
  },
  {
    exerciseId: "back-incline-shrugs",
    lastSets: [20, 18, 16],
    lastUpdated: 1794360912276,
    history: [
      {
        timestamp: 1794360912276,
        dateString: "Nov 11, 07:05 AM",
        sets: [20, 18, 16],
      },
    ],
  },
  {
    exerciseId: "back-one-arm-row",
    lastSets: [15, 13, 11],
    lastUpdated: 1794358015328,
    history: [
      {
        timestamp: 1794358015111,
        dateString: "Nov 11, 06:16 AM",
        sets: [15, 13, 11],
      },
      {
        timestamp: 1794357639107,
        dateString: "Nov 11, 06:10 AM",
        sets: [15, 12, 12],
      },
    ],
  },
  {
    exerciseId: "back-pullover",
    lastSets: [13, 11, 9],
    lastUpdated: 1794360028001,
    history: [
      {
        timestamp: 1794360028001,
        dateString: "Nov 11, 06:50 AM",
        sets: [13, 11, 9],
      },
    ],
  },
  {
    exerciseId: "biceps-concentration-curl",
    lastSets: [8, 6, 4],
    lastUpdated: 1794363130935,
    history: [
      {
        timestamp: 1794363130935,
        dateString: "Nov 11, 07:42 AM",
        sets: [8, 6, 4],
      },
    ],
  },
  {
    exerciseId: "biceps-curl",
    lastSets: [15, 13, 11],
    lastUpdated: 1794361619840,
    history: [
      {
        timestamp: 1794361619840,
        dateString: "Nov 11, 07:16 AM",
        sets: [15, 13, 11],
      },
    ],
  },
  {
    exerciseId: "biceps-hammer-curl",
    lastSets: [9, 7, 6],
    lastUpdated: 1794362297614,
    history: [
      {
        timestamp: 1794362297614,
        dateString: "Nov 11, 07:28 AM",
        sets: [9, 7, 6],
      },
    ],
  },
];

/**
 * Parses and validates YouTube embed code or URL.
 * Safely extracts the YouTube video ID without injecting arbitrary HTML.
 * @param {string} input - raw embed code or URL
 * @returns {{valid: boolean, videoId: string|null, raw: string, error?: string}}
 */
function parseAndValidateYouTubeEmbed(input) {
  if (!input || typeof input !== "string" || !input.trim()) {
    return { valid: true, videoId: null, raw: "" };
  }
  const str = input.trim();

  // 1. Look for src in iframe embed code: src="https://www.youtube.com/embed/VIDEO_ID..."
  const iframeSrcMatch = str.match(/src=["'](?:https?:)?\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (iframeSrcMatch) {
    return { valid: true, videoId: iframeSrcMatch[1], raw: str };
  }

  // 2. Direct embed URL: youtube.com/embed/VIDEO_ID
  const embedUrlMatch = str.match(/(?:https?:)?\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedUrlMatch) {
    return { valid: true, videoId: embedUrlMatch[1], raw: str };
  }

  // 3. Standard watch / shorts / youtu.be URL
  const genericMatch = str.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (genericMatch) {
    return { valid: true, videoId: genericMatch[1], raw: str };
  }

  // 4. Standalone 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return { valid: true, videoId: str, raw: str };
  }

  // Not a valid YouTube video ID or embed
  return {
    valid: false,
    videoId: null,
    raw: str,
    error: "Invalid YouTube embed code. Please paste a valid YouTube iframe or youtube.com/embed/... URL.",
  };
}

/**
 * Generates an attractive SVG exercise demonstration image.
 * @param {string} name
 * @param {string} muscleGroup
 * @param {string} equipment
 * @returns {string} SVG data URL
 */
function createExerciseImage(name, muscleGroup, equipment = "dumbbell") {
  const displayGroup = (muscleGroup || "Workout").toUpperCase();
  const icon = MUSCLE_GROUPS.find((g) => g.id === muscleGroup)?.icon || "🏋️";
  const displayEquip = (equipment || "Dumbbell").toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
      <defs>
        <radialGradient id="cardGlow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#161a24"/>
          <stop offset="100%" stop-color="#08090d"/>
        </radialGradient>
        <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0, 230, 118, 0)"/>
          <stop offset="50%" stop-color="rgba(0, 230, 118, 0.6)"/>
          <stop offset="100%" stop-color="rgba(0, 230, 118, 0)"/>
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#cardGlow)"/>
      <line x1="60" y1="2" x2="340" y2="2" stroke="url(#accentLine)" stroke-width="2"/>
      <circle cx="200" cy="80" r="38" fill="#11131b" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5"/>
      <circle cx="200" cy="80" r="46" fill="none" stroke="rgba(0, 230, 118, 0.2)" stroke-width="1" stroke-dasharray="2 4"/>
      <text x="200" y="91" font-size="28" text-anchor="middle" dominant-baseline="middle">${icon}</text>
      <text x="200" y="146" font-family="-apple-system, 'Plus Jakarta Sans', Inter, sans-serif" font-size="15" font-weight="700" fill="#f8fafc" text-anchor="middle" letter-spacing="-0.2">
        ${escapeSvg(name.length > 28 ? name.substring(0, 26) + "..." : name)}
      </text>
      <text x="200" y="174" font-family="-apple-system, 'Space Grotesk', Inter, sans-serif" font-size="10" font-weight="600" fill="#00e676" text-anchor="middle" letter-spacing="1.8">
        ${escapeSvg(displayGroup)} • ${escapeSvg(displayEquip)}
      </text>
      <text x="200" y="200" font-family="-apple-system, Inter, sans-serif" font-size="8.5" font-weight="500" fill="#64748b" text-anchor="middle" letter-spacing="0.5">
        REPFLOW DEMONSTRATION
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeSvg(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
