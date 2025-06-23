# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Deployment to Vercel

The project is configured for deployment on Vercel:

- Ensure the `vercel.json` file is present in the project root specifying the build output directory (`dist`).
- Push your changes to the `main` (or your production) branch; Vercel will automatically build and deploy the application.
- Manual deployments can be triggered via the Vercel dashboard.

## Gitflow Testing Guidelines

Use the Gitflow branching model and include testing steps before merging any branch:

- Feature branches: `feature/<name>`
- Release branches: `release/<version>`
- Hotfix branches: `hotfix/<version>`

Important: ensure you are on the `dev` branch before running tests and pushing code:

```bash
git checkout dev
```

Before pushing or creating a pull request:

1. Run unit and integration tests:
   ```bash
   npm test
   ```
2. Run end-to-end tests:
   ```bash
   npm run cypress:run
   ```
3. Run linting:
   ```bash
   npm run lint
   ```

Include these commands in your CI pipeline for each branch and pull request to ensure code quality and deployment readiness.