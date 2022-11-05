import { setLocale } from 'yup';
import { REG_EXP } from 'constant';

setLocale({
  mixed: {
    required: {
      key: 'validations.required',
    },
  },
  string: {
    matches: {
      [REG_EXP.alphabet as unknown as string]: {
        key: 'validations.pattern.alphabet',
      },
    },
    min: ({ min }) => ({
      key: 'validations.minLength',
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'validations.maxLength',
      values: { max },
    }),
    email: {
      key: 'validations.email',
    },
  },
  number: {
    positive: {
      key: 'validations.pattern.positive',
    },
    min: ({ min }) => ({
      key: 'validations.min',
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'validations.max',
      values: { max },
    }),
  },
  boolean: {},
});
