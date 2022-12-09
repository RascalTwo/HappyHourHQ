import React, { useDebugValue } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { formatPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarActive } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarInactive } from '@fortawesome/free-regular-svg-icons'

export default function HHFeedText(){
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const [dataHH, setDataHH] = React.useState([{}])
    const [userData, setUserData] = React.useState([{}])
    const [isLoading, setLoading] = React.useState(true);
    
    
    React.useEffect(() => {
        async function getHHData(){
            
            const res = await fetch("/getHHData")
            const data = await res.json()
            setDataHH(data)
            
        }
        getHHData()  
                
    }, [])

  
    
    React.useEffect(() => {
        async function getUserData(){
            
            const res = await fetch("/getUserData", {credentials: 'include'})
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
                url: `/addFavorite/${user._id}`
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
                url: `/rmFavorite/${user._id}`   
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

    function handleHHClick(){

    }

    if (isLoading) {
        return <div>Loading....</div>
    }
    
    if (isLoading == false) return (

        <div>
            {dataHH.map((item, index) => 
            
            <div className="flex justify-center py-2" >
                <div className="flex justify-around bg-gray-50 flex-wrap border-black border rounded w-4/6 my-2" key={index}>
                    <div className="flex-col px-4 mx-1 border-black border w-48 min-h-min rounded">
                    <Link to ={`/HHPost/${item._id}`}><div className="text-lg font-bold">{item.name}</div></Link> 
                        <div className="star-rating">
                            <span>{item.ovRatingAvg}</span>
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                type="button"
                                key={index}
                                className={item.ovRatingAvg <= index-1 || item.ovRatingAvg == undefined ? "text-gray-300" : "on"}
                                >
                                <span className="star">&#9733;</span>
                                </button>
                            );
                            })}
                            <span className="text-sm text-black text-opacity-50">({item.ratedBy.length})</span>
                        </div>
                        <div>{handleTime(item.startTime)} - {handleTime(item.endTime)}</div>
                        <div className="flex space-x-1">
                            {item.monday && <div>M</div>}
                            {item.tuesday && <div>T</div>}
                            {item.wednesday && <div>W</div>}
                            {item.thursday && <div>Th</div>}
                            {item.friday && <div>F</div>}
                            {item.saturday && <div>Sa</div>}
                            {item.sunday && <div>Su</div>}
                        </div>
                        {
                            userData.favoritePosts.includes(item._id) ?
                            <div><button action={`${item._id}`} type="submit" onClick={handleRmFavorite}>Remove Favorites <FontAwesomeIcon icon={faStarActive} /></button></div>
                             : 
                            <div><button action={`${item._id}`} type="submit" onClick={handleAddToFavorite}>Add To Favorites <FontAwesomeIcon icon={faStarInactive} /></button></div>
                            }
                    </div>
                    <div className="flex flex-col border border-black rounded px-4 w-48 min-h-min mx-1">
                        
                        <span>Contact Info:</span>
                        <div>{item.address}, <br />{item.city} {item.state} {item.zipcode}</div>
                        <div><a href={item.website}>Website & Menu</a></div>
                        <div>{formatPhoneNumber(item.phone)}</div>
                            
                    </div>
                        
                            {console.log(item.images)}
                            {item.images.length > 0 ? <div className="flex w-48 h-48 mx-1 border-black border rounded">
                            <img src={item.images[0]} className="object-contain"/>
                            </div>  : <div className="flex w-48 h-48 items-center justify-center mx-1 border-black border rounded">No Photo Yet</div>}
                        
                    </div>
                    
                        
                        
                        
                </div>
              
        )}
        </div>
        
        
    )
}