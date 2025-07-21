import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditNote() {

    const[noteData, setNoteData] = useState({});
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        async function getData(){
            await axios.get(`http://localhost:5000/note/${id}`)
            .then(res => {
                setNoteData({
                    title: res.data.title,
                    content: res.data.content
                })
            })
        }
        getData();
    },[])

    function onHandleChange(e){
        let val = e.target.value;
        setNoteData((prev)=>(
            {...prev, [e.target.name]:val}
        ))
    }

    async function onHandleSubmit(e){
        e.preventDefault();
        console.log(noteData);
        await axios.put(`http://localhost:5000/note/${id}`, noteData,{
            headers:{
                "Content-Type": "application/json",
                "authorization": 'bearer ' + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            navigate("/myNotes");
        })
    }


  return (
    <div className="container">
        <form className='form' onSubmit={onHandleSubmit}>
            <div className="form-control">
                <label>Title</label>
                <input type="text" className='input' name='title' onChange={onHandleChange} value={noteData.title || ''} />
            </div>

            <div className="form-control">
                <label>Content</label>
                <input type="text" className='input' name='content' onChange={onHandleChange} value={noteData.content || ''} />
            </div>

            <button type='submit'>Edit Recipe</button>

        </form>
    </div>
  )
}
