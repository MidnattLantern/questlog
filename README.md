# Questlog
Developed by Alma Isaksson 2026

## Table of contents
- [About](#about)
- [Packages](#packages)
- [Codebase architecture](#codebase-architecture)
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

### React router
Enable react to behave like a multi-page application, meaning different content will be displayed depending on the url query.

Questlog use the "Data mode", meaning each route is declared at a centralized section, namely the App.tsx file.

The scope of Questlog is small, but if you ever need to nest what content should be displayed under whatever route as parent, include the `<Outlet/>` component.

## Codebase architecture
### Modular styling
Any component that utulize styling should be modular and stored in the same directory. The scss file should have the same name as its corresponding TSX file.
```
myComponent
├── MyComponent.tsx
└── MyComponent.module.scss
```
Modular styling will make each component's names truly unique. Three files can have ".container" as a classname and three different rules, without interfering or overriding one another.

The exceptions are index.scss and stylesheets targeting SVG:s.

### Components & Subcomponents
There are two different kinds of components:
- Those inside the "components" directory at "src" level
- Those inside a "components" directory within a page directory
```
src
├── components
│   ├── SomeComponent1.tsx
│   ├── SomeComponent2.tsx
│   └── SomeComponent3.tsx
└── pages
    ├── somePage1
    │   ├── SomePage1.tsx
    │   └── components
    │       ├── SomeComponent1ForPage1.tsx
    │       ├── SomeComponent2ForPage1.tsx
    │       └── SomeComponent3ForPage1.tsx
    ├── somePage2
    │   ├── SomePage2.tsx
    │   └── components
    │       ├── SomeComponent1ForPage2.tsx
    │       ├── SomeComponent2ForPage2.tsx
    │       └── SomeComponent3ForPage2.tsx
    └── somePage3
        ├── SomePage3.tsx
        └── components
            ├── SomeComponent1ForPage3.tsx
            ├── SomeComponent2ForPage3.tsx
            └── SomeComponent3ForPage3.tsx
```
Components of the ladder exists so that tsx files may be clean with only one component renderer function, while they don't fit inside the componetns at src level.
```tsx
// Same tsx file – this is messy

function Subcomponent1() {
  return <p>Foo</p>
}

function Subcomponent2() {
  return <p>Bar</p>
}

function MyComponent() {
  return (
    <>
      <Subcomponent1/>
      <Subcomponent2/>
    </>
  )
}

export default MyComponent
```
```tsx
// This is better

import Subcomponent1 from "./components/Subcomponent1"
import Subcomponent2 from "./components/Subcomponent2"

function MyComponent() {
  return (
    <>
      <Subcomponent1/>
      <Subcomponent2/>
    </>
  )
}

export default MyComponent
```
The directories are still just called "component", living within a page directory is enough informaion that it's a subcomponent.

## Helpful notes
### Emulate throttling (Firefox)
When developing a service that makes API calls, you'll want to see how the page behaves during the network requests. In the year 2026 of Scandinavia, internet is good – too good. To slow down the network requests, browsers let you emulate slower connections. In Firefox, hit F12, go to the Networks tab, click the dropdown bar next to the cogwheel, by default it says "No Throttling", then select any options that's slow enough. [Throttling — Firefox Source Docs documentation - Mozilla](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/throttling/index.html)

### Document directory tree structure
[tree.nathanfriend.io](https://tree.nathanfriend.com/) is a helpful tool.

Don't forget to wrap your tree in markdown with backticks!

## Other notes
### Package compatibility
This project use Eslint, though as of writing this (3 November 2026), running the `npm install vite@latest` will serve you a version of TypeScript (TypeScript 7) not currently supported by Eslint. It's important to use TypeScript 6 in the package.json file.
```json
"devDependencies": {
  "typescript": "~6.0.3"
}
```