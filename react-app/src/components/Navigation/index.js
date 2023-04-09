import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const clickCreate = (e) => {
		e.preventDefault();
	}

	return (
		<ul>
			<li>
				<NavLink exact to="/pins">Home</NavLink>
			</li>
			<div>
				{sessionUser ? 
				(
					<button onClick={clickCreate}>
						<NavLink exact to='/pins/new'> Create </NavLink>
					</button>
				) : (null)}
			</div>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;