import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

function MyApp({ Component, pageProps }) {


  useEffect(() => {
    const fetchData = async () => {
      const liff = (await import('@line/liff')).default

      try {
        await liff.init({ liffId })
      }
      catch (error) {
        console.error('liff error', error.message)
      }

      if (!liff.isLoggedIn()) {
        let path  = localStorage.getItem('path')
        
        liff.login({ redirectUri : `https://queue.diligentsoftinter.com/${path}` })
        

        
      }
    }
    fetchData()
  }, [])
  
  return <Component {...pageProps} />
}

export default MyApp
