import React from 'react';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import HHFeedText from '../components/HHFeedText';
import Footer from '../components/Footer';

function Dashboard() {
	const { user } = useAuth();

	return (
		<div className='flex flex-col min-h-screen bg-gray-200'>
			<Header />
			<div className='flex-grow'>
            <HHFeedText />
			</div>
			
			<Footer />
		</div>
	);
}

export default Dashboard;