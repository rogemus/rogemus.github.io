// Icons are Tabler outline icons. The shared presentation attributes (size, fill, stroke, ...)
// are set once for all icons in themes/rogemus/assets/css/base/_img.css, so they are stripped here.
const removeBoundingPath = {
  name: "removeBoundingPath",
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (
          node.name === "path" &&
          node.attributes.stroke === "none" &&
          node.attributes.d === "M0 0h24v24H0z"
        ) {
          parentNode.children = parentNode.children.filter((c) => c !== node);
        }
      },
    },
  }),
};

export default {
  multipass: true,
  plugins: [
    removeBoundingPath,
    "preset-default",
    "removeXMLNS",
    {
      name: "removeAttrs",
      params: {
        attrs:
          "svg:(class|width|height|fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)",
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: { attributes: [{ "aria-hidden": "true" }] },
    },
  ],
};
