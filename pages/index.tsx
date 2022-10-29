import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import PageIntro from '../components/pageIntro'
import AboutSection from "../components/aboutSection"

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
        <PageIntro />
        <AboutSection />
    </main>
  )
}

export default Home
