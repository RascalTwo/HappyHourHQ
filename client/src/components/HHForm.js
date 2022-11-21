import React from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function HHForm() {
    const { user } = useAuth();
    let navigate = useNavigate();

    const [formData, setFormData] = React.useState(
        {
            name: "", 
            startTime: "",
            endTime: "", 
            address: "", 
            website: "https://",
            rating: 0,
            monday: false, 
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false, 
            
            
        }
    )

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
                    website: formData.website,
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
				},
				url: 'http://localhost:5000/createHH',
				withCredentials: true,
			});
			navigate('/dashboard');
		} catch (err) {
			console.log(err);
			
		}
        console.log(formData)
	};
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <input className="border rounded border-black"
                type="text"
                placeholder="Restaurant Name"
                onChange={handleChange}
                name="name"
                value={formData.name}
            />
            <input className="border rounded border-black"
                type="text"
                placeholder="Address"
                onChange={handleChange}
                name="address"
                value={formData.address}
            />
            <input className="border rounded border-black"
                type="url"
                placeholder="Website"
                onChange={handleChange}
                name="website"
                value={formData.website}
            />
            <input className="border rounded border-black"
                type="time"
                placeholder="start-time"
                onChange={handleChange}
                name="startTime"
                value={formData.startTime}
                step="1800"
            />
            <input className="border rounded border-black"
                type="time"
                placeholder="end-time"
                onChange={handleChange}
                name="endTime"
                value={formData.endTime}
                step="1800"
            />
            <div className="flex space-x-2">
                <div className="flex flex-col items-center">
                    <label htmlFor="monday">M</label>
                    <input
                        type ="checkbox"
                        id="monday"
                        checked={formData.monday}
                        onChange={handleChange}
                        name="monday"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="tuesday">T</label>
                    <input
                        type ="checkbox"
                        id="tuesday"
                        checked={formData.tuesday}
                        onChange={handleChange}
                        name="tuesday"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="wednesday">W</label>
                    <input
                        type ="checkbox"
                        id="wednesday"
                        checked={formData.wednesday}
                        onChange={handleChange}
                        name="wednesday"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="thursday">Th</label>
                    <input
                        type ="checkbox"
                        id="thursday"
                        checked={formData.thursday}
                        onChange={handleChange}
                        name="thursday"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="friday">F</label>
                    <input
                        type ="checkbox"
                        id="friday"
                        checked={formData.friday}
                        onChange={handleChange}
                        name="friday"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="saturday">Sa</label>
                    <input
                        type ="checkbox"
                        id="saturday"
                        checked={formData.saturday}
                        onChange={handleChange}
                        name="saturday"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="sunday">Su</label>
                    <input
                        type ="checkbox"
                        id="sunday"
                        checked={formData.sunday}
                        onChange={handleChange}
                        name="sunday"
                    />
                </div>
                
            </div>
            
            
            
            <br />
            
            <button>Submit</button>
        </form>
    )
}
