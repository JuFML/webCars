import { FiUpload } from "react-icons/fi";
import DashboardHeader from "../../components/dashboardHeader";
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().nonempty("O nome do carro é obrigatório"),
  model: z.string().nonempty("O modelo do carro é obrigatório"),
  year: z.string().nonempty("O ano do carro é obrigatório"),
  km: z.string().nonempty("O km do carro é obrigatório"),
  price: z.string().nonempty("O preço do carro é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O WhatsApp é obrigatório").refine((value) => /^(\d{9,12})$/.test(value), {
    message: "Número de telefone inválido"
  }),
  description: z.string().nonempty("A descrição é obrigatória")
})

type FormData = z.infer<typeof schema>


function Dashboard() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-300 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className=" cursor-pointer">
            <input className="cursor-pointer opacity-0 h-32 w-full" type="file" accept="image/*" />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="mb-2 font-medium">Nome do carro</label>
            <Input
              type="text"
              name="name"
              placeholder="Ex: Onix 1.0..."
              register={register}
              error={errors.name?.message} />
          </div>

          <div className="mb-3">
            <label className="mb-2 font-medium">Modelo do carro</label>
            <Input
              type="text"
              name="model"
              placeholder="Ex: 1.0 Flex PLUS MANUAL..."
              register={register}
              error={errors.model?.message} />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-2 font-medium">Ano</label>
              <Input
                type="text"
                name="year"
                placeholder="Ex: 2016/2016..."
                register={register}
                error={errors.year?.message} />
            </div>
            <div className="w-full">
              <label className="mb-2 font-medium">KM rodados</label>
              <Input
                type="text"
                name="km"
                placeholder="Ex: 23.900..."
                register={register}
                error={errors.km?.message} />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-2 font-medium">Telefone/WhatsApp</label>
              <Input
                type="text"
                name="whatsapp"
                placeholder="Ex: 01199101923..."
                register={register}
                error={errors.whatsapp?.message} />
            </div>
            <div className="w-full">
              <label className="mb-2 font-medium">Cidade</label>
              <Input
                type="text"
                name="city"
                placeholder="Ex: Campo Grande..."
                register={register}
                error={errors.city?.message} />
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2 font-medium">Valor em R$</label>
            <Input
              type="text"
              name="price"
              placeholder="Ex: 69.000..."
              register={register}
              error={errors.price?.message} />
          </div>

          <div className="mb-3">
            <label className="mb-2 font-medium">Descrição</label>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2 outline-none border-gray-300"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição completa do carro..."
            />
            {errors.description && <p className="my-1 text-red-500">{errors.description?.message}</p>}
          </div>

          <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10">Cadastrar</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard
