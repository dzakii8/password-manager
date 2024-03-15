import { useEffect, useState } from "react"
import axios from "axios";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataPassword } from "../features/fetch/asyncAction";
export default function Table() {
  const [data, setData] = useState([])
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const pw = useSelector((state) => state.dataPassword.dataPassword)


  const handleDelete =async (id) => {
    console.log(id);
      try {
        await axios.delete(`https://ip.dzakii.online/savePassword/${id}`,{
          headers :
          {Authorization : `Bearer ${localStorage.access_token}`}
        })
        dispatch(getDataPassword())
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    // fetchData()
    dispatch(getDataPassword())
    // console.log(pw);
  }, [])

  return (
    <div className="container-fluid flex justify-center">
      <div className="relative overflow-x-auto shadow overflow-hidden border-collapse border-b border-gray-700 sm:rounded-lg w-2/3 mt-10">
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
          <tbody>
            {pw.map(e => {
              return (

                <tr className="bg-white  dark:border-gray-700  w-full flex justify-between">
                  <th className="px-6 py-8  font-medium text-gray-800 whitespace-nowrap w-1/4 text-center">
                    {e.name}
                  </th>
                  <td className="px-6 py-4 w-1/4 text-gray-800 flex justify-between">
                    <input type={showPassword ? "text" : "password"}
                      value={e.password} className="text-center w-full" />
                    <div className="flex justify-center">
                      <label className="m-auto" onClick={() =>
                        setShowPassword((prev) => !prev)
                      } >{showPassword ? <BiSolidHide /> : <BiSolidShow />}</label>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right w-1/4 text-center">
                    <button  className="btn">edit</button>
                    <button onClick={()=>handleDelete(e.id)} className="btn">delete</button>
                  </td>
                </tr>
              )

            })}
          </tbody>
        </table>
      </div>
    </div>

  )
}