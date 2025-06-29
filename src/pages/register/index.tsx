import { Link, useNavigate } from "react-router"
import logoImg from "../../assets/logo.svg"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { auth } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth"


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
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange"
  })
  const navigate = useNavigate()
  const { updateUserInfo } = useContext(AuthContext)

  const onSubmit = (data: FormData) => {
    console.log(data)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("USUARIO REGISTRADO", user.user)
        updateProfile(user.user, { displayName: data.name })
        updateUserInfo({ name: data.name, email: data.email, uid: user.user.uid })
        navigate("/dashboard", { replace: true })
      })
      .catch((err) => console.log("ERRO AO CADASTRAR ESTE USUARIO", err))
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/dashboard", { replace: true })
    } else {
      setLoading(false);
    }
  }, [])

  if (loading) {
    return null
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

          <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font=medium cursor-pointer">Cadastrar</button>
        </form>

        <Link to="/login"> Já possui uma conta? Faça o login!</Link>
      </div>

    </>
  )
}

export default Register
