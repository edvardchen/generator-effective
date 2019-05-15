# prettier

Configure project to format files by `prettier`

## What it does

- Install devDependencies `prettier`
- Create `.prettierrc`
- Configure `lint-staged` field in `pckage.json` to format files when `precommit`
- If detect that the project is using eslint, make `prettier` integrate with `eslint`
  - User can choose to use `eslint` to run `prettier` or not
