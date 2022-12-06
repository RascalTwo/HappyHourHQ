import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

function Navigation() {
	const { authed, handleLogout } = useAuth();

	return (
	<div>
		{!authed ?
		<nav className='flex gap-10'>
			
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/signup'><button>Sign Up</button></NavLink>
			<NavLink to='/login'><button>Login</button></NavLink>
		</nav>
		:
		<nav className='flex gap-5'>
			<NavLink to='/'>Home</NavLink>
			<NavLink to={authed ? '/dashboard' : '/login'}>Dashboard</NavLink>
			{/* {!authed && <NavLink to='/signup'><button>Sign Up</button></NavLink> }
			{!authed && <NavLink to='/login'><button>Login</button></NavLink>} */}
			<NavLink to={authed ? '/addhappyhour' : '/login'}>Add Happy Hour</NavLink>
			<NavLink to={authed ? '/feed' : '/login'}>Feed</NavLink>
		</nav>
		}
	</div>
	);
}

export default Navigation;
