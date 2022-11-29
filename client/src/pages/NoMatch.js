import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NoMatch() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex-grow'>
				<p>There's nothing here: 404!</p>
			</div>
			<Footer />
		</div>
	);
}

export default NoMatch;
