import { Link } from "react-router"
import type { CarProps } from "../../pages/home"
import { useState } from "react"


const CarCard = ({ id, city, images, km, name, price, year }: CarProps) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => [...prev, id])
  }

  return (
    <Link key={id} to={`car/${id}`}>
      <section className="mx-auto bg-white rounded-lg">
        <div
          className="w-full rounded-lg mb-2 h-72 bg-slate-200"
          style={{ display: loadedImages.includes(id) ? "none" : "block" }}
        ></div>
        <img
          className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
          src={images[0]}
          alt="Carro"
          onLoad={() => handleImageLoad(id)}
          style={{ display: loadedImages.includes(id) ? "block" : "none" }} />
        <p className="font-bold mt-1 mb-2 px-2">{name}</p>

        <div className="flex flex-col px-2">
          <p className="text-zinc-700 mb-6">Ano {year} | {km} km</p>
          <strong className="text-black font-medium text-xl">R$ {price}</strong>
        </div>

        <div className="w-full h-px bg-slate-200 my-2"></div>

        <div className="px-2 pb-2">
          <p className="text-black">{city}</p>
        </div>
      </section>
    </Link>

  )
}

export default CarCard