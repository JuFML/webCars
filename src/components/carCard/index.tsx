

const CarCard = () => {
  return (
    <section className="mx-auto bg-white rounded-lg">
      <img
        className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
        src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202505/20250511/honda-fit-1.5-lx-16v-flex-4p-automatico-wmimagem21243076631.jpg?s=fill&w=552&h=414&q=60"
        alt="Carro" />
      <p className="font-bold mt-1 mb-2 px-2">Honda FIT</p>

      <div className="flex flex-col px-2">
        <p className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</p>
        <strong className="text-black font-medium text-xl">R$ 190.000</strong>
      </div>

      <div className="w-full h-px bg-slate-200 my-2"></div>

      <div className="px-2 pb-2">
        <p className="text-black">Campo Grande - MS</p>
      </div>
    </section>
  )
}

export default CarCard