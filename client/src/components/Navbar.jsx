import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"

export default function Navbar() {
  const dispatch = useDispatch()
  const nav = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    nav('/login')
  }

  const [user, setUser] = useState({
    id: 0,
    email: '',
    role: '',
    status: ''
  })


  const fetchUser = async () => {
    const { data } = await axios.get("https://ip.dzakii.online/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    setUser(data)
  }

  useEffect(() => {
    if (localStorage.access_token) {
      fetchUser()
    }
  }, [])

  const isLogin = useMemo(() => {
    return !!localStorage.getItem("access_token")
  })

  const handleOnUpgrade = async () => {
    const { data } = await axios.get("https://ip.dzakii.online/payment/midtrans/initiate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })

    window.snap.pay(data.token, {
      onSuccess: async function () {
        const requestBody = {
          orderId: data.orderId
        }
        await axios.patch(
          "https://ip.dzakii.online/users/me/upgrade",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
          }
        )
        dispatch(getDataPassword())
      }
    })
  }
  const isPremium = user.status === "premium"


  return (
    <div className="flex justify-center">
      <nav className="navbar bg-gray-200 text-gray-700 shadow-lg rounded-lg flex justify-between w-2/3">
        <Link to="/home">
          <button className="btn btn-ghost text-xl">HCK</button>
        </Link>
        {!isPremium ? <button onClick={handleOnUpgrade} className="btn btn-ghost text-xl ">Upgrade to Premium</button> : null}
        <button onClick={handleLogout} className="btn btn-ghost text-xl">Logout</button>
      </nav>
    </div>
  )
}