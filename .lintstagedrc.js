const path = require('path')

const testEslint = filenames =>
  `next lint --fix --file ${filenames
    .map(name => path.relative(process.cwd(), name))
    .join(' --file ')}`
const testPrettier = filenames =>
  `npx prettier -w ${filenames
    .map(name => path.relative(process.cwd(), name))
    .join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [testEslint, testPrettier],
}
