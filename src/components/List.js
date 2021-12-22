import React from 'react';
import './list.css';
import {FaTrashAlt, FaEdit} from "react-icons/fa";

const List = ({list, removeItem,editItem}) => {
    return (
        <div>
            {list.map((item)=>{
                const {id, title} = item;
                return(
                    <div key={id} className='list-container'>
                    <p>{title}</p>
                    <div className='btn-container'>
                        <button className='edit' onClick={() => editItem(item)}><FaEdit/></button>
                        <button className='remove' onClick={()=> removeItem(id)}><FaTrashAlt/></button>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List
