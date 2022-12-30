import React from "react";

export default function ImageModal (props){
    return (
        <div>
        	{/* The button to open modal */}
			{/* <label htmlFor="my-modal" className="btn">open modal</label> */}

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
			    <div className="modal-box w-full">
			        <div className="carousel w-full bg-gray-500">
                    {props.images.map((item, index) => 
                    <div id={`slide${index}`} className="carousel-item relative w-full flex justify-center">
                        <img src={item} className="object-scale-down" key={index}/>
                    {props.images.length !== 1 ? 
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${index-1 < 0 ? props.images.length-1 : index-1}`} className="btn btn-circle bg-opacity-50">❮</a> 
                            <a href={`#slide${index+1 > props.images.length-1 ? 0 : index+1}`} className="btn btn-circle bg-opacity-50">❯</a>
                        </div> : <div></div>}
                    </div>
                    )}
                </div>
				<div className="modal-action">
					<label htmlFor="my-modal" className="btn">Return</label>
				</div>
	        </div>
	    </div>
    </div>
    )
}