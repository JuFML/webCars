import { useState } from "react"
import type { CarProps } from "../pages/home"
import { collection, query, QueryConstraint, getDocs, where } from "firebase/firestore"
import { db } from "../services/firebaseConnection"

export const useCars = (customQueryConstraints?: QueryConstraint[]) => {
  const [cars, setCars] = useState<CarProps[]>([])

  const handleSearchCar = async (input: string) => {
    if (input === "") {
      loadCars()
      return
    }

    setCars([])
    const q = query(collection(db, "cars"),
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff"),
    )

    const querySnapshot = await getDocs(q)
    const listCars = [] as CarProps[]
    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        city: doc.data().city,
        created: doc.data().created,
        description: doc.data().description,
        images: doc.data().images,
        km: doc.data().km,
        model: doc.data().model,
        name: doc.data().name,
        owner: doc.data().owner,
        ownerUID: doc.data().ownerUID,
        price: doc.data().price,
        whatsapp: doc.data().whatsapp,
        year: doc.data().year,
      })
    })
    setCars(listCars)
  }

  const loadCars = () => {
    const carsRef = collection(db, "cars")
    const constraints = customQueryConstraints ?? []
    const queryRef = query(carsRef, ...constraints)

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
            images: item.data().images,
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
  }

  return { cars, setCars, loadCars, handleSearchCar }

}


