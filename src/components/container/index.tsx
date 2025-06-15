import type { ReactNode } from "react"


const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-7xl px-4 mx-auto">
      {children}
    </div>
  )
}

export default Container