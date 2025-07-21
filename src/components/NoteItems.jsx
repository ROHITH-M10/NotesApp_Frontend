import React, { useState,useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import axios from 'axios';

export default function NoteItems() {
    const notes = useLoaderData();

    const [allNotes, setAllNotes] = useState([]);

    let path = window.location.pathname === "/myNotes" ? true : false;
    let favItems = JSON.parse(localStorage.getItem("fav")) || [];
    const [isFavNote, setIsFavNote] = useState(false);

    useEffect(()=>{
        setAllNotes(notes);
    },[notes]);

    async function onDelete(id){
        await axios.delete(`http://localhost:5000/note/${id}`)
        .then((res)=>{
            console.log(res);
            setAllNotes((notes)=>(
                notes.filter(recipe => recipe._id !== id)
            ))

        })
        let filterItem = favItems.filter((note)=> note._id !== id);
        localStorage.setItem("fav", JSON.stringify(filterItem));


    }

    function favNote(item){
        let filterItem = favItems.filter((note)=> note._id === item._id);
        if (filterItem.length === 0){
            favItems.push(item);
        }
        else{
            favItems = favItems.filter((note)=> note._id !== item._id);
        }
        localStorage.setItem("fav", JSON.stringify(favItems));
        setIsFavNote((prev)=>!prev);
    }


  return (
    <div className='note-items'>
        {
            allNotes.map((item,index)=>{
                return(
                    <div className='note-item' key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>

                        <div className="note-options">
                            {
                                (path) ? 
                                (
                                    <>
                                    <Link to = {`/editNote/${item._id}`}><button className='edit'><MdEdit /></button></Link>
                                    <button className='btn' onClick={()=>onDelete(item._id)}><MdDelete /></button>
                                    </>
                                ):
                                (
                                    <button className='like' onClick={()=>favNote(item)}><FaHeart
                                    style={{color : (favItems.some(res => res._id === item._id))? "red" : ""}}/> </button>
                                )
                            }
                                                  

                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}
