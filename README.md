# 🏋️ RepFlow — Minimal Workout Tracker

A **minimal workout tracking web app** built with **HTML, CSS, and JavaScript**. Designed to help organize workouts, track sets and reps, and monitor exercise progression with a clean and simple interface.

⚠️ **Note:** This project was originally created for my personal workout planning and tracking. It is shared publicly for learning and reference purposes.

---

## ✨ Features

- 💪 **Muscle Group–Based Workouts**
  - Organize exercises by muscle group
  - View exercises for each muscle group
  - Add your own custom exercises

- 📊 **Workout Progression Tracking**
  - Record sets and reps for each exercise
  - View previous workout performance
  - Track workout history for individual exercises

- ▶ **YouTube Integration**
  - Add exercise demonstration videos using YouTube embed codes
  - Watch demonstrations directly within the app

- ⏱ **Floating Rest Timer**
  - Easily accessible rest timer
  - Start, pause, and reset controls
  - Preset rest intervals

- ⚙️ **Exercise Management**
  - Add, edit, and delete exercises
  - Reorder exercises within muscle groups
  - Customize default sets and reps

- 💾 **Local Data Persistence**
  - Stores workout data in IndexedDB
  - Preserves exercises and workout progression
  - No account or backend required

- 🔄 **Export / Import Data**
  - Export workout data as a JSON backup
  - Restore data by importing a backup
  - Choose to merge or overwrite existing data

---

## 🛠 Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **IndexedDB API**
- **YouTube Embed Integration**

No frameworks. No backend. Fully client-side.

---

## 📂 Project Structure

```text
repflow-workout-tracker/
├── index.html
├── style.css
├── script.js
├── db.js
├── exercises.js
└── README.md
```

---

## 🌐 Live Demo

Try RepFlow directly in your browser:

**[https://mhd-salaaah.github.io/repflow-workout-tracker/](https://mhd-salaaah.github.io/repflow-workout-tracker/)**

Hosted using **GitHub Pages** — a free static website hosting service.

No installation or account required to try the application.

---

## 🚀 How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/mhd-salaaah/repflow-workout-tracker.git
   ```

2. Open the project using a local development server:

   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000` in your browser.

4. Select a muscle group and manage your workouts:
   - Add or edit exercises
   - Customize sets and reps
   - Add YouTube demonstration videos
   - Save completed workouts
   - Review previous workout history

5. Use the rest timer and export your data when needed.

---

## 🔐 Privacy

- All workout data is stored locally in your browser using IndexedDB.
- No account registration required.
- No backend or external database.
- Export and import options let you manage your own backups.
- Your workout data is not automatically synchronized between devices or browsers.

---

## 📌 Future Improvements (Planned)

- Progressive Web App (PWA) support
- Offline access through service workers
- Cloud backup and synchronization
- Workout calendar and weekly split planner
- Additional workout statistics and progress visualization

---

## 👤 Author

**Muhammed Salah**

Cybersecurity & IT enthusiast

Interested in building minimal, practical tools.
