import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {postType} from './postType'
import {authorType} from './authorType'
import { tagType } from './tagType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, tagType, postType, authorType],
}
