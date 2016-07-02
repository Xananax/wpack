# WPACK

Helpers & dev server for (Webpack)[webpack.github.io/]

## Installation

Node API:

```bash
npm install --save wpack
```

Command-line API:
```bash
npm install -g wpack
```

## Motivation

Webpack takes the approach of "define everything". This is all good and dandy, but it makes it really hard to get started fast.

There is a plethora of options in a common webpack file, most of which depend on other options, and a bunch that are redundant.

Wpack aims to:

 - Provide sane defaults so you can just basically run webpack from the get go and have to change very little
 - Let you define only once options that are repeated in a webpack file
 - Give you loaders for most things you would need out of the box
 - Provide a hot-reloading environment for both the browser and the server, simultaneously
 - Provide an optimized production build out of the box
 - Allow you to define options through environment variables or configuration files (or a mix of both)

 Yet:

 - Provide full extensibility if you want to change anything

It does this by providing two interfaces, a command-line one, and a node one. 

## Overview

WPACK works by:

 - reading an optional "env" object of flags (explained below)
 - reading process.env, which has similar flags
 - reading a file of WPACK options (**not** webpack options)
 - generating a webpack config

Options are read as such:

 - options file < optional "env" object < process.env

In other words, flags you pass on the command line will have preceedence over flags passed in an object, which itself has preceedence over the options file.

The generated webpack config is then used, depending on the command ran, either to write a config to disk, run a dev server, or compile your files.

## Command line Interface 

Help:

```bash
wpack -h
```
