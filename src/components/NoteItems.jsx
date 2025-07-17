import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function NoteItems() {
    const allNotes = useLoaderData();
  return (
    <div className='note-items'>
        {
            allNotes.map((item,index)=>{
                return(
                    <div className='note-item' key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </div>
                )
            })
        }
    </div>
  )
}
