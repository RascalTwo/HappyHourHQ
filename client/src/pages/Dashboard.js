import React from 'react';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import DashboardText from '../components/DashboardText';
import Footer from '../components/Footer';


function Dashboard() {
	const { user } = useAuth();

	return (
		<div className='flex flex-col h-screen '>
			<Header />
			<div className='flex-grow bg-gray-800'>
				<DashboardText />
			</div>
			
			<Footer />
		</div>
	);
}

export default Dashboard;
