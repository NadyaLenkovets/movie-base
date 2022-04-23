import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Sign-Up.css';

export const SignUp = (props) => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		password: ''
	});
	const {
		setUserName,
		userLogIn
	} = props;

	const handleUsernameInputChange = (e) => {
		setValues({ ...values, username: e.target.value })
	}

	const handlePasswordInputChange = (e) => {
		setValues({ ...values, password: e.target.value })
	}

	const handleSubmit = (e) => { //TODO добавить проверку на существование юзера
		e.preventDefault();
		localStorage.setItem('Username', JSON.stringify(values.username));
		localStorage.setItem('Password', JSON.stringify(values.password));
		userLogIn();
		setUserName(values.username);
		goHome();
	}

	const goHome = () => navigate('/', { replace: true });

	return <section className="sign-up">
		<div className="sign-up_window">
			<h2 className="sign-up__header">Sign Up</h2>
			<p className="sign-up__text">Create an account.</p>

			<form onSubmit={handleSubmit} className="sign-up__form">
				<input
					onChange={handleUsernameInputChange}
					value={values.username}
					className="sign-up__input"
					type="text"
					placeholder="Username"
					required />
				<input
					onChange={handlePasswordInputChange}
					value={values.password}
					className="sign-up__input"
					type="password"
					placeholder="Password"
					required />
				<button className="sign-up__btn" type="submit">Sign Up</button>
			</form>
			<p className="sign-up__suggest">Already have an account?
				<Link to="/login" className="sign-up__link">Login</Link>
			</p>
		</div>
	</section>
}


