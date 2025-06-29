import { useEffect, useState } from "react"
import CarCard from "../../components/carCard"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export interface CarProps {
  id: string;
  city: string;
  created: string;
  description: string;
  images: string[];
  km: string;
  model: string;
  name: string;
  owner: string;
  ownerUID: string;
  price: string | number;
  whatsapp: string;
  year: string;
}

function Home() {
  const [cars, setCars] = useState<CarProps[]>([])

  useEffect(() => {
    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("created", "desc"))

    const carsList = [] as CarProps[]
    getDocs(queryRef)
      .then((snapshot) => {
        snapshot.forEach(item => {
          carsList.push({
            id: item.id,
            city: item.data().city,
            created: item.data().created,
            description: item.data().description,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            images: item.data().images.map((img: any) => img.url),
            km: item.data().km,
            model: item.data().model,
            name: item.data().name,
            owner: item.data().owner,
            ownerUID: item.data().ownerUID,
            price: item.data().price,
            whatsapp: item.data().whatsapp,
            year: item.data().year
          })
        })
        setCars(carsList)
      })
  }, [])

  return (
    <>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none border-gray-200"
          placeholder="Digite o nome do carro..."
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">Buscar</button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usados em todo  Brasil</h1>

      <main className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </main>
    </>
  )
}

export default Home
