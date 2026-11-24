_default:
  just --list

# Install dependencies
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

# Format css, md, ts with oxfmt
[group: 'quality']
fmt:
  npm run fmt

# Lint with oxlint
[group: 'quality']
lint:
  npm run lint

# Type-check with tsc
[group: 'quality']
typecheck:
  npm run typecheck

# Run lint, then typecheck; use before committing
[group: 'quality']
check: lint typecheck

# Show Hugo version
[group: 'quality']
version:
  hugo version
