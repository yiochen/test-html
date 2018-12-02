/**
 * Disclaimer: This utility should only be used in test environment for generating HTML elements.
 * No escaping is built. It is vulnerable against cross site scripting.
 */

const DOMParser = new window.DOMParser();

function testHtml(strings, ...keys) {
  const parts = [];
  strings.raw.forEach(function(string, index) {
    parts.push(string.replace(/\s*(<.*?>)\s*/g, '$1'));
    if (index < keys.length) {
      parts.push(`${keys[index]}`);
    }
  });
  const generatedElements = DOMParser.parseFromString(
    parts.join(''),
    'text/html',
  ).body.childNodes;
  switch (generatedElements.length) {
    case 0:
      return undefined;
    case 1:
      return generatedElements[0];
    default:
      return generatedElements;
  }
}

module.exports = testHtml;
