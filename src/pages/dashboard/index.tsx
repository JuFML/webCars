import { useEffect, useContext } from "react"
import CarCard from "../../components/carCard"
import { deleteDoc, doc, where } from "firebase/firestore"
import DashboardHeader from "../../components/dashboardHeader"
import { AuthContext } from "../../contexts/auth"
import { useCars } from "../../hooks/useCars"
import { db, storage } from "../../services/firebaseConnection"
import type { CarProps } from "../home"
import { deleteObject, ref } from "firebase/storage"


function Dashboard() {
  const { user } = useContext(AuthContext)
  const { cars, setCars, loadCars } = useCars([where("ownerUID", "==", user?.uid)])

  const handleDeleteCar = (car: CarProps) => {
    const docRef = doc(db, "cars", car.id)
    deleteDoc(docRef)
      .then(() => {
        car.images.map(image => {
          const imagePath = `images/${image.uid}/${image.name}`
          const imageRef = ref(storage, imagePath)

          deleteObject(imageRef)
            .then(() => {
              setCars(cars.filter(item => item.id !== car.id))
              console.log("Imagens eliminadas com sucesso")
            })
            .catch((err) => console.log("Algo deu errado ao eliminar as imagesn ", err))
        })


        console.log("Carro deletado com sucesso")
      })
      .catch((err) => console.log("Erro ao dele o Carro", err))
  }

  useEffect(() => {
    if (!user?.uid) {
      return
    }
    loadCars()
  }, [user])

  return (
    <>
      <DashboardHeader />
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
          <CarCard car={car} key={car.id} handleDeleteCar={handleDeleteCar} showDeleteIcon />
        ))}
      </main>
    </>
  )
}

export default Dashboard
