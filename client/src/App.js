import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AddHappyHour from './pages/AddHappyHour';
import Feed from './pages/Feed';
import HHPost from './pages/HHPost'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/dashboard'
				element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				}
			/>
			<Route
				path='/signup'
				element={
					<SignUp />
				}
			/>
			<Route
				path='/login'
				element={
					<Login />
				}
			/>
			<Route
				path='/addHappyHour'
				element={
					<AddHappyHour />
				}
			/>
			<Route
				path='/feed'
				element={
					<Feed />
				}
			/>
			<Route
				path='HHPost/:id'
				element={
					<HHPost />
				}
			/>
			<Route path='*' element={<NoMatch />} />
		</Routes>
	);
};

export default App;
