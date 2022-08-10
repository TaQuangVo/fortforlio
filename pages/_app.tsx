import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import Layout from "../components/layout"
import { useEffect } from 'react'

//update css variables on change vh 
const updateVh = () => {
    console.log("updating --vh unit, !!!Use useRebounce to reduce the number of updates")
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    updateVh()
    window.addEventListener('resize', updateVh)
    return () => {
        window.removeEventListener('resize', updateVh)
    }
}, [])

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, height=device-height ,initial-scale=1, maximum-scale=5.0, minimum-scale=0.86"></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
