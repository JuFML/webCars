import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions
}

export const Input = ({ type, placeholder, name, register, error, rules }: InputProps) => {
  return (
    <div>
      <input
        className='w-full border-2 border-gray-300 rounded-md h-11 px-2 outline-none'
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  )
}
