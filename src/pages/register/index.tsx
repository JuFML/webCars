import { Link } from "react-router"
import logoImg from "../../assets/logo.svg"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email("E-mail inválido").nonempty("O campo email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório"),
})

type FormData = {
  name: string,
  email: string,
  password: string,
}

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logoImg} alt="Logo do site" className="w-full" />
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white max-w-xl w-full rounded-lg mx-auto p-4">
          <div className="mb-3">
            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome completo..."
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email..."
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha..."
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font=medium">Acessar</button>
        </form>

        <Link to="/login"> Já possui uma conta? Faça o login!</Link>
      </div>
    </>
  )
}

export default Register
