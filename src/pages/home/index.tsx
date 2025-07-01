import { useEffect, useState } from "react"
import CarCard from "../../components/carCard"
import { orderBy } from "firebase/firestore"
import { Link } from "react-router";
import { useCars } from "../../hooks/useCars";

export interface CarProps {
  id: string;
  city: string;
  created: string;
  description: string;
  images: ImageCarProps[];
  km: string;
  model: string;
  name: string;
  owner: string;
  ownerUID: string;
  price: string | number;
  whatsapp: string;
  year: string;
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}


function Home() {
  const { cars, loadCars, handleSearchCar } = useCars([orderBy("created", "desc")])
  const [input, setInput] = useState("")

  const handleInput = (value: string) => {
    if (value === "") {
      loadCars()
    }
    setInput(value)
  }

  useEffect(() => {
    loadCars()
  }, [])

  return (
    <>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none border-gray-200"
          placeholder="Digite o nome do carro..."
        />
        <button
          onClick={() => handleSearchCar(input)}
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">Buscar</button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usados em todo  Brasil</h1>

      <main className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (

          <Link key={car.id} to={`car/${car.id}`}>
            <CarCard key={car.id} car={car} />
          </Link>
        ))}
      </main>
    </>
  )
}

export default Home
