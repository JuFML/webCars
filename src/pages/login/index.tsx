import { Link } from "react-router"
import logoImg from "../../assets/logo.svg"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
})

type FormData = {
  email: string,
  password: string,
}

function Login() {
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

        <Link to="/register"> Ainda não possui uma conta? Cadastre-se!</Link>
      </div>
    </>
  )
}

export default Login
