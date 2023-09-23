# How to use?
- Open terminal at your workspace directory, execute `git clone https://github.com/ZenkieBear/nextjs-eslint-prettier-husky-template.git`
- Install dependencies:
  ```shell
  npm install
  ```
- Execute prepare step;
  ```shell
  npm run prepare
  ```
- Run for development:
  ```shell
  npm run dev
  ```
- Run for production:
  ```shell
  npm run build && npm run start
  ```

# Overview Build Steps

This file shows the steps to build a NextJS App with prettier and configure husky to implement linting at git commit time.
You can use this project to start build your application, or follow these steps below to build it by yourself~😃

## Initialize Next App

```shell
npm create next-app nextjs-eslint-prettier-husky-template
Need to install the following packages:
create-next-app@13.5.2
Ok to proceed? (y)
✔ Would you like to use TypeScript? … No / [Yes]
✔ Would you like to use ESLint? … No / [Yes]
✔ Would you like to use Tailwind CSS? … [No] / Yes
✔ Would you like to use `src/` directory? … No / [Yes]
✔ Would you like to use App Router? (recommended) … No / [Yes]
✔ Would you like to customize the default import alias? … No / [Yes]
✔ What import alias would you like configured? … [@]/*
Creating a new Next.js app in /Workspace/react/nextjs-eslint-prettier-husky-template.

Using npm.

Initializing project with template: app


Installing dependencies:
- react
- react-dom
- next
- typescript
- @types/react
- @types/node
- @types/react-dom
- eslint
- eslint-config-next


added 279 packages in 17s
Success! Created nextjs-eslint-prettier-husky-template at /Workspace/react/nextjs-eslint-prettier-husky-template
```

Notice on **dependencies**: I choose eslint to install.

## Configure Prettier

Prettier official recommended install `eslint-config-prettier` when we [use eslint together](https://prettier.io/docs/en/install#eslint-and-other-linters).
I’ve been tried, you don’t need to install the `prettier`, `eslint-config-prettier` has contained it.

```shell
npm install -D eslint-config-prettier
```

Let's test prettier.
The `-c` means `--check`, it just check our codes. If you use `-w`(`--write`) option, prettier will fix our code format and save it to origin file, this process is automatically.
Remember Prettier’s job: formatting our code style. I recommend you use `-w` straightly, because it won’t change your logics, but eslint will do this.
So keep Prettier automatic formatting, just let eslint checking.

```shell
npx prettier -c .
Checking formatting...
[warn] next.config.js
[warn] readme.md
[warn] src/app/globals.css
[warn] src/app/layout.tsx
[warn] src/app/page.module.css
[warn] src/app/page.tsx
[warn] Code style issues found in 6 files. Run Prettier to fix.
```

### [Optional] Define custom prettier rules

Create a `.prettierrc.json` file in our project’s root path:

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid"
}
```

There’re many configuration file [formats](https://prettier.io/docs/en/configuration) you can choose. Prettier follow these [rules](https://prettier.io/docs/en/options) format our code style, you can check Prettier’s API document and define your rules.

### [Optional] Adding npm script

Modify our `package.json`, find "scripts" - "lint". Then change append "` && npx prettier -w .`", and it would be like this:

```json
{
  ...,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint && npx prettier -w ."
  },
  ...
}
```

Now you can run `npm run lint`, it would let eslint test and then prettier formats our code style.

## Configure Git Hook

We will use [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).

### Install Them

```shell
npm install -D husky lint-staged
```

### Configure Husky

```shell
npm pkg set scripts.prepare="husky install && npx husky add .husky/pre-commit \"npx lint-staged\" && git add .husky/pre-commit"
```
This line defined a script in `package.json`, other developers should execute this before thier development.
1. Install **Git hooks**, this hooks will executed when we commit.
2. Create a file in our project: _.husky/pre-commit_, it contains commands to execute like "npx lint-staged", you can manually edit it to manage behaviors.
3. Add it to git, then git will execute it before commit.

### Configure lint-staged

Let’s create a _.lintstagedrc.js_ in our project’s root directory:

```js
const path = require("path");

const testEslint = filenames =>
  `next lint --fix --file ${filenames
    .map(name => path.relative(process.cwd(), name))
    .join(' --file ')}`;
const testPrettier = filenames =>
  `npx prettier -w ${filenames
    .map(name => path.relative(process.cwd(), name))
    .join(' ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [testEslint, testPrettier],
}
```
The `testEslint` and `testPrettier` concat all staged file’s name, and generate the command for linting.

## [Optional] Inspect Result
Let’s check our work achievements!
1. Break any code style, such as add different tab width, add some meaningless whitespaces...
2. Stage the file you modified through `git add .`
3. Commit your changes through `git commit`, the console will linting with eslint and prettier before commit, and it will cancel the commit cause of the warnings in your code.

## Finally
Congratulations! Now all integration is finished.👏
