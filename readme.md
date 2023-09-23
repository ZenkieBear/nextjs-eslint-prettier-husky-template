# todo Prepare step

# Overview

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
npx husky install
npm pkg set scripts.prepare="husky install"
```
The first line installed **Git hooks**, this hooks will executed when we commit.
The second line defined a script in `package.json`, other developers should execute this before thier development.

### Create lint-staged hook
Steps below will let git execute "npx lint-staged", and it created a file in our project: *.husky/pre-commit*, you can manually edit it for behaviors before commits.
```shell
npx husky add .husky/pre-commit "npx lint-staged"
git add .husky/pre-commit
```

### Configure lint-staged
Let’s create a *.lintstagedrc.js* in our project’s root directory:
```js

```
