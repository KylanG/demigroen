#!/usr/bin/env node
// Patches useEffectEvent into Next.js's compiled React bundle.
//
// Turbopack resolves `react` to `next/dist/compiled/react` internally,
// bypassing any resolveAlias we configure. Sanity requires useEffectEvent
// which was removed from React 19.1.x stable, so we patch it directly into
// the files that Turbopack (and Webpack) actually load.
'use strict'

const fs = require('fs')
const path = require('path')

const SHIM = `\n// Shim: useEffectEvent is required by Sanity but removed from React 19.1.x stable.\nif (typeof exports.useEffectEvent === 'undefined') {\n  exports.useEffectEvent = function useEffectEvent(fn) { return fn; };\n}\n`

const filesToPatch = [
  'node_modules/next/dist/compiled/react/cjs/react.development.js',
  'node_modules/next/dist/compiled/react/cjs/react.production.js',
  'node_modules/react/cjs/react.development.js',
  'node_modules/react/cjs/react.production.js',
]

const root = path.resolve(__dirname, '..')

for (const rel of filesToPatch) {
  const file = path.join(root, rel)
  if (!fs.existsSync(file)) continue

  const content = fs.readFileSync(file, 'utf-8')
  if (content.includes('useEffectEvent')) {
    console.log(`✓ Already patched: ${rel}`)
    continue
  }

  fs.appendFileSync(file, SHIM)
  console.log(`✓ Patched: ${rel}`)
}
