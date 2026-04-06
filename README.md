# CellWars Multiplayer

A real-time multiplayer agar.io-style game built with Node.js, Express, and Socket.IO.

## Features

- **Real-time Multiplayer**: Multiple players can join and play simultaneously
- **Player Movement**: Mouse-controlled movement with smooth animations
- **Orb Collection**: Absorb orbs to grow your character
- **Player Absorption**: Larger players can absorb smaller players
- **Leaderboard**: Real-time score tracking and leaderboard updates
- **Dynamic World**: 5000x5000 game world with zoom mechanics
- **Collision Detection**: Precise collision detection for orbs and players
- **Game Messages**: Real-time notifications for player interactions

## Tech Stack

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for serving static files
- **Socket.IO**: Real-time bidirectional communication
- **Custom Classes**: Modular architecture with Player, Orb, and collision detection

### Frontend

- **HTML5 Canvas**: Game rendering
- **JavaScript**: Client-side game logic
- **Bootstrap**: UI components and styling
- **Socket.IO Client**: Real-time communication with server

## Installation

1. Clone the repository

```bash
git clone https://github.com/vasylpryimakdev/shadcn-dashboard.git
cd shadcn-dashboard
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
npm start
```

2. Open your browser and navigate to:

```
http://localhost:5000
```

3. Enter your player name and start playing!

## Game Controls

- **Mouse Movement**: Move your mouse to control your character
- **Objective**: Absorb orbs to grow larger and absorb other players
- **Strategy**: Avoid larger players while hunting smaller ones

## Project Structure

```
cellwars-multiplayer/
├── socketStuff/
│   ├── classes/
│   │   ├── Player.js          # Player class
│   │   ├── PlayerConfig.js    # Player configuration
│   │   ├── PlayerData.js      # Player data management
│   │   └── Orb.js             # Orb class
│   ├── checkCollisions.js     # Collision detection logic
│   └── socketMain.js          # Main Socket.IO server logic
├── expressStuff/
│   └── expressMain.js         # Express server setup
├── public/
│   ├── index.html              # Main HTML file
│   ├── styles.css             # Game styling
│   ├── canvasStuff.js         # Canvas rendering logic
│   ├── socketStuff.js         # Client-side Socket.IO logic
│   ├── uiStuff.js             # UI management
│   └── images/                # Game assets
├── servers.js                 # Main server file
├── index.js                   # Entry point
└── package.json               # Dependencies and scripts
```

## Game Mechanics

### Player System

- Players start with default size and speed
- Movement is controlled by mouse position
- Speed decreases as player grows larger
- Zoom adjusts to keep player visible on screen

### Orb System

- 5000 randomly placed orbs in the game world
- Each orb has random color and position
- Orbs regenerate immediately after being absorbed
- Absorbing orbs increases player size and score

### Collision Detection

- Two-phase collision detection (AABB + Pythagorean)
- Precise circle-to-circle collision for orbs
- Player-to-player collision with absorption mechanics
- Server-authoritative collision resolution

### Scoring System

- Points for absorbing orbs
- Bonus points for absorbing other players
- Real-time leaderboard updates
- Persistent score tracking during gameplay

## Configuration

Game settings can be adjusted in `socketStuff/socketMain.js`:

```javascript
const settings = {
  defaultNumberOfOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
  defaultGenericOrbSize: 5,
};
```

## Acknowledgments

- Built following Socket.IO multiplayer game development patterns
- Inspired by agar.io gameplay mechanics
- Uses modern JavaScript ES6+ features
