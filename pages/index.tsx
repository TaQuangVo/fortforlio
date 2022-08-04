import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import PageIntro from '../components/pageIntro'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div id="page-intro" className={styles.intro}>
          <PageIntro />
        </div>
      </main>
      
    </div>
  )
}

export default Home
