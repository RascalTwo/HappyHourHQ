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
    const [review, setReview] = React.useState(false)
    const [ratingData, setRatingData] = React.useState(
        {
            ovRating: 0,
            worthRating: 0, 
            sizeRating: 0,
            ambRating: 0,
            tasteRating: 0,
            ratedBy: "",
  
        }
    )


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
                        ovRating: ratingData.ovRating,
                        worthRating: ratingData.worthRating,
                        sizeRating: ratingData.sizeRating,
                        ambRating: ratingData.ambRating,
                        tasteRating: ratingData.tasteRating,
                        userRated: dataHH.ratedBy,
                        ovAverage: (dataHH.ovRating.reduce((a,b)=>a+b)/dataHH.ovRating.length).toFixed(2),
                        worthAverage: (dataHH.worthRating.reduce((a,b)=>a+b)/dataHH.worthRating.length).toFixed(2),
                        sizeAverage: (dataHH.sizeRating.reduce((a,b)=>a+b)/dataHH.sizeRating.length).toFixed(2),
                        ambAverage: (dataHH.ambRating.reduce((a,b)=>a+b)/dataHH.ambRating.length).toFixed(2),
                        tasteAverage: (dataHH.tasteRating.reduce((a,b)=>a+b)/dataHH.tasteRating.length).toFixed(2),
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

    
    console.log(dataHH)

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
    // RATING CLICKS
    function handleWorthRatingClick(index, id, value){
        setRatingData(prevValue => ({
            ...prevValue,
            worthRating: index,
        }),
        )
        console.log(ratingData)
    }
    function handleSizeRatingClick(index, id, value){
        setRatingData(prevValue => ({
            ...prevValue,
            sizeRating: index,
        }),
        )
        console.log(ratingData)
    }
    function handleAmbRatingClick(index, id, value){
        setRatingData(prevValue => ({
            ...prevValue,
            ambRating: index,
        }),
        )
        console.log(ratingData)
    }
    function handleTasteRatingClick(index, id, value){
        setRatingData(prevValue => ({
            ...prevValue,
            tasteRating: index,
        }),
        )
        console.log(ratingData)
    }
    function handleOvRatingClick(index, id, value){
        setRatingData(prevValue => ({
            ...prevValue,
            ovRating: index,
        }),
        )
        console.log(ratingData)
    }

    function handleReviewSubmit(){
        setDataHH(prevValue => ({
            ...prevValue,
            ratedBy: [...prevValue.ratedBy, user._id],
            ovRating: [...prevValue.ovRating, ratingData.ovRating],
            tasteRating: [...prevValue.tasteRating, ratingData.tasteRating],
            ambRating: [...prevValue.ambRating, ratingData.ambRating],
            sizeRating: [...prevValue.sizeRating, ratingData.sizeRating],
            worthRating: [...prevValue.worthRating, ratingData.worthRating]
        }))
        setUpdate(prevValue => prevValue + 1)
        setReview(false)
        console.log(dataHH)
    } 

    //Toggle
    function handleToggleReview(){
        setReview(true)
    }

    function handleTime(time){
        let splitTime = time.split(":")
        if (Number(splitTime[0]) > 12){return `${Number(splitTime[0] - 12)}:${splitTime[1]} PM`} else {
            return `splitTime[0] AM`
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
                        <div>{handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>
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
                    
                    <div>
                        
                    { dataHH.ratedBy.includes(user._id) ? <div></div> : <button onClick={handleToggleReview}>Add Review</button>}
                       
                    </div>
                    {/* DISPLAY REVIEWS */}
                    <div>
                        
                        <div className="star-rating">
                        <span>({dataHH.ovRatingAvg})</span>
                        Overall
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={dataHH.ovRatingAvg == null || Math.round(dataHH.ovRatingAvg) <= index-1? "text-gray-300" : "on"}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                        <span>Total Reviews: = {dataHH.ratedBy.length}</span>
                    </div>
                    
                    <div className="star-rating">
                    <span>({dataHH.tasteRatingAvg})</span>
                        Taste
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={dataHH.tasteRatingAvg == null || Math.round(dataHH.tasteRatingAvg) <= index-1 ? "text-gray-300" : "on"}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                    </div>
                    <div className="star-rating">
                    <span>({dataHH.ambRatingAvg})</span>
                        Ambiance
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={dataHH.ambRatingAvg == null ||Math.round(dataHH.ambRatingAvg) <= index-1 ? "text-gray-300" : "on"}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                    </div>
                    <div className="star-rating">
                    <span>({dataHH.worthRatingAvg})</span>
                        Worth It
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={dataHH.worthRatingAvg == null ||Math.round(dataHH.worthRatingAvg) <= index-1 ? "text-gray-300" : "on"}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                    </div>
                    <div className="star-rating">
                    <span>({dataHH.sizeRatingAvg})</span>
                        Portions
                        {[...Array(4)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={dataHH.sizeRatingAvg == null ||Math.round(dataHH.sizeRatingAvg) <= index-1 ? "text-gray-300" : "on"}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                        );
                        })}
                    </div>
                    </div>
                    
                    {/* ADD REVIEW */}
                   {review === false ? <div></div> :  
                   <div>
                    <span>Review Here!</span>
                        <label htmlFor="worth">Worth It</label>
                        <div className="star-rating">
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                type="button"
                                key={index}
    
                                className={ratingData.worthRating <= index-1 ? "text-gray-300" : "on"}
                                onClick={() => handleWorthRatingClick(index, dataHH._id)}
                                name="worth"
                                
                                >
                                <span className="star">&#9733;</span>
                                </button>
                            );
                            })}
                        </div>
                        <label htmlFor="size">Portion Size</label>
                        <div className="star-rating">
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                type="button"
                                key={index}
                                className={ratingData.sizeRating <= index-1 ? "text-gray-300" : "on"}
                                onClick={() => handleSizeRatingClick(index, dataHH._id)}
                                name="size"
                                >
                                <span className="star">&#9733;</span>
                                </button>
                            );
                            })}
                        </div>
                        <label htmlFor="ambiance">Ambiance</label>
                        <div className="star-rating">
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                type="button"
                                key={index}
                                className={ratingData.ambRating <= index-1 ? "text-gray-300" : "on"}
                                onClick={() => handleAmbRatingClick(index, dataHH._id)}
                                name="ambiance"
                                >
                                <span className="star">&#9733;</span>
                                </button>
                            );
                            })}
                        </div>
                        <label htmlFor="taste">Taste</label>
                        <div className="star-rating">
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                type="button"
                                key={index}
                                className={ratingData.tasteRating <= index-1 ? "text-gray-300" : "on"}
                                onClick={() => handleTasteRatingClick(index, dataHH._id)}
                                name="taste"
                                >
                                <span className="star">&#9733;</span>
                                </button>
                            );
                            })}
                        </div>
                        <label htmlFor="overall">Overall</label>
                        <div className="star-rating">
                            {[...Array(4)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                type="button"
                                key={index}
                                className={ratingData.ovRating <= index-1 ? "text-gray-300" : "on"}
                                onClick={() => handleOvRatingClick(index, dataHH._id)}
                                name="overall"
                                >
                                <span className="star">&#9733;</span>
                                </button>
                            );
                            })}
                        </div>        
                        <button onClick={handleReviewSubmit}>Submit Review</button>        
                    <div><Link to ={`/feed`}>Return to feed</Link></div>
                </div> }
                </div>
        
        </div>

            
       
    )
}