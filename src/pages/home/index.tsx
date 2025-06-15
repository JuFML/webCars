import CarCard from "../../components/carCard"

function Home() {

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
        <CarCard />
      </main>
    </>
  )
}

export default Home
