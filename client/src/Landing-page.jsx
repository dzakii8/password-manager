import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <>
      <div className="hero min-h-screen bg-black">
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h2 className="mb-5 text-2xl font-bold">Welcome to Password Manager</h2>
            <p className="mb-5">Generate and save your password here!</p>
            <Link to="/login">
              <button className="btn btn-primary btn-neutral">Login / Register</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}