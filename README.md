# 🌌 STELLA - Interactive Galaxy Explorer

> A MERN Stack application blending immersive 3D Computer Graphics with modern Human-Computer Interaction principles.


<img width="456" height="861" alt="image" src="https://github.com/user-attachments/assets/c2fa2c6d-dd09-4c15-8eba-89c3eac9e9f8" />


## Project Overview
**STELLA** is an educational galaxy exploration tool designed to demonstrate the convergence of web technologies and high-fidelity 3D graphics. Built for the **HCI & Computer Graphics (Semester 5)** course, it features a physics-based rendering engine that allows users to explore celestial bodies with realistic lighting, shadows, and post-processing effects directly in the browser.

## Key Features

### Computer Graphics (CG) Implementation
* **Real-time 3D Rendering:** Utilizes **Three.js** (via React Three Fiber) to render high-polygon sphere geometries at 60 FPS.
* **Physically Based Rendering (PBR):** Planets use PBR materials (`MeshStandardMaterial`) with properties for **Roughness** and **Metalness** to simulate realistic light interaction.
* **Advanced Lighting:** Implements **Directional Lighting** (Sun) with shadow mapping to create realistic day/night terminators on planetary surfaces.
* **Post-Processing Pipeline:**
    * **Bloom:** Simulates atmospheric glow and light scattering.
    * **Vignette:** Focuses user attention on the center subject.
    * **Film Grain (Noise):** Adds cinematic texture to the void of space.
* **Dynamic Backgrounds:** Procedurally generated starfields (`<Stars />`) that simulate depth parallax.

### Human-Computer Interaction (HCI)
* **Direct Manipulation:** Users can rotate, zoom, and pan around planets using intuitive touch/mouse gestures (`OrbitControls`).
* **Focus-Context Interface:** Implemented "Click-to-Focus" camera transitions (`<Bounds />`) to smoothly guide the user's view to points of interest without disorientation.
* **Responsive Feedback:** Interactive UI elements using **Framer Motion** for smooth state transitions and visual feedback.
* **Mobile-First Design:** A sleek, dark-mode interface optimized for readability and accessibility on varied screen sizes.

---

## Tech Stack

### Frontend (Client)
* **Framework:** React 18 (Vite Build Tool)
* **Styling:** Tailwind CSS
* **3D Engine:** Three.js, React Three Fiber (R3F)
* **3D Helpers:** @react-three/drei, @react-three/postprocessing
* **Animations:** Framer Motion
* **Routing:** React Router DOM

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas/Local)

---

## Installation & Setup

### Prerequisites
* Node.js (v18 or higher)
* npm (v9 or higher)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/stella-app.git](https://github.com/your-username/stella-app.git)
cd stella-app
