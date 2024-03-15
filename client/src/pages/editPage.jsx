import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import Navbar from "../components/Navbar";
import { getDataPassword } from "../features/fetch/asyncAction";
export default function EditPage() {
  const [data, setData] = useState([])
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const fetchdata = async (e) => {
    try {
      await axios.get(`https://ip.dzakii.online/savePassword/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setFormPass({
        password: ""
      })
      dispatch(getDataPassword())
    } catch (error) {
      console.log(error);
    }
  }
  const handleOnEdit = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`https://ip.dzakii.online/savePassword/${id}`, formPass, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setFormPass({
        password: ""
      })
      dispatch(getDataPassword())
    } catch (error) {
      console.log(error);
    }
  }
  const fetchData = ()=>{
    try {
      const {data} = axios.get(`https://ip.dzakii.online/savedPassword${id}`)
    } catch (error) {
      
    }
  }

  useEffect(()=>{

  })
  return (
    <><Navbar />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 flex flex-col">
        <thead className="text-xs uppercase bg-gray-100 dark:text-gray-400 text-grey-600 w-full flex justify-between">
          <tr className=" w-full flex justify-between">
            <th scope="col" className="px-6 py-3 w-1/4 text-center">
              Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 text-center">
              Password
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 text-center">
            </th>
          </tr>
        </thead>
        <tbody></tbody>
        <tr className="bg-white  dark:border-gray-700  w-full flex justify-between">
          <th className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap w-1/4 text-center">
            <></>
          </th>
          <td className="px-6 py-4 w-1/4 text-gray-800 flex justify-between">
            <input name="password" type={showPassword ? "text" : "password"}
              className="text-center w-full" />
            <div className="flex justify-center">
              <label onClick={() =>
                setShowPassword((prev) => !prev)
              } >{showPassword ? <BiSolidHide /> : <BiSolidShow />}</label>
            </div>
          </td>
          <td className="px-6 py-4 text-right w-1/4 text-center">
            <button className="btn">
              Edit
            </button>
          </td>
        </tr>
      </table>
    </>
  )
}