A simple utility to create HTML elements in test. This is inspired from [lit-html](https://lit-html.polymer-project.org/). If you need a full blown html template engine, check it out.

## Installation

This project is under MIT liscence. It has no dependency. Simply copy the code for `testHtml.js` to your codebase and use it however you want.

## Usage

Create a single DOM node.

```javascript
const element = testHtml`
  <ul class="todo-list">
    <li class="todo-item">Make coffee</li>
    <li class="todo-item">Check email</li>
    <li class="todo-item">Read news</li>
  </ul>`;
// element is a DOM element, use it however you want

console.log(element.querySelectorAll('.todo-item').length); // 3
console.log(element.className); // "todo-list
document.body.appendChild(element);
```

Create multiple DOM nodes when the HTML string contains multiple nodes

```javascript
const nodeList = testHtml`
    <li class="todo-item">Make coffee</li>
    <li class="todo-item">Check email</li>
    <li class="todo-item">Read news</li>
`;
console.log(nodeList.length); // 3
```

## Why

In unit test, we sometimes need to create HTML elements. There are multiple ways to create elements. For example:

```javascript
document.createElement('div').innerHTML = 'Hello world';
```

Or if you use JQuery

```javascript
$.parseHTML('<div>Hello world</div>');
```

But they all have a drawback. When we pass templates with white spaces (tabs, line breaks), they are treated as TextNodes in the resulting elements. These white spaces might not have any visual effect, but they might affect our tests.

```javascript
const container = document.createElement('div');
container.innerHTML = `
  <span>Hello world</span>
`;

expect(container.childNodes.length).toBe(3); // Text, HTMLSpanElement, Text
```

`testHtml` on the other hand will trim the white spaces around tags (while preserving the white spaces inside text).

```javascript
const container = testHtml`
  <div>
    <span>   Hello world   </span>
  </div>
`;
expect(container.childNodes.length).toBe(1);
expect(container.childNodes[0].textContent).toBe('Hello world');
```

This utility is only suitable for test, because it is too primitive to be used as a templating engine and it doesn't handle escaping at all.
