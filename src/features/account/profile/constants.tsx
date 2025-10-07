import type { IFormField } from '../../../types';

export const editUserFields: IFormField[] = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone number',
    colSpan: 2,
    applyMask: 'phone',
    validation: { required: true },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    colSpan: 2,
    validation: { required: true },
    disabled: true,
  },
];
