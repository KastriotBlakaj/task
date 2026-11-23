import type { JSONSchemaType } from 'ajv';
import type { Address, Company, Post, User } from '../types';

const nonEmpty = { type: 'string', minLength: 1 } as const;

const addressSchema: JSONSchemaType<Address> = {
  type: 'object',
  required: ['street', 'suite', 'city', 'zipcode', 'geo'],
  properties: {
    street: nonEmpty,
    suite: nonEmpty,
    city: nonEmpty,
    zipcode: nonEmpty,
    geo: {
      type: 'object',
      required: ['lat', 'lng'],
      properties: {
        lat: { type: 'string', pattern: '^-?\\d+(\\.\\d+)?$' },
        lng: { type: 'string', pattern: '^-?\\d+(\\.\\d+)?$' },
      },
    },
  },
};

const companySchema: JSONSchemaType<Company> = {
  type: 'object',
  required: ['name', 'catchPhrase', 'bs'],
  properties: { name: nonEmpty, catchPhrase: nonEmpty, bs: nonEmpty },
};

export const userSchema: JSONSchemaType<User> = {
  type: 'object',
  required: ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: nonEmpty,
    username: nonEmpty,
    email: { type: 'string', format: 'email' },
    address: addressSchema,
    phone: nonEmpty,
    website: { type: 'string', format: 'hostname' },
    company: companySchema,
  },
};

export const postSchema: JSONSchemaType<Post> = {
  type: 'object',
  required: ['id', 'userId', 'title', 'body'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    userId: { type: 'integer', minimum: 1 },
    title: nonEmpty,
    body: nonEmpty,
  },
};
