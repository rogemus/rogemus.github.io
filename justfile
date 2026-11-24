_default:
  just --list

# Install npm dependencies (postcss, cssnano)
[group: 'setup']
setup:
  npm install

# Start Hugo dev server with drafts, e.g. just dev
[group: 'dev']
dev:
  hugo server -D

# Create a new content page, e.g. just new posts/my-post.md
[group: 'dev']
new PATH:
  hugo new content {{PATH}}

# Build the site into ./public (minified)
[group: 'build']
build:
  hugo --gc --minify

# Remove generated output
[group: 'build']
clean:
  rm -rf public resources

# Show Hugo version
[group: 'quality']
version:
  hugo version
