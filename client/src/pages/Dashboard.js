import React from 'react';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import DashboardText from '../components/DashboardText';
import Footer from '../components/Footer';


function Dashboard() {
	const { user } = useAuth();

	return (
		<div className='flex flex-col h-screen bg-gray-200'>
			<Header />
			<div className='flex-grow'>
				<DashboardText />
			</div>
			
			<Footer />
		</div>
	);
}

export default Dashboard;
