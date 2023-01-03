import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'

export default function HHType(props) {
    return (
        <div>
            <div className="flex space-x-4 text-sm">
                <span className="flex justify-center items-center">Drinks {props.drinks ? <FontAwesomeIcon className="pl-1 text-green-400" icon={faCheck}/> : <FontAwesomeIcon className="pl-1.5 text-red-400 text-xs" icon={faX}/>}</span>
                <span className="flex justify-center items-center">Food {props.food ? <FontAwesomeIcon className="pl-1 text-green-400" icon={faCheck}/> : <FontAwesomeIcon className="pl-1.5 text-red-400 text-xs" icon={faX}/>}</span>
            </div>
        </div>
        
    )
}