import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import "./Login.css";

export const Login = (props) => {
	const navigate = useNavigate();
	const [userError, setUserError] = useState({
		error: false,
		errorText: ''
	});
	const [values, setValues] = useState({
		username: '',
		password: ''
	});
	const {
		setUserName,
		userLogIn
	} = props;

	const handleSubmit = (e) => {
		e.preventDefault();

		const usernameInStorage = JSON.parse(localStorage.getItem('Username'));
		const passwordInStorage = JSON.parse(localStorage.getItem('Password'));

		if (values.username !== usernameInStorage) {
			setUserError({ error: true, errorText: 'No such user!' });
		} else if (values.username === usernameInStorage &&
			values.password !== passwordInStorage) {
			setUserError({ error: true, errorText: 'Wrong password! Try again.' });
		} else {
			setUserError({ error: false, errorText: '' });
			userLogIn();
			setUserName(usernameInStorage);
			goHome(); // редирект на домашнюю
		}
	}

	const handleUsernameInputChange = (e) => {
		setValues({ ...values, username: e.target.value })
	}

	const handlePasswordInputChange = (e) => {
		setValues({ ...values, password: e.target.value })
	}

	const goHome = () => navigate('/', { replace: true });

	return <section className="login">
		<div className="login_window">
			<h2 className="login__header">Login</h2>
			<p className="login__text">Enter your name and password.</p>
			<form onSubmit={handleSubmit} className="login__form">
				<input
					onChange={handleUsernameInputChange}
					value={values.username}
					className="login__input"
					type="text"
					placeholder="Username"
					required />
				<input
					onChange={handlePasswordInputChange}
					value={values.password}
					className="login__input"
					type="password"
					placeholder="Password"
					required />
				<button className="login__btn" type="submit">Login</button>
			</form>
			<p className="login__suggest">Don't have an account yet?
				<Link to="/signup" className="login__link">Sign Up</Link>
			</p>
			{userError ? <div className="login__error">{userError.errorText}</div> : null}
		</div>
	</section>
}


