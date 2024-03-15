import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";


export default function Verify() {

    const {search} = useLocation();
    let nav = useNavigate()
  

  useEffect(() => {
    localStorage.access_token = search.slice(3)
    nav('/home')
  })


  return (
    <>

    </>
  )
}