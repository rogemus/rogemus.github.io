const strokeWidth = {
  name: "setStrokeWidth",
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (node.name === "svg" && parentNode.type === "root") {
          node.attributes["stroke-width"] = "2";
        }
      },
    },
  }),
};

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
    "preset-default",
    "removeXMLNS",
    { name: "removeAttrs", params: { attrs: "class" } },
    strokeWidth,
    removeBoundingPath,
  ],
};
