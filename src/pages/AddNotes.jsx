import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddNotes() {

    const[noteData, setNoteData] = useState({});
    const navigate = useNavigate();

    function onHandleChange(e){
        let val = e.target.value;
        setNoteData((prev)=>(
            {...prev, [e.target.name]:val}
        ))
    }

    async function onHandleSubmit(e){
        e.preventDefault();
        console.log(noteData);
        await axios.post("http://localhost:5000/note", noteData,{
            headers:{
                "Content-Type": "application/json",
                "authorization": 'bearer ' + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            navigate("/");
        })
    }


  return (
    <div className="container">
        <form className='form' onSubmit={onHandleSubmit}>
            <div className="form-control">
                <label>Title</label>
                <input type="text" className='input' name='title' onChange={onHandleChange}/>
            </div>

            <div className="form-control">
                <label>Content</label>
                <input type="text" className='input' name='content' onChange={onHandleChange}/>
            </div>

            <button type='submit'>Add Recipe</button>

        </form>
    </div>
  )
}
