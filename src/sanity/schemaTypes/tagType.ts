import {defineField, defineType} from 'sanity'
import { SanityTagIcon } from '../components/Icons'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: SanityTagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: "title",
      validation: Rule => Rule.required().error('A title is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required().error('A slug is required'),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: "icon",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        }
      ]
    })
  ],
})