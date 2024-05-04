import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const REGISTER_USER = gql`
    mutation RegisterUser($input: RegisterInput!) {
        registerUser(input: $input) {
            id
            name
            email
        }
    }
`;

const RegistrationForm = () => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		resolver: yupResolver(schema)
	});

	const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

	const onSubmit = async (formData) => {
		try {
			const { name, email, password } = formData;
			await registerUser({
				variables: {
					input: { name, email, password }
				}
			});
			reset();
			console.log('Registration successful');
		} catch (error) {
			console.error('Registration error:', error);
		}
	};

	return (
		<div className="registration-container">
			<form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="form-title">Registration Form</h2>
				<input {...register('name')} className="input-field" placeholder="Name" />
				{errors.name && <p className="error-message">{errors.name.message}</p>}
				<input {...register('email')} className="input-field" placeholder="Email" />
				{errors.email && <p className="error-message">{errors.email.message}</p>}
				<input {...register('password')} type="password" className="input-field" placeholder="Password" />
				{errors.password && <p className="error-message">{errors.password.message}</p>}
				<input {...register('confirmPassword')} type="password" className="input-field" placeholder="Confirm Password" />
				{errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
				<button type="submit" className="submit-button" disabled={loading}>Register</button>
				{loading && <p className="loading-message">Loading...</p>}
				{error && (<p className="error-message">Error: {error.message}</p>)}
				{data && <p className="success-message">Registration successful!</p>}
			</form>
		</div>
	);
};

export default RegistrationForm;
