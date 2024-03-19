import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { updatePassword } from '../DB/supabase';
import calculatePasswordStrength from '../utils/passwordStrength';
import sanitize from '../utils/sanitize';
import { Strength } from '../utils/types';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

interface PasswordFormData {
  newPass: string;
  confirmPass: string;
}

interface PasswordStrengthData {
  newPass: Strength;
  confirmPass: Strength;
}

export function checkMatch(a: String, b: String): boolean {
  return a === b;
}

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState<PasswordFormData>({
    newPass: '',
    confirmPass: '',
  });

  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthData>({
      newPass: 'Empty',
      confirmPass: 'Empty',
    });

  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  // Define a handler for changing form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Sanitize the user input
    const cleanValue = sanitize(value);
    const passwordStrength = calculatePasswordStrength(cleanValue);

    // Update the form data based on the field ID
    setFormData((prevState) => ({
      ...prevState,
      [id]: cleanValue,
    }));

    setPasswordStrength((prevState) => ({
      ...prevState,
      [id]: passwordStrength,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkMatch(formData.newPass, formData.confirmPass)) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      try {
        updatePassword(formData.confirmPass);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form
      className='w-full bg-primary p-4 rounded-b-lg'
      onSubmit={handleFormSubmit}
    >
      <ul className='w-full flex flex-col p-4 gap-2 rounded-b-lg'>
        <li className='flex flex-col gap-2'>
          <label htmlFor='newPass'>Create a new Password</label>
          <input
            type='password'
            id='newPass'
            placeholder=''
            value={formData.newPass}
            onChange={handleChange}
          />
          <PasswordStrengthIndicator strength={passwordStrength.newPass} />
        </li>
        <li className='flex flex-col gap-2'>
          <label htmlFor='confirmPass'>Re-Enter your new Password</label>
          <input
            type='password'
            id='confirmPass'
            value={formData.confirmPass}
            onChange={handleChange}
            className={`${
              formData.confirmPass.length >= 4 && !passwordMatch
                ? 'border-red-500'
                : ''
            }`} // Apply red border if passwords don't match
          />
          {!checkMatch(formData.newPass, formData.confirmPass) && (
            <div className='text-red-500'>Passwords do not match</div>
          )}
          <PasswordStrengthIndicator strength={passwordStrength.confirmPass} />
        </li>
      </ul>
      <button
        type='submit'
        disabled={!checkMatch(formData.newPass, formData.confirmPass)}
        className='disabled:text-slate-500'
      >
        Submit
      </button>
    </Form>
  );
};

export default ChangePasswordForm;
