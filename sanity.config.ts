import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { structure } from './sanity/structure'
import * as schemaTypes from './sanity/schemaTypes'

export default defineConfig({
  name: 'ssupply-starter',
  title: 'SSUPPLY Starter',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: Object.values(schemaTypes),
  },
})
