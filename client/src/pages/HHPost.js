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
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex-grow'>
				<HHPostText postID = {params}/>
			</div>
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the HHPost page. (Private)</h2>
				<div className='flex flex-col'>
					<span>Logged in as {user.userName}</span>
					<span>ID: {user._id}</span>
                    {/* <span>Post: {params}</span> */}
					
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Dashboard;
