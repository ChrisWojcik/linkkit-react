// elements which can receive keyboard focus but aren't disabled or hidden
function getFocusableChildren(element) {
  return [
    ...element.querySelectorAll(`
      a[href]:not([tabindex="-1"]),
      button:not([tabindex="-1"]),
      input:not([tabindex="-1"]),
      textarea:not([tabindex="-1"]),
      select:not([tabindex="-1"]),
      details:not([tabindex="-1"]),
      [tabindex]:not([tabindex="-1"])
    `),
  ].filter((el) => {
    return (
      window.getComputedStyle(el).visibility !== 'hidden' &&
      !el.hasAttribute('disabled') &&
      (el.offsetWidth > 0 ||
        el.offsetHeight > 0 ||
        el === document.activeElement)
    );
  });
}

export default getFocusableChildren;
