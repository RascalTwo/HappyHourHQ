import React, { useRef } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { formatPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarActive, faRotateRight, faFilter, faArrowUp, faArrowDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarInactive } from '@fortawesome/free-regular-svg-icons'
import { Popover } from '@headlessui/react'

import HHType from "./HHType";


export default function HHFeedText(){
    const { user, authed } = useAuth();
    
    const navigate = useNavigate();
    const [sortToggle, setSortToggle] = React.useState(false)
    const [dataHH, setDataHH] = React.useState([{}])
    
    const [userData, setUserData] = React.useState([{}])
    const [isLoading, setLoading] = React.useState(true);
    const [masterHHData, setMasterHHData] = React.useState([{}])
    const initialFilterState = [
        {drinks: false},
        {food: false},
        {rating4: false}
    ]
    const [filterData, setFilterData] = React.useState(initialFilterState)
    const filterOptions = [searchFilter, drinksFilter, foodFilter, rating1, rating2, rating3, rating4, mon, tue, wed, thur, fri, sat, sun, sort, finishFilter]
    const initialRender = useRef(false)
    const [filterSearch, setFilterSearch] = React.useState([])
    let filterMaster = masterHHData
   
    React.useEffect(() => {
        function getHHData(){
            console.log("fetching data")
            fetch('/getHHData')
                .then((response) => response.json())
                .then((data) => {
                // API REQUEST ENDS UP HERE IF/WHEN FETCH DATA IS RETURNED
                setDataHH(data)
                setMasterHHData(data)
                getUserData()
                
                console.log("data fetched?")
            }); 
        }
        getHHData()  
         
    }, [])
    
   console.log(dataHH)
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



//FILTER FUNCTIONS


    function handleFilterChange(event){
        const {name, value, type, checked} = event.target
        setFilterData(prevFormData => {
            
            return{
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            }
        })
    }

    function searchFilter(){
        if (filterSearch.length > 0){
            filterMaster = filterMaster.filter(item => item.zipcode == filterSearch)
        }
    }

    function drinksFilter(){
        if (filterData.drinks === true) {
            
            filterMaster =  filterMaster.filter(item => item.drinks === true)
            
        }
    }

    function foodFilter(){
        if (filterData.food === true) {
            filterMaster = filterMaster.filter(item => item.food === true)
        }
    }

    function rating4(){
        if (filterData.rating4 === true) {
            filterMaster =  filterMaster.filter(item => item.ovRatingAvg === 4)
        }
    }

    function rating3(){
        if (filterData.rating3 === true) {
            filterMaster =   filterMaster.filter(item => item.ovRatingAvg >= 3)
        }
    }

    function rating2(){
        if (filterData.rating2 === true) {
            filterMaster = filterMaster.filter(item => item.ovRatingAvg >= 2)
        }
    }

    function rating1(){
        if (filterData.rating1 === true) {
            filterMaster =  filterMaster.filter(item => item.ovRatingAvg >= 1)
        }
    }
    function mon(){
        if (filterData.mon === true) {
            filterMaster =   filterMaster.filter(item => item.monday === true)
        }
    }
    function tue(){
        if (filterData.tue === true) {
            filterMaster =   filterMaster.filter(item => item.tuesday === true)
        }
    }
    function wed(){
        if (filterData.wed === true) {
            filterMaster =  filterMaster.filter(item => item.wednesday === true)
        }
    }
    function thur(){
        if (filterData.thur === true) {
            filterMaster =  filterMaster.filter(item => item.thursday === true)
        }
    }
    function fri(){
        if (filterData.fri === true) {
            filterMaster = filterMaster.filter(item => item.friday === true)
        }
    }
    function sat(){
        if (filterData.sat === true) {
            filterMaster = filterMaster.filter(item => item.saturday === true)
        }
    }
    function sun(){
        if (filterData.sun === true) {
           filterMaster = filterMaster.filter(item => item.sunday === true)
        }
    }

    function sort(){
        if (sortToggle === true){
        let sorted = [...filterMaster].sort((a,b) => a.ovRatingAvg > b.ovRatingAvg ? 1 : -1)
        filterMaster = sorted
        console.log("Sorted in filter HERE", filterMaster)
        }
    }

    function finishFilter(){
        console.log("finished filter master", filterMaster)
        setDataHH(filterMaster)
        
        
    }

// FILTER FUNCTION MAIN CALL

    const handleSort = async event => {
        event.preventDefault();
        let sorted = [...dataHH].sort((a,b) => a.ovRatingAvg > b.ovRatingAvg ? 1 : -1)
        
        setDataHH(sorted)
        setSortToggle(prevValue => !prevValue)
        console.log(sortToggle, sorted)
        
    }

    const handleReset = async event => {
        event.preventDefault();
        console.log("CHECK RESET", masterHHData)
        setDataHH(masterHHData)
        setFilterData(initialFilterState)
        setFilterSearch("")
        setSortToggle(false)
        console.log("handle reset here", filterMaster)
        
    }

    const handleSearch = async event => {
        event.preventDefault();
        if (filterSearch == []){
            setDataHH(filterMaster)
        } else {
        filterMaster = filterMaster.filter(item => item.zipcode.toString().includes(filterSearch) || item.name.includes(filterSearch) || item.city.includes(filterSearch))
        setDataHH(filterMaster)
        }
        console.log(filterMaster[0].zipcode.toString().includes(filterSearch))
    }

    React.useEffect(() => {
        
        if (initialRender.current){
            console.log("CHECK ME FOR RENDER")
            
            filterOptions.forEach(item => item())
            
        } else {
            initialRender.current = true
        }
        
    console.log("Use Effect Rendered")
                
    }, [filterData])

    if (isLoading) {
        return <div>Loading....</div>
    }
    
    if (isLoading == false) return (

        <div>
                <h1 className="sm:hidden text-center text-3xl text-gray-200 border-b-3xl border-b-2 border-gray-600 pb-1 mx-4">Happy Hours</h1>
                {/* MOBILE VIEW FOR FILTERS */}
                <Popover className="sm:hidden ml-4 relative text-white">
                    {({ open }) => (
                        <>
                    <Popover.Button> 
                        Filters
                        <FontAwesomeIcon icon={faFilter} className={open ? 'text-sky-400 pl-1' : "pl-1"}/></Popover.Button>

                    <Popover.Panel className="absolute z-10">
                        
                        <div className=" flex flex-col bg-gray-600 p-4 px-8">

                            <form className="flex flex-col sticky h-screen top-0">
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="drinks" className="text-white pr-2">Drinks</label>
                                    <input
                                        type="checkbox"
                                        id="drinks"
                                        name="drinks"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.drinks}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="food" className="text-white">Food</label>
                                    <input
                                        type="checkbox"
                                        id="food"
                                        name="food"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.food}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="rating1" className="text-white">Rating 1+</label>
                                    <input
                                        type="checkbox"
                                        id="rating1"
                                        name="rating1"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.rating1}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="rating2" className="text-white">Rating 2+</label>
                                    <input
                                        type="checkbox"
                                        id="rating2"
                                        name="rating2"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.rating2}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="rating3" className="text-white">Rating 3+</label>
                                    <input
                                        type="checkbox"
                                        id="rating3"
                                        name="rating3"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.rating3}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="rating4" className="text-white">Rating 4</label>
                                    <input
                                        type="checkbox"
                                        id="rating4"
                                        name="rating4"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.rating4}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="M" className="text-white">Monday</label>
                                    <input
                                        type="checkbox"
                                        id="mon"
                                        name="mon"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.mon}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="T" className="text-white">Tuesday</label>
                                    <input
                                        type="checkbox"
                                        id="tue"
                                        name="tue"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.tue}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="W" className="text-white">Wednesday</label>
                                    <input
                                        type="checkbox"
                                        id="wed"
                                        name="wed"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.wed}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="Th" className="text-white">Thursday</label>
                                    <input
                                        type="checkbox"
                                        id="thur"
                                        name="thur"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.thur}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="Fr" className="text-white">Friday</label>
                                    <input
                                        type="checkbox"
                                        id="fri"
                                        name="fri"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.fri}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="Sat" className="text-white">Saturday</label>
                                    <input
                                        type="checkbox"
                                        id="sat"
                                        name="sat"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.sat}
                                    />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <label htmlFor="Sun" className="text-white">Sunday</label>
                                    <input
                                        type="checkbox"
                                        id="sun"
                                        name="sun"
                                        className="w-4 h-4"
                                        onChange={handleFilterChange}
                                        checked={filterData.sun}
                                    />
                                </div>
                                <div className="flex">
                                    <input
                                                    type="text"
                                                    id="filterText"
                                                    name="filterText"
                                                    className="input my-1 w-full input-xs max-w-xs"
                                                    placeholder="City / Zip / Name"
                                                    value={filterSearch}
                                                    onChange={event => setFilterSearch(event.target.value)}
                                                    />
                                <button type="submit" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} className="pl-1 text-sky-400 hover:text-sky-700"/></button>
                                </div>   
                                    <button onClick={handleReset} className="mt-2 text-white flex justify-center items-center text-start px-2 py-0.5 text-white bg-gray-700 border-2 border-green-500 hover:bg-gray-800 text-md">Reset<FontAwesomeIcon icon={faRotateRight} className="text-white px-1"/></button>
                                
                                    {sortToggle ? <button onClick={handleSort} className="mt-2 text-white flex justify-center items-center text-start px-2 py-0.5 text-white bg-gray-700 border-2 border-green-500 hover:bg-gray-800 text-md">Sort By Rating<FontAwesomeIcon icon={faArrowUp} className="pl-1"/></button> : <button onClick={handleSort} className="mt-2 text-white flex justify-center items-center text-start px-2 py-0.5 text-white bg-gray-700 border-2 border-green-500 hover:bg-gray-800 text-md">Sort By Rating<FontAwesomeIcon className="pl-1" icon={faArrowDown}/></button>}
                            </form>


                            
                        </div>

                        <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                    </>
                    )}
                </Popover>
            {/* END MOBILE VIEW FOR FILTERS */}
            <div className="flex">
            <div className="hidden sm:flex w-60  sm:flex-col sm:bg-gray-600 sm:p-4 sm:px-8">

                <form className="flex flex-col sticky h-screen top-0">
                    <h2 className="text-white text-lg pb-2">Filters:</h2>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="drinks" className="text-white pr-2">Drinks</label>
                        <input
                            type="checkbox"
                            id="drinks"
                            name="drinks"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.drinks}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="food" className="text-white">Food</label>
                        <input
                            type="checkbox"
                            id="food"
                            name="food"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.food}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="rating1" className="text-white">Rating 1+</label>
                        <input
                            type="checkbox"
                            id="rating1"
                            name="rating1"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.rating1}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="rating2" className="text-white">Rating 2+</label>
                        <input
                            type="checkbox"
                            id="rating2"
                            name="rating2"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.rating2}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="rating3" className="text-white">Rating 3+</label>
                        <input
                            type="checkbox"
                            id="rating3"
                            name="rating3"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.rating3}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="rating4" className="text-white">Rating 4</label>
                        <input
                            type="checkbox"
                            id="rating4"
                            name="rating4"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.rating4}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="M" className="text-white">Monday</label>
                        <input
                            type="checkbox"
                            id="mon"
                            name="mon"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.mon}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="T" className="text-white">Tuesday</label>
                        <input
                            type="checkbox"
                            id="tue"
                            name="tue"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.tue}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="W" className="text-white">Wednesday</label>
                        <input
                            type="checkbox"
                            id="wed"
                            name="wed"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.wed}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="Th" className="text-white">Thursday</label>
                        <input
                            type="checkbox"
                            id="thur"
                            name="thur"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.thur}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="Fr" className="text-white">Friday</label>
                        <input
                            type="checkbox"
                            id="fri"
                            name="fri"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.fri}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="Sat" className="text-white">Saturday</label>
                        <input
                            type="checkbox"
                            id="sat"
                            name="sat"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.sat}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <label htmlFor="Sun" className="text-white">Sunday</label>
                        <input
                            type="checkbox"
                            id="sun"
                            name="sun"
                            className="w-4 h-4"
                            onChange={handleFilterChange}
                            checked={filterData.sun}
                        />
                    </div>
                    <div className="flex">
                        <input
                                        type="text"
                                        id="filterText"
                                        name="filterText"
                                        className="input my-1 w-full input-xs max-w-xs"
                                        placeholder="City / Zip / Name"
                                        value={filterSearch}
                                        onChange={event => setFilterSearch(event.target.value)}
                                        />
                    <button type="submit" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} className="pl-1 text-sky-400 hover:text-sky-700"/></button>
                    </div>   
                        <button onClick={handleReset} className="mt-2 text-white flex justify-center items-center text-start px-2 py-0.5 text-white bg-gray-700 border-2 border-green-500 hover:bg-gray-800 text-md">Reset<FontAwesomeIcon icon={faRotateRight} className="text-white px-1"/></button>
    
                    {sortToggle ? <button onClick={handleSort} className="mt-2 text-white flex justify-center items-center text-start px-2 py-0.5 text-white bg-gray-700 border-2 border-green-500 hover:bg-gray-800 text-md">Sort By Rating<FontAwesomeIcon icon={faArrowDown} className="pl-1"/></button> : <button onClick={handleSort} className="mt-2 text-white flex justify-center items-center text-start px-2 py-0.5 text-white bg-gray-700 border-2 border-green-500 hover:bg-gray-800 text-md">Sort By Rating<FontAwesomeIcon className="pl-1" icon={faArrowUp}/></button>}
                </form>

                

            </div>
            <div className="justify-self-center flex-grow">
            {dataHH.map((item, index) => 
            
            <div className="flex justify-center text-gray-50 py-2" >
                <div className="flex sm:justify-around bg-gray-700 flex-wrap border-black border rounded mx-4 sm:w-4/6 my-2 space-y-2 " key={index}>
                    <div className="flex justify-between sm:w-1/4 p-1.5 sm:p-1 space-x-0.5 flex-grow">
                    <div className="flex-col flex justify-between sm:pl-2 sm:mx-1 w-1/2 sm:w-1/3 sm:min-h-min">
                    <div>
                        <Link to ={`/HHPost/${item._id}`}><span className="text-xl sm:text-2xl font-medium sm:pb-2">{item.name}</span></Link> 
                            <div className="star-rating flex items-center">
                                {item.ovRatingAvg != null ? <div>{String(item.ovRatingAvg).length === 1 ? <div className="pr-1">{item.ovRatingAvg}.0</div> : <div className="pr-1">{item.ovRatingAvg}</div>}</div> : <div className="hidden"></div>}
                                {[...Array(4)].map((star, index) => {
                                index += 1;
                                return (
                                    <div
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
                        {authed ? <div>{
                            userData.favoritePosts.includes(item._id) ?
                            <div><button action={`${item._id}`} type="submit" onClick={handleRmFavorite}>Remove Favorites <FontAwesomeIcon icon={faStarActive} className="text-sky-400"/></button></div>
                             : 
                            <div><button action={`${item._id}`} type="submit" onClick={handleAddToFavorite}>Add To Favorites <FontAwesomeIcon icon={faStarInactive} className="text-sky-400"/></button></div>
                            }
                        </div> : <div><Link to="/login">Add To Favorites <FontAwesomeIcon icon={faStarInactive}/></Link></div>} 
                        
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
                    
                    {item.images.length > 0 ? <div className="flex sm:p-0 h-36 w-48 sm:h-40 sm:w-52 md:h-48 md:w-64 bg-gray-800 bg-opacity-40">
                        <img src={item.images[0]} className="object-contain h-36 w-48 sm:h-40 sm:w-52 md:h-48 md:w-64"/>
                    </div>  : <div className="flex h-36 w-48 sm:h-40 sm:w-52 md:h-48 md:w-64 items-center justify-center sm:p-3 sm:mx-1 border-black border rounded">No Photo Yet</div>}                           
                    </div>
                  
                    {/* MOBILE CONTACT INFO VIEW */}
                    <div className="sm:hidden flex justify-between p-1.5 space-x-0.5 flex-grow">        
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
        </div>
    </div>
        
    )
}