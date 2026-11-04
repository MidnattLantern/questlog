# Questlog
Developed by Alma Isaksson 2026

## Table of contents
- [About](#about)
- [Packages](#packages)
- [Helpful notes](#helpful-notes)
- [Other notes](#other-notes)

## About
I love video games, so it may not come as a surprise that I struggle with the infamous backlog issue. Meanwhile, you should pride yourself with the progress you've acomplished by tracking games you've completed (especially soulslike). Questlog is not only a project as part of vocational training, it's also a personal backlog tracker, wishlist, and hall of boasting. In Questlog, you can document your games, your status status, edit or delete, and filter by status.

This CRUD page is a proof of concept and does not authorize the user. Any visitor may alter any content, so the person the page represent is play pretend (Foby Tox). Terms and conditions: You may perform any CRUD operation, and you aggree that another user may alter your content any time.

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

## Helpful notes
### Emulate throttling (Firefox)
When developing a service that makes API calls, you'll want to see how the page behaves during the network requests. In the year 2026 of Scandinavia, internet is good – too good. To slow down the network requests, browsers let you emulate slower connections. In Firefox, hit F12, go to the Networks tab, click the dropdown bar next to the cogwheel, by default it says "No Throttling", then select any options that's slow enough. [Throttling — Firefox Source Docs documentation - Mozilla](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/throttling/index.html)

## Other notes
### Package compatibility
This project use Eslint, though as of writing this (3 November 2026), running the `npm install vite@latest` will serve you a version of TypeScript (TypeScript 7) not currently supported by Eslint. It's important to use TypeScript 6 in the package.json file.
```json
"devDependencies": {
  "typescript": "~6.0.3"
}
```