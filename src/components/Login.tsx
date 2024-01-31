import { FormEvent } from 'react';
import { login } from '../DB/supabase';

const Login = () => {
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Assuming login function returns a Promise
      await login({ email, password });
    } catch (error) {
      console.error('Login failed', error); // Handle error
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Email:
        <input
          type='email'
          name='email'
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type='password'
          name='password'
          required
        />
      </label>
      <br />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
