import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';

@model({settings: {strict: false}})
export class New extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid()
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'date',
  })
  archiveDate?: string;

  @property({
    type: 'boolean',
    default: false
  })
  deleted: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<New>) {
    super(data);
  }
}

export interface NewRelations {
  // describe navigational properties here
}

export type NewWithRelations = New & NewRelations;
