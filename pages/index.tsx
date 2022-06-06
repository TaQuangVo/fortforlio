import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>It's Ta Quang</h1>
      </main>
      <div className={styles.extender}></div>
    </div>
  )
}

export default Home
