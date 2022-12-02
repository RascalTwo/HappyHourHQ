import Navigation from './Navigation';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function Header() {
	const { authed, handleLogout } = useAuth();
	return (
		<div>
					{!authed && (
						<header>
							<nav className='w-full bg-neutral flex-col text-neutral-content'>
								<a href='/' className='flex text-xl font-bold justify-center items-end p-0.5'>
									Happy Hour HQ
								</a>
								<div className='flex justify-center'>
									<Navigation />
								</div>
							</nav>
						</header>
					)}
					{authed && (
						<header>
						<nav className='w-full bg-neutral flex-col text-neutral-content'>
							<a href='/' className='flex text-xl font-bold justify-center items-end p-0.5'>
								Happy Hour HQ
							</a>
							<div className='flex justify-between items-center'>
								<div className='w-10'></div>
								<Navigation />
						<div className='flex'>
							<div className="dropdown dropdown-end">
								<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img src="https://placeimg.com/80/80/people" />
								</div>
								</label>
								<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52">
								<li>
									<a className="justify-between">
									Profile
									<span className="badge">New</span>
									</a>
								</li>
								<li><a>Settings</a></li>
								<li><button type='button' onClick={handleLogout}>Sign Out</button></li>
								</ul>
							</div>
						</div>
						</div>
				
				</nav>
				
			</header>
					)}
	</div>
	);

}
