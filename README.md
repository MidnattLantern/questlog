# Questlog
Developed by Alma Isaksson 2026

## Table of contents
- [About](#about)
- [Packages](#packages)
- [Codebase architecture](#codebase-architecture)
- [Technical debt](#technical-debt)
- [Future features](#future-features)
- [Helpful notes](#helpful-notes)
- [Other notes](#other-notes)

## About
I love video games, so it may not come as a surprise that I struggle with the infamous backlog issue. Meanwhile, you should pride yourself with the progress you've acomplished by tracking games you've completed. Questlog is not only a project as part of vocational training, it's also a personal backlog tracker, wishlist, and hall of boasting. In Questlog, you can document your games, your status status, edit or delete, and filter by status.

This CRUD page is a proof of concept and does not authorize the user. Any visitor may alter any content, so the person the page represent is play pretend (Foby Tox). Terms and conditions: You may perform any CRUD operation, and you aggree that another user may alter your content any time.

Questlog involve React functionality, such as useState, useEffect, passing props across parents and children, developing reusable components, using the Node package React Router to perform routing (using "data mode"), and using custom hooks to store states and perform API CRUD actions. Hopefully this holds the standards for a merit "VG", but delivering a functional and passable product is good enough at the end of the day.

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
Any component that utilize styling should be modular and stored in the same directory. The scss file should have the same name as its corresponding TSX file.
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

### useEffect with custom hooks
If you–like me–tried to first update a global state, then re-render content using the new value within the same function, you'll see the DOM is always one state update behind. React handle variable states and DOM rendering differently from vanilla JavaScript. This is one reason useEffect is useful: keeping hooks as the one and only source-of-truth while achieving expected DOM behaviour.

### Converting localstorage
Data looks different across JavaScript and localstorage: localstorage as text string, JavaScript as objects.

When converting data from JavaScript object to localstorage, use [JSON.parse()](https://www.w3schools.com/js/js_json_parse.asp); from localstorage to JavaScript object, use [JSON.stringify()](https://www.w3schools.com/js/js_json_stringify.asp).

This project has a custom hook that utilize localstorage. "gameStatusFilter" reads as an object in JavaScript but is converted to a string for localstorage.

## Technical debt
Compromises that were made to hit the deadline, they're documented so that they could potentially be addressed in a future reiteration.

### Redundant submit button logic
This is at its worst in EditGame.tsx. Without any extra logic, the save button will say "saving" when performing a deletion, and the delete button will say "deleting" when performing a patch. It's tricky to address this while writing an elegant solution. Trying to clean this up shouldn't break the app, the only thing at stake is decent UX.

## Future features
Ideas how this project could potentially be improved

### Storing reusable fetched data across pages and save on API traffic
For the purpose of this project, a GET API call is made every time you enter a page that needs that data, including filtering the collection. To save on traffic, one could reduce on API fetch requests by storing the collection from one single call–with a state, localstorage/ sessionstorage, or a mix of both. Then, actions such as filtering or using one object (for edit) would be handled via client JavaScript, since there's enough information provided by the backend to work with. Note this assumes the data isn't sensitive, sometimes more api calls are neccessary for cyber-security.

## Helpful notes
### Emulate throttling (Firefox)
When developing a service that makes API calls, you'll want to see how the page behaves during the network requests. In the year 2026 of Scandinavia, internet is good – too good. To slow down the network requests, browsers let you emulate slower connections. In Firefox, hit F12, go to the Networks tab, click the dropdown bar next to the cogwheel, by default it says "No Throttling", then select any options that's slow enough. [Throttling — Firefox Source Docs documentation - Mozilla](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/throttling/index.html)

### Document directory tree structure
[tree.nathanfriend.io](https://tree.nathanfriend.com/) is a helpful tool. Don't forget to wrap your tree in markdown with backticks!

### Better optional object parameters
TLDR: add `= {}` at the end of a parameter.

You probably want a function with multiple optional arguments to be used as an object, but TypeScript might complain if you don't pass anything at all:
```ts
myFunction({
  arg1 = null,
  arg2 = null,
  arg3 = null
} : {
  arg1?: null | string,
  arg2?: null | string,
  arg3?: null | string
}) {
  /* ... */
}

myFunction({arg2: 'Alice'}) // no TS complain
myFunction({}) // no TS complain
myFunction() // TS complains!
```
If you destruct the parameter an `= {}` at the end, you'll be able to pass nothing:
```ts
myFunction({
  arg1 = null,
  arg2 = null,
  arg3 = null
} : {
  arg1?: null | string,
  arg2?: null | string,
  arg3?: null | string
} = {}) { // added "= {}"
  /* ... */
}

myFunction({arg2: 'Alice'}) // no TS complain
myFunction({}) // no TS complain
myFunction() // no TS complain
```

## Other notes
### Package compatibility
This project use Eslint, though as of writing this (3 November 2026), running the `npm install vite@latest` will serve you a version of TypeScript (TypeScript 7) not currently supported by Eslint. It's important to use TypeScript 6 in the package.json file.
```json
"devDependencies": {
  "typescript": "~6.0.3"
}
```

### Parsing functions for TypeScript
You're probably familiar with parsing things sucha strings, booleans, or numbers in TypeScrpt. If it's regarding a function, you can parse that as well.
```ts
function handleSomething({myFunction}: {() => void}) {

}
```