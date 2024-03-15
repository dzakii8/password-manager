import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Table from "../components/Table"
import FormInputPass from "../components/formInputPass"

export default function Home() {
  return (
    <>
      <div className="bg-stone-300 h-screen">

        <Navbar />
        <FormInputPass />
        <Table />
      </div>
    </>
  )
}