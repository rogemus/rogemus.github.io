---
title: "tmxu"
description: "Save and restore tmux sessions, and build new ones from templates. One small Go binary, plain JSON files."
github: "https://github.com/rogemus/tmxu"
---

## What is tmxu?

`tmxu` does two things:

1. **Session persistence**: save every running session (windows, panes, start directories and
   layouts) and restore them later.
2. **Templates**: turn a running session into a reusable blueprint and create new sessions from it
   under any name.

It is one small Go binary and keeps its data in plain JSON files.

## Requirements

- **tmux 3.8+** in your `PATH`. tmxu reads window layouts as JSON, which tmux added in 3.8.
- **Go 1.26+** to build from source.

## Installation

```bash
go install github.com/rogemus/tmxu@latest
```

Make sure `$(go env GOPATH)/bin` is in your `PATH`. From a clone of the repository, `just install`
does the same.

## Quick start

```bash
tmxu new my-project            # create a detached session
tmxu ls                        # list sessions
tmxu attach my-project         # attach to it
tmxu save                      # save all sessions
tmxu save-template my-project  # save one session as a template
```

## Usage examples

```bash
# Save and restore everything
tmxu save -yes                        # no prompt
tmxu restore                          # recreate saved sessions, skip existing ones
tmxu restore -force                   # replace existing ones

# Templates
tmxu save-template -name web api      # session "api" -> template "web"
tmxu show-template web                # look at it
tmxu new -templ web -path ~/code/shop shop

# Scripting
tmxu ls -json
tmxu dump -session api -json
tmxu paths -json
```

## How it differs

- **tmux-resurrect**: a tmux plugin (installed with tpm, driven by key bindings) that also restores
  pane contents and some running programs. tmxu is a standalone binary that saves layout and start
  directories only, and adds templates and `-json` output.
- **tmuxinator**: you write YAML project files by hand. tmxu captures a live session into a
  template, so you arrange the windows once in tmux and reuse them.
- **sesh**: a session switcher built around zoxide and fzf. tmxu does not pick or jump between
  sessions; it focuses on save, restore and templates.
