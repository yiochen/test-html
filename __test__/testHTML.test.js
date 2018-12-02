const testHtml = require('../testHtml');

test('README example', () => {
  const element = testHtml`
    <ul class="todo-list">
      <li class="todo-item">Make coffee</li>
      <li class="todo-item">Check email</li>
      <li class="todo-item">Read news</li>
    </ul>`;

  expect(element.querySelectorAll('.todo-item').length).toBe(3);
  expect(element.className).toBe('todo-list');
  document.body.appendChild(element);
  expect(document.body.querySelector('.todo-list')).toBe(element);
  document.body.innerHTML = '';

  const nodeList = testHtml`
    <li class="todo-item">Make coffee</li>
    <li class="todo-item">Check email</li>
    <li class="todo-item">Read news</li>`;
  expect(nodeList.length).toBe(3);

  const container = testHtml`
  <div>
    <span>   Hello world   </span>
  </div>`;
  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe('Hello world');
});

test('should work', () => {
  expect(testHtml`<div>Hello world</div>`).toMatchInlineSnapshot(`
<div>
  Hello world
</div>
`);
});

test('should support single text node', () => {
  expect(testHtml`single TextNode`).toMatchInlineSnapshot(`single TextNode`);
});

test('should support no element', () => {
  expect(testHtml``).toMatchInlineSnapshot(`undefined`);
});

test('shoud support html without closing tag', () => {
  expect(testHtml`<div> Not closing`).toMatchInlineSnapshot(`
<div>
  Not closing
</div>
`);
});

test('should support multi line html', () => {
  expect(testHtml`
    <div>
      <h1>Hello</h1>
      <p>world</p>
    </div>
    `).toMatchInlineSnapshot(`
<div>
  <h1>
    Hello
  </h1>
  <p>
    world
  </p>
</div>
`);
});

test('should trim white spaces around tags', () => {
  expect(testHtml`     <div>
    
    Hello world.     spaces in between words     are not removed
    </div>
    
    `).toMatchInlineSnapshot(`
<div>
  Hello world.     spaces in between words     are not removed
</div>
`);
});

test('should support interpolation', () => {
  expect(testHtml`
    <ul>
      <li>Number: ${12.12}</li>
      <li>String: ${'abc'}</li>
      <li>Boolean: ${true}</li>
      <li>Array: ${['a', 'b', 'c']}</li>
      <li>Object: ${{ value: 12 }}</li>
      <li>Null: ${null}</li>
      <li>Undefined: ${undefined}</li>
    </ul>`).toMatchInlineSnapshot(`
<ul>
  <li>
    Number: 12.12
  </li>
  <li>
    String: abc
  </li>
  <li>
    Boolean: true
  </li>
  <li>
    Array: a,b,c
  </li>
  <li>
    Object: [object Object]
  </li>
  <li>
    Null: null
  </li>
  <li>
    Undefined: undefined
  </li>
</ul>
`);
});

test('should return a NodeList when the html contains multiple nodes', () => {
  const nodeList = testHtml`hello <div>world</div>`;
  expect(nodeList instanceof NodeList);
  expect(nodeList.length).toBe(2);
  expect(nodeList[0]).toMatchInlineSnapshot(`hello`);
  expect(nodeList[1]).toMatchInlineSnapshot(`
<div>
  world
</div>
`);
});
