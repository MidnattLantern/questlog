# Questlog
Developed by Alma Isaksson 2026

## Packages
### SASS
Making cascade stylesheets more convenient to work with, such as nested selected within declarations, or `// single line` comments that isn't `/* mutiline */`.

To use, simply import with the `.scss` extension

### SVG support "svgr"
Making SVG assets compatible with React for Vite.

To use, make a named import and end the path with `?react`, then place the SVG as a custom react element:
```tsx
import MySvg from '*/path/to/my-svg.svg?react'

function MyComponent() {
  return (
    <MySvg/>
  )
}
```

NOTE: If you intend to style vectors with stylesheets, you won't be able to use modular stylesheets.

## Other notes
### Package compatibility
This project use Eslint, though as of writing this (3 November 2026), running the `npm install vite@latest` will serve you a version of TypeScript (TypeScript 7) not currently supported by Eslint. It's important to use TypeScript 6 in the package.json file.
```json
"devDependencies": {
  "typescript": "~6.0.3"
}
```