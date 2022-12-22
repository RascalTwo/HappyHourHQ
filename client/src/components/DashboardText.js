import React, { useDebugValue } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarActive, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarInactive } from '@fortawesome/free-regular-svg-icons'
import { formatPhoneNumber } from 'react-phone-number-input'
import HHType from "./HHType";


export default function DashboardText(){
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const [dataHH, setDataHH] = React.useState([{}])
    const [isLoading, setLoading] = React.useState(true);
    const [dataLoaded, setDataLoaded] = React.useState(0);
    const [update, setUpdate] = React.useState(0)
    
    console.log(process.env.NODE_ENV)


  
    const [userData, setUserData] = React.useState([{}])
    React.useEffect(() => {
        function getUserData(){
            
            fetch("/getUserData", {credentials: 'include'})
            .then((response) => response.json())
            .then((data) => {
                // API REQUEST ENDS UP HERE IF/WHEN FETCH DATA IS RETURNED
                setUserData(data)
                setDataLoaded(prevValue => prevValue + 1)
            }); 
        }
        getUserData()         
    }, [])

    React.useEffect(() => {
        async function getHHData(){
            try {
                const response = await axios({
                    method: 'POST',
                    data: {
                        favArray: userData.favoritePosts
                    },
                    url: `/getFavoritePosts`
                }) 
                const data = await response.data
                setDataHH(data)
                
            } catch (err) {
                console.log(err);
            }  
            
            setLoading(false)

        }
        console.log(dataLoaded)
    if (dataLoaded != 0){
        getHHData()
    }
                
    }, [dataLoaded])

   
   
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
        return (<div>
                    <div>Loading....</div>
                   <span>If not redirected click<a href="/dashboard"> HERE</a></span>
                </div>)
        
    }

    if (isLoading == false) return (
        
        <div>
            <h1 className="sm:hidden text-center text-3xl text-gray-200 border-b-3xl border-b-2 border-gray-600 pb-1 mx-4">Dashboard</h1>
            {dataHH.map((item, index) => 
            
            <div className="flex justify-center text-gray-50 py-2" >
                <div className="flex sm:justify-around bg-gray-700 flex-wrap border-black border rounded mx-6 sm:w-4/6 my-2 space-y-2 " key={index}>
                    <div className="flex justify-between sm:w-1/4 p-0.5 sm:p-2 space-x-0.5 flex-grow">
                    <div className="flex-col flex justify-between sm:pl-2 sm:mx-1 w-1/2 sm:w-1/3 sm:min-h-min">
                    <div>
                        <Link to ={`/HHPost/${item._id}`}><span className="text-xl sm:text-2xl font-medium sm:pb-2">{item.name}</span></Link> 
                            <div className="star-rating flex items-center">
                                {item.ovRatingAvg != null ? <div>{String(item.ovRatingAvg).length === 1 ? <div className="pr-1">{item.ovRatingAvg}.0</div> : <div className="pr-1">{item.ovRatingAvg}</div>}</div> : <div className="hidden"></div>}
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <div
                                    type="button"
                                    key={index}
                                    className={item.ovRatingAvg <= index-1 || item.ovRatingAvg == undefined ? "text-gray-300" : "text-green-400"}
                                    >
                                    <span className="star text-lg">&#9733;</span>
                                    </div> 
                                );
                                })}
                                <span className="text-sm text-sky-400 pl-1">({item.ratedBy.length})</span> 
                            </div>
                            <div>
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
                        </div>
                        </div>
                        <HHType drinks={item.drinks} food={item.food}/>
                        {
                            userData.favoritePosts.includes(item._id) ?
                            <div><button action={`${item._id}`} type="submit" onClick={handleRmFavorite}>Remove Favorites <FontAwesomeIcon icon={faStarActive} className="text-sky-400"/></button></div>
                             : 
                            <div><button action={`${item._id}`} type="submit" onClick={handleAddToFavorite}>Add To Favorites <FontAwesomeIcon icon={faStarInactive} className="text-sky-400"/></button></div>
                            }
                         
                        
                    </div>
                    {/* NON-MOBILE CONTACT INFO VIEW */}
                    <div className="sm:flex flex-col p-0.5 w-1/4 sm:w-1/4 min-h-min justify-between hidden">        
                        <div className="flex flex-col">
                            
                            <span className="text-lg pb-4">Contact Info:</span>
                            <div className="flex flex-col">{item.address}, <br />{item.city} {item.state} {item.zipcode}</div>
                            <div>{formatPhoneNumber(item.phone)}</div>

                        </div>
                        <div className="flex">
                            <div className="px-2 py-1 text-white uppercase bg-transparent border-2 border-sky-400 dark:text-white hover:bg-gray-800 hover:text-white text-md"><a href={item.website}>Website & Menu</a></div>
                        </div>
                    </div> 
                    
                    {/* IMAGE */}
                    {console.log(item.images)}
                    
                    {item.images.length > 0 ? <div className="flex h-36 w-48 sm:h-40 sm:w-52 md:h-48 md:w-64 bg-gray-800 bg-opacity-40 mx-1">
                        <img src={item.images[0]} className="object-scale-down h-36 w-48 sm:h-40 sm:w-52 md:h-48 md:w-64"/>
                    </div>  : <div className="flex h-36 w-48 sm:h-40 sm:w-52 md:h-48 md:w-64 items-center justify-center sm:p-3 sm:mx-1 border-black border rounded">No Photo Yet</div>}                           
                    </div>
                  
                    {/* MOBILE CONTACT INFO VIEW */}
                    <div className="sm:hidden flex justify-between p-0.5 space-x-0.5 flex-grow">        
                        <div className="flex flex-col w-1/2 sm:px-4 sm:w-48 sm:mx-1">
                            
                            {/* <span>Contact Info:</span> */}
                                <div><a href={item.website}>Website & Menu</a></div>
                                <div>{formatPhoneNumber(item.phone)}</div>

                        </div>
                        <div className="flex w-1/2 flex-col  sm:px-4 sm:w-48 sm:mx-1">{item.address}, <br />{item.city} {item.state} {item.zipcode}</div>
                    </div>
                   
                    </div>
                </div>
              
        )}
        </div>
    )
}