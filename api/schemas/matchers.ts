import Ajv, { type AnySchema, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { expect as baseExpect } from '@playwright/test';

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

const compiled = new WeakMap<object, ValidateFunction>();
function validatorFor(schema: AnySchema): ValidateFunction {
  if (typeof schema === 'boolean') return ajv.compile(schema);
  let validate = compiled.get(schema);
  if (!validate) {
    validate = ajv.compile(schema);
    compiled.set(schema, validate);
  }
  return validate;
}

export const expect = baseExpect.extend({
  toMatchSchema(received: unknown, schema: AnySchema) {
    const validate = validatorFor(schema);
    const pass = validate(received) as boolean;
    const errors = (validate.errors ?? []).map((e) => `  ${e.instancePath || '(root)'} ${e.message}`).join('\n');
    return {
      pass,
      name: 'toMatchSchema',
      message: () =>
        pass
          ? 'expected value not to match the schema'
          : `expected value to match the schema:\n${errors}\n\nreceived: ${JSON.stringify(received, null, 2)}`,
    };
  },
});
