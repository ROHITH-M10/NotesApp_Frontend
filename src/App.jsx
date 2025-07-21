import React from 'react'
import "../src/App.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home.jsx';
import MainNavigation from './components/MainNavigation.jsx';
import axios, { all } from 'axios';
import AddNotes from './pages/AddNotes.jsx';
import EditNote from './pages/EditNote.jsx';

const getAllNotes = async()=>{
  let allNotes = [];
  await axios.get("http://localhost:5000/note/").then(res=>{
    allNotes = res.data;
  })
  return allNotes;
}

async function getMyNotes(){
  let user = JSON.parse(localStorage.getItem("user"));
  let allNotes = await getAllNotes();
  return allNotes.filter((item)=> item.createdBy === user._id);
}

function getFavNotes(){
  return JSON.parse(localStorage.getItem("fav"));

}

const router = createBrowserRouter([
  {path : "/", element: <MainNavigation />, children:[
    {path:"/", element: <Home />, loader: getAllNotes},
    {path:"/myNotes", element: <Home />, loader: getMyNotes},
    {path:"/favNotes", element: <Home />, loader: getFavNotes},
    {path:"/addNote", element: <AddNotes />},
    {path:"/editNote/:id", element: <EditNote />},
  ]}
]);

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
