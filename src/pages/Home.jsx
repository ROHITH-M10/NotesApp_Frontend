import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NoteItems from '../components/NoteItems'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  function addNote(){
    if (localStorage.getItem("token")){
      navigate("/addNote");
    } 
    else {
      setIsOpen(true);
    }
  }
  return (
    <>

    <section className='home'>
        <div className='left'>
            <h1>Welcome to the Note Blog App</h1>
            <button onClick={addNote}>Share your note</button>
        </div>
        <div className='right'>
            <p>Here you can create, read, update, and delete your notes easily.</p>
            <p>Start by creating your first note!</p>
        </div>
    </section>

    {
        isOpen && <Modal onClose={()=>{setIsOpen(false)}}>
        <InputForm setIsOpen={()=>(false)}/>
        </Modal>
    }

    <div className='notes'>
        <NoteItems />
    </div>

    </>
  )
}
