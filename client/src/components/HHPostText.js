import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { formatPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarActive } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarInactive } from '@fortawesome/free-regular-svg-icons'



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

            const res = await fetch("/getUserData", {credentials: 'include'})
            const data = await res.json()
            setUserData(data)
            setDataLoaded(prevValue => prevValue + 1)
        }
        getUserData() 
       
    }, [])
    React.useEffect(() => {
        
        function getHHData(){
            console.log('getting data')
            fetch(`/getHHPost/${props.postID.id}`)
            .then((response) => response.json())
            .then((data) => {
                // API REQUEST ENDS UP HERE IF/WHEN FETCH DATA IS RETURNED
                setDataHH(data)
                console.log("data fetched?")
                setLoading(false)
            }); 
            
            
        }
        if (dataLoaded !== 0){
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
                    url: `/updateRating/${props.postID.id}`,

                }) 



            } catch (err) {
                console.log(err);
            }  


        }
        if (update !== 0){
            updateRatings()
            setRefresh(prevValue => prevValue + 1)
        }  
                
    }, [update])

    console.log(dataHH)

    // function handleClick(index){

    //     setDataHH(prevValue => ({
    //         ...prevValue,
    //         rating: [...prevValue.rating, index],
    //     }),
    //     )

    //     setUpdate(prevValue => prevValue + 1)


    //     console.log(dataHH.ratingAvg)
    //     console.log(dataHH)

    // }

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
                url: `/rmFavorite/${user._id}`,

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
                url: `/addFavorite/${user._id}`
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
                {/* NAME */}
                <h1 className="flex justify-center text-4xl font-medium mt-3">{dataHH.name}</h1>

                {/* ADD REVIEW BUTTON. ONLY IF NO USER REVIEW */}
                <div className="flex justify-around text-sm">
                { !dataHH.ratedBy.includes(user._id) ? <button onClick={handleToggleReview} className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">Add Review</button> : <div></div>}

                {/* ADD || REMOVE FAVORITE */}
                 {
                 userData.favoritePosts.includes(dataHH._id) ?
                <button action={`${dataHH._id}`} type="submit" onClick={handleRmFavorite} className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">Remove Favorite <FontAwesomeIcon icon={faStarActive}/></button>
                 : 
                <button action={`${dataHH._id}`} type="submit" onClick={handleAddToFavorite} className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">Add Favorite <FontAwesomeIcon icon={faStarInactive}/></button>
                }   
                </div>

                <div className="flex card flex-col items-center">
                    {/* DISPLAY REVIEWS & IMAGE*/}
                    <div className="flex bg-neutral justify-around rounded-2xl w-3/5 min-h-0 p-6 flex-wrap mt-6 text-white">
                        <div className="flex flex-wrap flex-col w-64 h-64 mx-3 my-3">
                            <h2 className="flex text-white">HH Reviews</h2>  
                            <div className="star-rating flex items-center">

                                <span>{dataHH.ovRatingAvg}</span>
                                Overall
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={dataHH.ovRatingAvg == null || Math.round(dataHH.ovRatingAvg) <= index-1? "text-gray-300" : "text-green-400"}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                );
                                })}
                                <span className="text-sm text-white text-opacity-50">({dataHH.ratedBy.length})</span>
                            </div>

                            <div className="star-rating flex items-center">
                            <span>{dataHH.tasteRatingAvg}</span>
                                Taste
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={dataHH.tasteRatingAvg == null || Math.round(dataHH.tasteRatingAvg) <= index-1 ? "text-gray-300" : "text-green-400"}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                );
                                })}
                            </div>
                            <div className="star-rating flex items-center">
                            <span>{dataHH.ambRatingAvg}</span>
                                Ambiance
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={dataHH.ambRatingAvg == null ||Math.round(dataHH.ambRatingAvg) <= index-1 ? "text-gray-300" : "text-green-400"}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                );
                                })}
                            </div>
                            <div className="star-rating flex items-center">
                            <span>{dataHH.worthRatingAvg}</span>
                                Worth It
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={dataHH.worthRatingAvg == null ||Math.round(dataHH.worthRatingAvg) <= index-1 ? "text-gray-300" : "text-green-400"}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                );
                                })}
                            </div>
                            <div className="star-rating flex items-center">
                            <span>{dataHH.sizeRatingAvg}</span>
                                Portions
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={dataHH.sizeRatingAvg == null ||Math.round(dataHH.sizeRatingAvg) <= index-1 ? "text-gray-300" : "text-green-400"}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                );
                                })}
                            </div>
                        </div>
                        {dataHH.images[0] != undefined ? <div className="flex w-64 h-64 mx-3 my-3 border-black border rounded">
                            <img src={dataHH.images[0]} className="object-contain" alt="Picture of happy hour"/>
                        </div>  : <div className="flex items-center justify-center border-black border rounded w-64 h-64 my-3 p-1 ">No Photo Yet</div>}

                    </div>
                    {/* CONTACT INFO */}
                    <div className="flex flex-wrap w-3/5 justify-center gap-2 my-2">

                        <div className="flex flex-col card bg-neutral text-white py-2 px-4 my-2 mx-1 bg-gray-50">
                            <div className="flex justify-center w-64 pb-2">Hours</div>
                            {dataHH.monday && <div>Monday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                            {dataHH.tuesday && <div>Tuesday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                            {dataHH.wednesday && <div>Wednesday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                            {dataHH.thursday && <div>Thursday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                            {dataHH.friday && <div>Friday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                            {dataHH.saturday && <div>Saturday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                            {dataHH.sunday && <div>Sunday: {handleTime(dataHH.startTime)} - {handleTime(dataHH.endTime)}</div>}
                        </div>
                        <div className="flex flex-col card bg-neutral text-white py-2 px-4 my-2 w-64 bg-gray-50">
                            <span className="self-center pb-2">Contact Info:</span>
                            <div>{dataHH.address}, <br />{dataHH.city} {dataHH.state} {dataHH.zipcode}</div>
                            <div><a href={dataHH.website}>Website & Menu</a></div>
                            <div>{formatPhoneNumber(dataHH.phone)}</div>
                        </div>
                    </div>
                    
                    

                    {/* ADD REVIEW */}
                   {review !== false &&  
                   <div className="flex flex-col w-2/5 card shadow-xl bg-neutral p-6">

                        <h2 className="card-title self-center mb-4 text-white">Review Here!</h2>

                        <div className="flex flex-col">
                            <div className="flex justify-center flex-wrap">
                                <div className="flex flex-col mx-1 p-1 w-24 items-center">
                                    <label htmlFor="worth" className="text-white">Worth It</label>
                                    <div className="star-rating">
                                        {[...Array(4)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                            type="button"
                                            key={index}

                                            className={ratingData.worthRating <= index-1 ? "text-gray-300" : "text-green-400"}
                                            onClick={() => handleWorthRatingClick(index, dataHH._id)}
                                            name="worth"

                                            >
                                            <span className="star">&#9733;</span>
                                            </button>
                                        );
                                        })}
                                    </div>
                                    <label htmlFor="size" className="text-white">Portion Size</label>
                                    <div className="star-rating">
                                        {[...Array(4)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                            type="button"
                                            key={index}
                                            className={ratingData.sizeRating <= index-1 ? "text-gray-300" : "text-green-400"}
                                            onClick={() => handleSizeRatingClick(index, dataHH._id)}
                                            name="size"
                                            >
                                            <span className="star">&#9733;</span>
                                            </button>
                                        );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col p-1 mx-1 w-24 items-center">
                                    <label htmlFor="ambiance" className="text-white">Ambiance</label>
                                    <div className="star-rating">
                                        {[...Array(4)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                            type="button"
                                            key={index}
                                            className={ratingData.ambRating <= index-1 ? "text-gray-300" : "text-green-400"}
                                            onClick={() => handleAmbRatingClick(index, dataHH._id)}
                                            name="ambiance"
                                            >
                                            <span className="star">&#9733;</span>
                                            </button>
                                        );
                                        })}
                                    </div>
                                    <label htmlFor="taste" className="text-white">Taste</label>
                                    <div className="star-rating">
                                        {[...Array(4)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                            type="button"
                                            key={index}
                                            className={ratingData.tasteRating <= index-1 ? "text-gray-300" : "text-green-400"}
                                            onClick={() => handleTasteRatingClick(index, dataHH._id)}
                                            name="taste"
                                            >
                                            <span className="star">&#9733;</span>
                                            </button>
                                        );
                                        })}
                                    </div>
                                </div>        
                            </div>
                            <div className="flex justify-center p-1 ">
                            <div className="flex flex-col items-center w-24">
                                    <label htmlFor="overall" className="text-white">Overall</label>
                                    <div className="star-rating">
                                        {[...Array(4)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                            type="button"
                                            key={index}
                                            className={ratingData.ovRating <= index-1 ? "text-gray-300" : "text-green-400"}
                                            onClick={() => handleOvRatingClick(index, dataHH._id)}
                                            name="overall"
                                            >
                                            <span className="star">&#9733;</span>
                                            </button>
                                        );
                                        })}
                                    </div>        
                            </div>
                            </div>
                            {/* UPLOAD PHOTO */}
                            <CloudinaryUploadWidget name={props.postID.id}/>
                        </div>
                        <button onClick={handleReviewSubmit} className="btn btn-primary self-center">Submit Review</button>
                </div> }
                <div className="flex flex-wrap gap-4 m-2 justify-center">
                    <div className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md"><Link to ={`/feed`}>Feed</Link></div>
                    <div className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md"><Link to ={`/feed`}>Dashboard</Link></div>
                </div>
                </div>

        </div>
            
       
    )
}