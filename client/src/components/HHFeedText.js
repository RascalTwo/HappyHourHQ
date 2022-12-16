import React, { useDebugValue } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { formatPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarActive } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarInactive } from '@fortawesome/free-regular-svg-icons'

export default function HHFeedText(){
    const { user, authed } = useAuth();
    
    const navigate = useNavigate();

    const [dataHH, setDataHH] = React.useState([{}])
    const [userData, setUserData] = React.useState([{}])
    const [isLoading, setLoading] = React.useState(true);
    
    
    // React.useEffect(() => {
    //     async function getHHData(){
            
    //         const res = await fetch("/getHHData")
    //         const data = await res.json()
    //         setDataHH(data)
            
    //     }
    //     getHHData()  
                
    // }, [])

    React.useEffect(() => {
        function getHHData(){
            console.log("fetching data")
            fetch('/getHHData')
                .then((response) => response.json())
                .then((data) => {
                // API REQUEST ENDS UP HERE IF/WHEN FETCH DATA IS RETURNED
                setDataHH(data)
                getUserData()
                console.log("data fetched?")
            }); 
        }
        getHHData()  
                
    }, [])
    
   
    function getUserData(){
        fetch('/getUserData', {credentials: 'include'})
            .then((response) => response.json())
            .then((data) => {
            // API REQUEST ENDS UP HERE IF/WHEN FETCH DATA IS RETURNED
            setUserData(data)
            setLoading(false)
        }); 
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

    

    if (isLoading) {
        return <div>Loading....</div>
    }
    
    if (isLoading == false) return (

        <div>
            {dataHH.map((item, index) => 
            
            <div className="flex justify-center text-gray-50 py-2" >
                <div className="flex md:justify-around bg-gray-700 flex-wrap border-black border rounded mx-6 md:w-4/6 my-2 space-y-2 " key={index}>
                    <div className="flex justify-between p-0.5 space-x-0.5 flex-grow">
                    <div className="flex-col md:px-4 md:mx-1 w-1/2 md:w-48 md:min-h-min">
                    <Link to ={`/HHPost/${item._id}`}><h1 className="text-xl font-medium">{item.name}</h1></Link> 
                        <div className="star-rating flex items-center">
                            <span className="pr-1">{String(item.ovRatingAvg).length === 1 ? `${item.ovRatingAvg}.0` : item.ovRatingAvg}</span>
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <div
                                type="button"
                                key={index}
                                className={item.ovRatingAvg <= index-1 || item.ovRatingAvg == undefined ? "text-gray-300" : "text-green-400"}
                                >
                                <span className="star">&#9733;</span>
                                </div> 
                            );
                            })}
                            <span className="text-sm text-sky-400 pl-1">({item.ratedBy.length})</span> 
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
                        {authed ? <div>{
                            userData.favoritePosts.includes(item._id) ?
                            <div><button action={`${item._id}`} type="submit" onClick={handleRmFavorite}>Remove Favorites <FontAwesomeIcon icon={faStarActive} className="text-sky-400"/></button></div>
                             : 
                            <div><button action={`${item._id}`} type="submit" onClick={handleAddToFavorite}>Add To Favorites <FontAwesomeIcon icon={faStarInactive} className="text-sky-400"/></button></div>
                            }
                        </div> : <div><Link to="/login">Add To Favorites <FontAwesomeIcon icon={faStarInactive}/></Link></div>}
                    </div>
                    {/* IMAGE */}
                    {console.log(item.images)}
                            {item.images.length > 0 ? <div className="flex w-48 h-48 mx-1 border-black border rounded">
                            <img src={item.images[0]} className="object-contain"/>
                            </div>  : <div className="flex w-1/2 h-min-min md:w-48 md:h-48 items-center justify-center md:mx-1 border-black border rounded">No Photo Yet</div>}
                    </div>
                    <div className="flex justify-between p-0.5 space-x-0.5 flex-grow">        
                        <div className="flex flex-col w-1/2  md:px-4 md:w-48 min-h-min md:mx-1">
                            
                            {/* <span>Contact Info:</span> */}
                                <div><a href={item.website}>Website & Menu</a></div>
                                <div>{formatPhoneNumber(item.phone)}</div>

                        </div>
                        <div className="flex w-1/2 flex-col  md:px-4 md:w-48 min-h-min md:mx-1">{item.address}, <br />{item.city} {item.state} {item.zipcode}</div>
                    </div>
                    </div>
                </div>
              
        )}
        </div>
        
        
    )
}