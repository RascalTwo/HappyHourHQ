import React, { useDebugValue } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';

export default function HHPostText(props){
    const { user } = useAuth();
    const [dataHH, setDataHH] = React.useState([{}])
    const [userData, setUserData] = React.useState([{}])
    const [dataLoaded, setDataLoaded] = React.useState(0);
    const [isLoading, setLoading] = React.useState(true);
    const [update, setUpdate] = React.useState(0)
    const [refresh, setRefresh] = React.useState(0)
  

    React.useEffect(() => {
        async function getUserData(){
            
            const res = await fetch("http://localhost:5000/getUserData", {credentials: 'include'})
            const data = await res.json()
            setUserData(data)
            setDataLoaded(prevValue => prevValue + 1)
        }
        getUserData() 
       
    }, [])

    React.useEffect(() => {
        async function getHHData(){
            console.log('getting data')
            const res = await fetch(`http://localhost:5000/getHHPost/${props.postID.id}`)
            const data = await res.json()
            setDataHH(data)
            setLoading(false)
        }
        if (dataLoaded != 0){
            getHHData()
        }  
                
    }, [dataLoaded, refresh])

    React.useEffect(() => {
        async function updateRatings(){
            
            try {
                const response = await axios({
                    method: 'PUT',
                    data: {
                        rating: dataHH.rating,
                        userID: user._id
                    },
                    url: `http://localhost:5000/updateRating/${props.postID.id}`,
                    
                }) 
                const data = response.json()
                
                
            } catch (err) {
                console.log(err);
            }  
            
            
        }
        if (update != 0){
            updateRatings()
            setRefresh(prevValue => prevValue + 1)
        }  
                
    }, [update])

    
    

    function handleClick(index){
        
        
        
        setDataHH(prevValue => ({
            ...prevValue,
            rating: [...prevValue.rating, index],
        }),
        )

        setUpdate(prevValue => prevValue + 1)
        
        
        console.log(dataHH.ratingAvg)
        console.log(dataHH)
         
    }
    
    const handleRmFavorite = async event => {
        event.preventDefault()
        const button = event.currentTarget;
        console.log(`Removed from favorites`)
        
        setUserData(prevValue => {
            return {
                ...prevValue,
                favoritePosts: prevValue.favoritePosts.filter(id => id !== button.getAttribute('action'))
            }
        })
        
        try {
            const response = await axios({
                method: 'delete',
                data: {
                    post: button.getAttribute('action'),
                },
                url: `http://localhost:5000/rmFavorite/${user._id}`,
                 
            })   
            
        } catch (err) {
			console.log(err);
		}
          
    }
    
    const handleAddToFavorite = async event => {
        event.preventDefault();
        const button = event.currentTarget;
        console.log("added to favorites")
        setUserData(prevValue => {
            console.log(prevValue.favoritePosts, button.getAttribute('action'))
            return {
                ...prevValue,
                favoritePosts: [...prevValue.favoritePosts, button.getAttribute('action')]
            }
        })
        try {
            const response = await axios({
                method: 'put',
                data: {
                    post: button.getAttribute('action'),
                },
                url: `http://localhost:5000/addFavorite/${user._id}`
            }) 
        } catch (err) {
			console.log(err);
		}  
        
        
    }

    if (isLoading) {
        return (<div>
                    <div>Loading....</div>
                   <span>If not redirected click<a href="/dashboard"> HERE</a></span>
                </div>)
        
    }

    if (isLoading == false) return (

        
            <div>
            
           
            
                <div className="flex border-black border rounded">
                    <div className="flex-col">
                        <div>{dataHH.name}</div>
                        <div className="flex">
                            <div>{dataHH.startTime}  -  </div>
                            <div>{dataHH.endTime}</div>
                        </div>
                        <div className="flex space-x-1">
                            {dataHH.monday && <div>M</div>}
                            {dataHH.tuesday && <div>T</div>}
                            {dataHH.wednesday && <div>W</div>}
                            {dataHH.thursday && <div>Th</div>}
                            {dataHH.friday && <div>F</div>}
                            {dataHH.saturday && <div>Sa</div>}
                            {dataHH.sunday && <div>Su</div>}
                        </div>
                        <div><a href={dataHH.website}>Website & Menu</a></div>
                        {
                            userData.favoritePosts.includes(dataHH._id) ?
                            <button action={`${dataHH._id}`} type="submit" onClick={handleRmFavorite}>Remove From Favorites</button>
                             : 
                            <button action={`${dataHH._id}`} type="submit" onClick={handleAddToFavorite}>Add To Favorites</button>
                        }   
                        

                    </div>
                    <span>({dataHH.ratingAvg})</span>
                    <div className="star-rating">
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={dataHH.ratingAvg <= index-1 ? "text-gray-300" : "on"}
                            onClick={() => handleClick(index, dataHH._id)}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                    </div>
                    <span>Total Reviews: = {dataHH.ratedBy.length}</span>
                    <div><Link to ={`/feed`}>Return to feed</Link></div>
                </div>
        
        </div>

            
       
    )
}