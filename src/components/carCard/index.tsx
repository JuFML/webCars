import type { CarProps } from "../../pages/home"
import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"

interface CarCardProps extends CarProps {
  showDeleteIcon?: boolean
}


const CarCard = ({ id, city, images, km, name, price, year, showDeleteIcon = false }: CarCardProps) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => [...prev, id])
  }

  return (
    <section className="mx-auto bg-white rounded-lg relative w-full">
      <div
        className="w-full rounded-lg mb-2 h-72 bg-slate-200"
        style={{ display: loadedImages.includes(id) ? "none" : "block" }}
      ></div>
      {showDeleteIcon &&
        <div
          onClick={() => console.log("deleter carro: ", id)}
          className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 cursor-pointer"
        >
          <FiTrash2 size={26} color="000" />

        </div>
      }
      <img
        className={`w-full rounded-lg mb-2 max-h-72 object-cover ${!showDeleteIcon ? "hover:scale-105 transition-transform" : ""}`}
        src={images[0].url}
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

  )
}

export default CarCard