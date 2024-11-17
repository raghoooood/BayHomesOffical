import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './app/sanity/schemas'
import StudioNavbar from './app/components/blog/StudioNavbar';

const projectId= process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath:'/studio',
  name: 'bayHomes_Blog',
  title: 'Bay Homes Blog',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio:{
    components:{
      navbar: StudioNavbar,
    }
  }
})
