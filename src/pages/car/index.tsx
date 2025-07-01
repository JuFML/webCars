import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { CarProps } from "../home"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { FaWhatsapp } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"



function CarDetail() {
  const { id } = useParams()
  const [car, setCar] = useState<CarProps>()
  const [sliderPerView, setSliderPerView] = useState<number>(2)
  const navigate = useNavigate()


  const fetchCar = () => {
    if (!id) return

    const docRef = doc(db, "cars", id)
    getDoc(docRef)
      .then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/")
        }

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          city: snapshot.data()?.city,
          created: snapshot.data()?.created,
          description: snapshot.data()?.description,
          images: snapshot.data()?.images,
          km: snapshot.data()?.km,
          model: snapshot.data()?.model,
          owner: snapshot.data()?.owner,
          ownerUID: snapshot.data()?.ownerUID,
          price: snapshot.data()?.price,
          whatsapp: snapshot.data()?.whatsapp,
          year: snapshot.data()?.year,

        })
      })
      .catch((error) => console.log("Erro ao pegar dados do carro", error))
  }

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSliderPerView(1)
    } else {
      setSliderPerView(2)
    }
  }

  useEffect(() => {
    if (!id) return

    fetchCar()
  }, [id])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map(image => (
            <SwiperSlide key={image.name}>
              <img src={image?.url} className="w-full h-96 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {car &&
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black"> R$ {car?.price}</h1>
          </div>
          <p>{car?.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição:</strong>
          <p className="mb-4">{car?.description}</p>

          <strong>Telefone/WhatsApp:</strong>
          <p className="mb-4">{car?.whatsapp}</p>

          <a href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá, vi este ${car?.name} no WebCarros e fiquei interessado!`}
            target="_blank"
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer">Conversar com o vendedor
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      }
    </>
  )
}

export default CarDetail
