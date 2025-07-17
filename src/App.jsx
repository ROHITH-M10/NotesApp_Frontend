import React from 'react'
import "../src/App.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home.jsx';
import MainNavigation from './components/MainNavigation.jsx';
import axios, { all } from 'axios';

const getAllNotes = async()=>{
  let allNotes = [];
  await axios.get("http://localhost:5000/note/").then(res=>{
    allNotes = res.data;
  })
  return allNotes;
}

const router = createBrowserRouter([
  {path : "/", element: <MainNavigation />, children:[
    {path:"/", element: <Home />, loader: getAllNotes},
  ]}
]);

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
