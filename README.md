# ˖ ࣪ ⊹ ˖ .𖥔 our little universe .𖥔˖ ⊹ ࣪ ˖

# Little Universe - a customizable, interactive gift app

A  little digital universe made for someone special. Drop in your photos, write a sweet letter, and enjoy a blind box inspired mini game that pulls randomized photo cards. Built with Electron.js and vanilla HTML, CSS and JavaScript. 

₊˚ ✧ ━━━━━━━━━━━━━━━━⊱⋆⊰━━━━━━━━━━━━━━━━ ✧ ₊˚

## ✦ Features ✦
- **Letter** - write a little personal note that users can view inside its own modal
- **Photo Album** - organize all your favorite memories by year here. Click any photo to view the full-size photos along with its caption.
- **Blind Box** - A gacha-styled card pull system with three tiers (common, rare, legendary), sparkle animations, and a holographic card flip reveal. Users also have the option to save these pulls to the photo album.
- **Animated Galaxy Background** - a twinkling pixel star field with soft pink nebula clouds, drawn using the HTML <canvas> element.
- **Icon States** - planet icons are able to swap to an "after-click" version once visited. 

₊˚ ✧ ━━━━━━━━━━━━━━━━⊱⋆⊰━━━━━━━━━━━━━━━━ ✧ ₊˚

## ✦ Project Structure ✦
```
little-universe/
├── index.html          # main UI and all modal markup
├── styles.css          # all styling
├── script.js           # galaxy background, modals, album, gacha, lightbox logic
├── main.js             # Electron entry point
└── assets/
    ├── icons/          # planet button icons (before & after click states)
    ├── album/          # yearly photo folders (2022/, 2023/, etc.)
    └── gacha/          # card images for the blind box pool
```


₊˚ ✧ ━━━━━━━━━━━━━━━━⊱⋆⊰━━━━━━━━━━━━━━━━ ✧ ₊˚


## ✦ Getting Started ✦
**Prerequisites:** [Node.js](https://nodejs.org/) and npm
 
```bash
# 1. Clone or download the project
git clone https://github.com/your-username/little-universe.git
cd little-universe
 
# 2. Install dependencies
npm install
 
# 3. Run the app
npm run start
```
This should run the app using Electron.js





