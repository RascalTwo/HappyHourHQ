import React, { useDebugValue } from "react";
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';


export default function HHFeedText(){
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const [dataHH, setDataHH] = React.useState([{}])
    const [userData, setUserData] = React.useState([{}])
    const [isLoading, setLoading] = React.useState(true);
    
    
    React.useEffect(() => {
        async function getHHData(){
            
            const res = await fetch("http://localhost:5000/getHHData")
            const data = await res.json()
            setDataHH(data)
            
        }
        getHHData()  
                
    }, [])

  
    
    React.useEffect(() => {
        async function getUserData(){
            
            const res = await fetch("http://localhost:5000/getUserData", {credentials: 'include'})
            const data = await res.json()
            setUserData(data)
            setLoading(false)
        }
        getUserData()  
                
    }, [])
    
    console.log(user._id)
    console.log(dataHH)
    console.log(userData)
    
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
                url: `http://localhost:5000/rmFavorite/${user._id}`   
            })   
            
        } catch (err) {
			console.log(err);
		}    
    }

    function handleTime(time){
        let splitTime = time.split(":")
        if (Number(splitTime[0]) > 12){return `${Number(splitTime[0] - 12)}:${splitTime[1]} PM`} else {
            return `${splitTime[0]}:${splitTime[1]} AM`
        }
    }

    if (isLoading) {
        return <div>Loading....</div>
    }
    
    if (isLoading == false) return (

        <div>
            {dataHH.map((item, index) => 
            
                <div className="flex border-black border rounded" key={index}>
                    <div className="flex-col">
                        <div>{item.name}</div>
                        <div className="flex">
                        <div>{handleTime(item.startTime)} - {handleTime(item.endTime)}</div>
                        </div>
                        <div className="flex space-x-1">
                            {item.monday && <div>M</div>}
                            {item.tuesday && <div>T</div>}
                            {item.wednesday && <div>W</div>}
                            {item.thursday && <div>Th</div>}
                            {item.friday && <div>F</div>}
                            {item.saturday && <div>Sa</div>}
                            {item.sunday && <div>Su</div>}
                        </div>
                        <div><a href={item.website}>Website & Menu</a></div>
                            {
                            userData.favoritePosts.includes(item._id) ?
                            <button action={`${item._id}`} type="submit" onClick={handleRmFavorite}>Remove From Favorites</button>
                             : 
                            <button action={`${item._id}`} type="submit" onClick={handleAddToFavorite}>Add To Favorites</button>
                            }
                        </div>
                        <span>({item.ovRatingAvg})</span>
                        <div className="star-rating">
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={item.ovRatingAvg <= index-1 ? "text-gray-300" : "on"}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                    </div>
                    <span>Total Reviews = {item.ratedBy.length}</span>
                        
                        
                </div>
        )}
        </div>
    )
}