import React from 'react';
import Header from "../components/Header";
import useAuth from '../auth/useAuth';
import HHForm from '../components/HHForm'

export default function AddHappyHour(){
    const { user } = useAuth();
    return (
        <div>
            <Header /> 
            <HHForm />
        </div>   
    )
}

