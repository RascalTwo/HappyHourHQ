import React from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'

export default function HHForm() {
    const { user } = useAuth();
    let navigate = useNavigate();

    const [msg, setMsg] = React.useState({
        text: '',
        success: false,
    })

    const [formData, setFormData] = React.useState(
        {
            name: "", 
            startTime: "",
            endTime: "", 
            address: "",
            zipcode: "",
            state: "",
            city: "", 
            website: "https://",
            phone: "",
            monday: false, 
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false, 
            drinks: false,
            food: false,
            
            
        }
    )

    function handlePhoneChange(value){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                phone: value,
            }
        })
        console.log(formData.phone)
    }

    function handleChange(event){
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            console.log(formData)
            return{
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            }
        })
    }

    const handleSubmit = async event => {
		event.preventDefault();
		try {
            console.log(formData.website)
			const response = await axios({
				method: 'POST',
				data: {
					name: formData.name,
                    address: formData.address,
                    zipcode: formData.zipcode,
                    state: formData.state,
                    city: formData.city,
                    website: formData.website,
                    phone: formData.phone,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    monday: formData.monday,
                    tuesday: formData.tuesday,
                    wednesday: formData.wednesday,
                    thursday: formData.thursday,
                    friday: formData.friday,
                    saturday: formData.saturday,
                    sunday: formData.sunday,
                    user: formData.user,
                    drinks: formData.drinks,
                    food: formData.food
				},
				url: '/createHH',
				withCredentials: true,
			});
            setMsg({
                text: response.data.message.msgBody,
                success: true,
            })
			setTimeout(() => navigate('/feed'), 1500)
		} catch (err) {
			console.log(err);
			
		}
        console.log(formData)
	};
    
    return (
    
    <div className="flex flex-col items-center my-6">
        <div className="rounded-2xl sm:w-3/5 w-4/5 shadow-xl bg-gray-800 flex flex-col p-4 sm:p-8 space-y-2">
            <h1 className='card-title self-center mb-4 text-white'>New Happy Hour</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex justify-center flex-wrap gap-4 sm:gap-16">
            <div className="flex flex-col w-96 gap-2"> 
                <label htmlFor="name" className="text-white">Name</label>
                    <input className="input input-bordered w-full max-w-xs"
                        type="text"
                        placeholder="Restaurant Name"
                        onChange={handleChange}
                        name="name"
                        value={formData.name}
                        required
                    />
                    <label htmlFor="address" className="text-white">Location</label>
                    <input className="input input-bordered w-full max-w-xs"
                        type="text"
                        placeholder="Street Address"
                        onChange={handleChange}
                        name="address"
                        value={formData.address}
                        required
                    />
                    <input className="input input-bordered w-full max-w-xs"
                        type="text"
                        placeholder="City"
                        onChange={handleChange}
                        name="city"
                        value={formData.city}
                        required
                    />
                    {/* State Downdown Menu */}
                    
                    <select id="state" name="state" value={formData.state} onChange={handleChange} className="input input-bordered w-full max-w-xs" required>
                        <option value="">Select A State</option>
                        <option value="AK">Alaska</option>
                        <option value="AL">Alabama</option>
                        <option value="AR">Arkansas</option>
                        <option value="AZ">Arizona</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DC">District of Columbia</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="IA">Iowa</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MD">Maryland</option>
                        <option value="ME">Maine</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MO">Missouri</option>
                        <option value="MS">Mississippi</option>
                        <option value="MT">Montana</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="NE">Nebraska</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NV">Nevada</option>
                        <option value="NY">New York</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VA">Virginia</option>
                        <option value="VT">Vermont</option>
                        <option value="WA">Washington</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WV">West Virginia</option>
                        <option value="WY">Wyoming</option>
                    </select>

                    <input className="input input-bordered w-full max-w-xs"
                        type="text"
                        placeholder="Zipcode"
                        onChange={handleChange}
                        name="zipcode"
                        value={formData.zipcode}
                        minLength={5}
                        maxLength={5}
                        required
                    />
                    <label htmlFor="website" className="text-white">Website</label>
                    <input className="input input-bordered w-full max-w-xs"
                        type="url"
                        placeholder="Website"
                        onChange={handleChange}
                        name="website"
                        value={formData.website}
                        
                    />
                </div>
        <div className="flex flex-col w-96 gap-2">
            <label htmlFor="phone" className="text-white -mt-2 md:mt-0">Phone Number</label>
            <PhoneInput 
            placeholder="Enter Phone Number"
            defaultCountry="US"
            onChange={handlePhoneChange}
            value={formData.phone}
            required
            className="input input-bordered w-full max-w-xs "/>
            <label htmlFor="startTime" className="text-white">Start Time</label>
            <input className="input input-bordered w-full max-w-xs"
                type="time"
                placeholder="start-time"
                onChange={handleChange}
                name="startTime"
                value={formData.startTime}
                step="1800"
                required
            />
            <label htmlFor="endTime" className="text-white">End Time</label>
            <input className="input input-bordered w-full max-w-xs"
                type="time"
                placeholder="end-time"
                onChange={handleChange}
                name="endTime"
                value={formData.endTime}
                step="1800"
                required
            />
                <label htmlFor="drinks" className="text-white my-2">Happy Hour Type</label>
                <div className="flex space-x-4 sm:space-x-4 w-full -my-2">
                    <input
                            type ="checkbox"
                            id="drinks"
                            checked={formData.drinks}
                            onChange={handleChange}
                            name="drinks"
                            className="w-6 h-6"
                        />
                        <label htmlFor="drinks" className="text-white">Drinks</label>
                    
                    <input
                            type ="checkbox"
                            id="food"
                            checked={formData.food}
                            onChange={handleChange}
                            name="food"
                            className="w-6 h-6"
                        />
                    <label htmlFor="food" className="text-white">Food</label>
                </div>
            <label htmlFor="monday" className="text-white mt-2">Days Open?</label>
            <div className="flex space-x-4 sm:space-x-4 w-full -my-2">
                <div className="flex flex-col items-center">
                    <label htmlFor="monday" className="text-white">M</label>
                    <input
                        type ="checkbox"
                        id="monday"
                        checked={formData.monday}
                        onChange={handleChange}
                        name="monday"
                        className="w-6 h-6"
                        
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="tuesday" className="text-white">T</label>
                    <input
                        type ="checkbox"
                        id="tuesday"
                        checked={formData.tuesday}
                        onChange={handleChange}
                        name="tuesday"
                        className="w-6 h-6"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="wednesday" className="text-white">W</label>
                    <input
                        type ="checkbox"
                        id="wednesday"
                        checked={formData.wednesday}
                        onChange={handleChange}
                        name="wednesday"
                        className="w-6 h-6"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="thursday" className="text-white">Th</label>
                    <input
                        type ="checkbox"
                        id="thursday"
                        checked={formData.thursday}
                        onChange={handleChange}
                        name="thursday"
                        className="w-6 h-6"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="friday" className="text-white">F</label>
                    <input
                        type ="checkbox"
                        id="friday"
                        checked={formData.friday}
                        onChange={handleChange}
                        name="friday"
                        className="w-6 h-6"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="saturday" className="text-white">Sa</label>
                    <input
                        type ="checkbox"
                        id="saturday"
                        checked={formData.saturday}
                        onChange={handleChange}
                        name="saturday"
                        className="w-6 h-6"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="sunday" className="text-white">Su</label>
                    <input
                        type ="checkbox"
                        id="sunday"
                        checked={formData.sunday}
                        onChange={handleChange}
                        name="sunday"
                        className="w-6 h-6"
                    />
                </div>
            </div>
            </div>
        </div>  
            <br />
        <div className="flex justify-center">
            
            <button className="flex w-1/2 justify-center bg-green-400 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300">Submit</button>
        </div>
        </form>
        <div className="text-sky-400 text-center">{msg ? msg.text : ""}</div>
        </div>
    </div>
   
    )
}
