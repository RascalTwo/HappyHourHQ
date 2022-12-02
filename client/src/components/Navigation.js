import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

function Navigation() {
	const { authed, handleLogout } = useAuth();

	return (
		<nav className='flex gap-5'>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/dashboard'>Dashboard</NavLink>
			{!authed && <NavLink to='/signup'><button>Sign Up</button></NavLink> }
			{!authed && <NavLink to='/login'><button>Login</button></NavLink>}
			<NavLink to='/addhappyhour'>Add Happy Hour</NavLink>
			<NavLink to='/feed'>Feed</NavLink>
		</nav>
	);
}

export default Navigation;
