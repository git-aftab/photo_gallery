# Photo Gallery

An editorial-style photo gallery built with React, Vite, and Tailwind CSS. It loads a collection of photos from an API, supports author search and favourites, and persists favourites in local storage.

## About the project

This project is primarily a practical demonstration of React state and rendering-performance patterns:

- **`useReducer`** manages favourites through explicit actions. Toggling one photo updates only the relevant favourite state.
- **`useCallback`** keeps search and favourite handlers stable between renders, so memoised child components do not receive new function references unnecessarily.
- **`useMemo`** caches the filtered photo collection and recalculates it only when the search query or fetched photos change.
- **API fetching** is contained in a custom hook with loading, error, and cancellation handling via `AbortController`.
- **`React.memo`** is used for photo cards and the search input, helping avoid unnecessary re-renders when another photo is favourited or unrelated state changes.

Together, these patterns keep interactions responsive: searching only recalculates when the search term changes, and favouriting a specific photo does not cause every card to re-render.

## Installation

### Prerequisites

- Node.js 18 or later
- npm

### Run locally

1. Clone the repository and open the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the API URL in a `.env` file at the project root:

   ```env
   VITE_API_URL=https://picsum.photos/v2/list?page=1&limit=30
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown by Vite in your browser.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Project structure

```text
src/
├── components/         # Gallery, cards, search, and loading UI
├── hooks/              # API-fetching custom hook
├── reducers/           # Favourites reducer and persistence helpers
├── App.jsx             # Page shell
└── index.css           # Tailwind theme tokens and global styles
```
