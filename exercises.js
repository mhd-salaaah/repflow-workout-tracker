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
    youtubeId: "VmB1G1K7v94",
    rawEmbedCode: buildStandardEmbedCode("VmB1G1K7v94"),
  },
  {
    id: "chest-incline-press",
    name: "Incline Dumbbell Press",
    muscleGroup: "chest",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "8iPEnn-ltC8",
    rawEmbedCode: buildStandardEmbedCode("8iPEnn-ltC8"),
  },
  {
    id: "chest-flyes",
    name: "Dumbbell Flyes",
    muscleGroup: "chest",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "eozdVDA78K0",
    rawEmbedCode: buildStandardEmbedCode("eozdVDA78K0"),
  },
  {
    id: "chest-standing-fly",
    name: "Standing Dumbbell Chest Fly",
    muscleGroup: "chest",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "Z57CtFmRMwg",
    rawEmbedCode: buildStandardEmbedCode("Z57CtFmRMwg"),
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
    youtubeId: "dFzUjzfih7k",
    rawEmbedCode: buildStandardEmbedCode("dFzUjzfih7k"),
  },
  {
    id: "back-deadlift",
    name: "Dumbbell Deadlift",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "lJ3QwaXNJfw",
    rawEmbedCode: buildStandardEmbedCode("lJ3QwaXNJfw"),
  },
  {
    id: "back-pullover",
    name: "Dumbbell Pullover",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "FK4rHfWKEac",
    rawEmbedCode: buildStandardEmbedCode("FK4rHfWKEac"),
  },
  {
    id: "back-incline-shrugs",
    name: "Incline Shrugs",
    muscleGroup: "back",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "Y3Qe79u747A",
    rawEmbedCode: buildStandardEmbedCode("Y3Qe79u747A"),
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
    youtubeId: "qEwKCR5JCog",
    rawEmbedCode: buildStandardEmbedCode("qEwKCR5JCog"),
  },
  {
    id: "shoulders-lateral-raise",
    name: "Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "3VcKaXpzqRo",
    rawEmbedCode: buildStandardEmbedCode("3VcKaXpzqRo"),
  },
  {
    id: "shoulders-rear-delt-raise",
    name: "Rear Delt Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "EA7u4Q_8HQ0",
    rawEmbedCode: buildStandardEmbedCode("EA7u4Q_8HQ0"),
  },
  {
    id: "shoulders-shrugs",
    name: "Shrugs",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "cJRVVxmytaM",
    rawEmbedCode: buildStandardEmbedCode("cJRVVxmytaM"),
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
    youtubeId: "ykJmrZ5v0Oo",
    rawEmbedCode: buildStandardEmbedCode("ykJmrZ5v0Oo"),
  },
  {
    id: "biceps-hammer-curl",
    name: "Hammer Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "zC3nLlEvin4",
    rawEmbedCode: buildStandardEmbedCode("zC3nLlEvin4"),
  },
  {
    id: "biceps-concentration-curl",
    name: "Concentration Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "Jvj2wV0vOYU",
    rawEmbedCode: buildStandardEmbedCode("Jvj2wV0vOYU"),
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
    youtubeId: "_gsUck-7M74",
    rawEmbedCode: buildStandardEmbedCode("_gsUck-7M74"),
  },
  {
    id: "triceps-close-grip-press",
    name: "Close-Grip Dumbbell Press",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "VcgN43a2gE8",
    rawEmbedCode: buildStandardEmbedCode("VcgN43a2gE8"),
  },
  {
    id: "triceps-skull-crushers",
    name: "Dumbbell Skull Crushers",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "d_KZxkY_0cM",
    rawEmbedCode: buildStandardEmbedCode("d_KZxkY_0cM"),
  },
  {
    id: "triceps-kickback",
    name: "Dumbbell Kickback",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "ZO81bExngMI",
    rawEmbedCode: buildStandardEmbedCode("ZO81bExngMI"),
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
    youtubeId: "v_Cg5UvB70c",
    rawEmbedCode: buildStandardEmbedCode("v_Cg5UvB70c"),
  },
  {
    id: "legs-lunge",
    name: "Dumbbell Lunge",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "D7KaRcUTQeE",
    rawEmbedCode: buildStandardEmbedCode("D7KaRcUTQeE"),
  },
  {
    id: "legs-romanian-deadlift",
    name: "Romanian Deadlift",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "7j-2w4-P14I",
    rawEmbedCode: buildStandardEmbedCode("7j-2w4-P14I"),
  },
  {
    id: "legs-calf-raise",
    name: "Standing Calf Raise",
    muscleGroup: "legs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 3,
    youtubeId: "gwLzBJYoWlI",
    rawEmbedCode: buildStandardEmbedCode("gwLzBJYoWlI"),
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
    youtubeId: "Q0PZkOq9s3w",
    rawEmbedCode: buildStandardEmbedCode("Q0PZkOq9s3w"),
  },
  {
    id: "forearms-reverse-wrist-curl",
    name: "Reverse Wrist Curl",
    muscleGroup: "forearms",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "3V0A4rP_C_c",
    rawEmbedCode: buildStandardEmbedCode("3V0A4rP_C_c"),
  },
  {
    id: "forearms-farmers-carry",
    name: "Farmer's Carry",
    muscleGroup: "forearms",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "p5M8QU36qHY",
    rawEmbedCode: buildStandardEmbedCode("p5M8QU36qHY"),
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
    youtubeId: "Kz6pGZ27k1s",
    rawEmbedCode: buildStandardEmbedCode("Kz6pGZ27k1s"),
  },
  {
    id: "abs-russian-twists",
    name: "Weighted Russian Twists",
    muscleGroup: "abs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 1,
    youtubeId: "wkD8rjkodUI",
    rawEmbedCode: buildStandardEmbedCode("wkD8rjkodUI"),
  },
  {
    id: "abs-leg-drops",
    name: "Dumbbell Leg Drops",
    muscleGroup: "abs",
    equipment: "dumbbell",
    defaultSets: DEFAULT_SETS,
    defaultReps: DEFAULT_REPS,
    order: 2,
    youtubeId: "JB2oyawG9KI",
    rawEmbedCode: buildStandardEmbedCode("JB2oyawG9KI"),
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
