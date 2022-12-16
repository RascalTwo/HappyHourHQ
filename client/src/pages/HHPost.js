import React from 'react';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import { createSearchParams, NavLink, useParams } from 'react-router-dom';
import HHPostText from '../components/HHPostText';
import Footer from '../components/Footer';



function Dashboard() {
	const { user } = useAuth();
    const params = useParams();
    console.log(params)
	return (
		<div className='flex flex-col min-h-screen bg-gray-800 md:bg-gray-200'>
			<Header />
			<div className='flex-grow'>
				<HHPostText postID = {params}/>
			</div>
			
			<Footer />
		</div>
	);
}

export default Dashboard;
