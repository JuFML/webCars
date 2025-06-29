import { useState } from "react"
import type { CarProps } from "../pages/home"
import { collection, query, QueryConstraint, getDocs } from "firebase/firestore"
import { db } from "../services/firebaseConnection"

export const useCars = (customQueryConstraints?: QueryConstraint[]) => {
  const [cars, setCars] = useState<CarProps[]>([])

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

  return { cars, setCars, loadCars }

}


