import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NoteItems from '../components/NoteItems'

export default function Home() {
  return (
    <>

    <section className='home'>
        <div className='left'>
            <h1>Welcome to the Note Blog App</h1>
            <button>Share your note</button>
        </div>
        <div className='right'>
            <p>Here you can create, read, update, and delete your notes easily.</p>
            <p>Start by creating your first note!</p>
        </div>
    </section>

    <div className='notes'>
        <NoteItems />
    </div>

    </>
  )
}
