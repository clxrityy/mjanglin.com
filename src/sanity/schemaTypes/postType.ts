
import { defineArrayMember, defineField, defineType } from 'sanity'
import { SanityDocumentTextIcon } from '../components/Icons'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: SanityDocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'tag' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'image',
              title: 'Alternative text',
              options: {
                isHighlighted: true,
              },
            },
          ],
          options: {
            hotspot: false,
          },
        },
        {
          name: "code",
          title: "Code",
          type: "code",
          options: {
            withFilename: true,
            highlightedLines: true,
          }
        }
      ]
    }),
    defineField({
      name: 'preview',
      type: 'text',
      title: 'preview',
      description: 'This ends up on summary pages, on Google, when shared on social media, etc.',
      validation: Rule => Rule.max(200).error('The preview should be less than 200 characters'),
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
