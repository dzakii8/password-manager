import axios from "axios";
import { useState } from "react"
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getDataPassword } from "../features/fetch/asyncAction";

export default function FormInputPass() {
  const [formPass, setFormPass] = useState({
    name: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://ip.dzakii.online/savePassword', formPass, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setFormPass({
        name: "",
        password: ""
      })
      dispatch(getDataPassword())
    } catch (error) {
      console.log(error);
    }
  }
  const handleGenerate = async () => {
    try {
      setShowPassword(true)
      const { data } = await axios.get(`https://ip.dzakii.online/generatePassword/${formPass.password}`,{
        headers : {
          Authorization : `Bearer ${localStorage.access_token}`
        }
      })
      setFormPass((prev)=>{
        return {
          ...prev,
          password : data.result
        }
      })
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container-fluid flex justify-center">
      <div className="bg-grey-100 relative overflow-x-auto shadow overflow-hidden border-collapse border-b border-gray-700 sm:rounded-lg w-2/3 mt-10 flex flex-col">
        <label className="my-10  text-center">Save Password</label>
        <form className="max-w-2/3 mx-auto flex mb-4" onSubmit={handleOnSubmit}>
          <div className="mx-auto">
            <label
              htmlFor="email"
              className="block mx-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={formPass.name}
              onChange={(e) => {
                setFormPass((prev) => {
                  return {
                    ...prev,
                    name: e.target.value
                  }
                })
              }}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
             p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mx-5">
            <div className="flex">

              <label
                htmlFor="password"
                className="block mx-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password /
              </label>
              <label
                className="text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                if you want Generate, input word length and <span onClick={handleGenerate} className="underline">Click Here</span>
              </label>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formPass.password}
              onChange={(e) => {
                setFormPass((prev) => {
                  return {
                    ...prev,
                    password: e.target.value
                  }
                })
              }}

              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-8 mr-5">
            <label onClick={() =>
              setShowPassword((prev) => !prev)
            } >{showPassword ? <BiSolidHide /> : <BiSolidShow />}</label>
          </div>
          <button
            type="submit"
            className=" my-5 text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>

  )
}