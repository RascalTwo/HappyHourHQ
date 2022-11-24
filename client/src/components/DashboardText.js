import React, { useDebugValue } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';




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
            try {
                const response = await axios({
                    method: 'POST',
                    data: {
                        favArray: userData.favoritePosts
                    },
                    url: `http://localhost:5000/getFavoritePosts/`
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
                
    }, [dataLoaded, update])

   
   
    

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
        
        setUpdate(prevValue => prevValue + 1)
        
        console.log("look here", dataHH)
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
        return (<div>
                    <div>Loading....</div>
                   <span>If not redirected click<a href="/dashboard"> HERE</a></span>
                </div>)
        
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
                            
                        <button action={`${item._id}`} type="submit" onClick={handleRmFavorite}>Remove From Favorites</button>

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
                    <div><Link to ={`/HHPost/${item._id}`}>Link Here</Link></div>
                </div>
        )}
        </div>
    )
}