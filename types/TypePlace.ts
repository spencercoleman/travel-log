import * as CFRichTextTypes from '@contentful/rich-text-types';
import * as Contentful from 'contentful';

export interface TypePlaceFields {
    name: Contentful.EntryFields.Symbol;
    description?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    image: Contentful.Asset;
    type: 'city' | 'beach' | 'mountains' | 'camp';
    distance: 'close' | 'mid' | 'far';
    temperature: 'cold' | 'temperate' | 'hot';
    visited: Contentful.EntryFields.Boolean;
    visitedDate?: Contentful.EntryFields.Date;
}

export type TypePlace = Contentful.Entry<TypePlaceFields>;
