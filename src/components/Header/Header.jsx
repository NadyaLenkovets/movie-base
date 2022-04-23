import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Header.css';

export const Header = (props) => {
	const {
		userIsAuth,
		userLogOut,
		username
	} = props;

	return (
		<header className="header container">
			<div className="headerLogo">
				<Link to="/" className="logoLink">Movie Base</Link>
			</div>

			{
				userIsAuth
					? <>
						<div className="header__username">{username}</div>
						<div className="headerButtons">
							<Link to="/favorites" className="header__btn ">Favorites</Link>
							<Link to="/history" className="header__btn ">History</Link>
							<Link to="/" className="header__btn" onClick={userLogOut}>Log Out</Link>
						</div>
					</>
					: <div className="headerButtons">
						<Link to="/login" className="header__btn">Login</Link>
						<Link to="/signup" className="header__btn">Sign Up</Link>
					</div>
			}
		</header>
	);
};

Header.propTypes = {
	userIsAuth: PropTypes.bool,
	userLogOut: PropTypes.func,
	username: PropTypes.string,
}