import {Document, Schema, model} from 'mongoose';

export interface StudentInterface extends Document {
  name: string,
  surname: string[],
  dni: string,
  age: number,
  email: string,
  degree: string,
  courses: string[]
}

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        // eslint-disable-next-line max-len
        throw new Error('Students name must start in caps');
      }
    },
  },
  surname: {
    type: Array,
    required: true,
    trim: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^\d{8}[a-zA-Z]$/)) {
        throw new Error('Not valid DNI');
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value < 1) {
        throw new Error('The age cant be lower than 1');
      }
    },
  },
  email: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.indexOf('@')) {
        throw new Error('Not valid email');
      }
    },
  },
  degree: {
    type: String,
    required: true,
  },
  courses: {
    type: Array,
    required: true,
  },
});

/**
 * @const Artist
 */
export const Student = model<StudentInterface>('Student', StudentSchema);
