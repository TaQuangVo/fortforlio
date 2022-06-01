import {FC, ReactNode} from "react"
import ThreeScreen from "../threeScreen"

interface Props {
  children: ReactNode;
}

const Layout:FC<Props> = ({children}) => {
  return (
    <>
      <ThreeScreen />
      {children}
    </>
  )
}

export default Layout