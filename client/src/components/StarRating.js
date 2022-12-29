
import React from "react";

const StarRating = (props) => {
    return (
  <div className="star-rating flex items-center space-x-1">
    <span className={props.nameStyle == undefined ? "text-lg" : props.nameStyle}>{props.name}</span>
      
        {[...Array(4)].map((star, index) => {
          index += 1;
          return (
            <div
              key={index}
              className={props.rating == null ||Math.round(props.rating) <= index-1 ? "text-gray-300" : "text-green-400"}
            >
              <span className={props.starStyle == undefined ? "text-xl -mr-1" : props.starStyle}>&#9733;</span>
            </div>
          );
        })}
      
    </div>
    );
  };

export default StarRating;