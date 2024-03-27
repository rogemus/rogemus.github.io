const postcssNesting = require('postcss-nesting');
const pruneVar = require('postcss-prune-var');

module.exports = {
  plugins: [
    postcssNesting(),
    pruneVar()
  ]
};
