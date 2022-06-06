import {FC, ReactNode} from "react"
import ThreeScreen from "../threeScreen"
import styles from "./styles.module.css"

interface Props {
  children: ReactNode;
}

const Layout:FC<Props> = ({children}) => {
  return (
    <div id={"appContainer"} className={styles.appContainer}>
      <ThreeScreen />
      <div className={styles.appScroller}>
        {children}  
      </div>
    </div>
  )
}

export default Layout