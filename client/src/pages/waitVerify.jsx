import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function WaitVerify() {

  const [form, setFrom] = useState({
    email: "admin@mail.com",
    password: "admin"
  })

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('https://ip.dzakii.online/login', form)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleCredentialResponse = async (response) => {
    const google_token = response.credential
    const { data } = await axios.post("https://ip.dzakii.online/google-login", { google_token })
    localStorage.access_token = data.access_token
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "1023977623709-456ig66bcjsdt1qrgmea4eohl32m2880.apps.googleusercontent.com",
      callback: handleCredentialResponse
    })
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }, [])

  return (
    <>
      <div className="hero bg-black">
        <div className="hero-overlay flex flex-wrap justify-center lg:h-screen lg:items-center">
          <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="text-white text-2xl font-bold sm:text-3xl">Get started today!</h1>
            </div>
            <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleOnSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => {
                      setFrom((prev) => {
                        return {
                          ...prev,
                          email: e.target.value
                        }
                      })
                    }}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>

                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => {
                      setFrom((prev) => {
                        return {
                          ...prev,
                          password: e.target.value
                        }
                      })
                    }}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            <button type="submit" className="btn btn-primary btn-neutral w-full">Sign In</button>
            </form>
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 font-bold">
                  No account?
                  <Link to="/register">
                  <a className="underline"> Sign up</a>
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Or
                </p>
              </div>
              <div id="buttonDiv" type="button"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}