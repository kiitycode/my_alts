import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulated login - no API call needed
    login({
      id: `user-${Date.now()}`, // Unique user ID
      username: data.username,
      token: 'simulated-token'
    });
    navigate('/');
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <section style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>🔐 Login (Simulated)</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            {...register('username', { required: 'Enter any username' })}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Enter any username"
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username.message}</div>
          )}
        </div>

        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Enter any password' })}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Enter any password"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary mt-3 w-100"
        >
          Login
        </button>
      </form>
    </section>
  );
}