import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable "${name}". Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const PERSONAS = ['standard', 'problem'] as const;
export type Persona = (typeof PERSONAS)[number];

export interface Credentials {
  username: string;
  password: string;
}

export const config = {
  ui: { baseUrl: required('UI_BASE_URL') },
  api: { baseUrl: required('API_BASE_URL') },
} as const;

export function credentialsFor(persona: Persona): Credentials {
  const password = required('SAUCE_PASSWORD');
  switch (persona) {
    case 'standard':
      return { username: required('SAUCE_STANDARD_USER'), password };
    case 'problem':
      return { username: required('SAUCE_PROBLEM_USER'), password };
  }
}

export function storageStatePath(persona: Persona): string {
  return path.resolve(__dirname, '../.auth', `${persona}.json`);
}
