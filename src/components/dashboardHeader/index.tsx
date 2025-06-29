import { Link } from "react-router"


const DashboardHeader = () => {
  return (
    <div className="w-full items-center flex h-10 bg-[#E11138] rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Novo Carro</Link>
    </div>
  )
}

export default DashboardHeader