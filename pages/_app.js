import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react'
import 'antd/dist/antd.css';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

function MyApp({ Component, pageProps }) {


  useEffect(() => {
    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    const tkey = params.get('key');

    // alert(tkey)
    const fetchData = async () => {
      const liff = (await import('@line/liff')).default

      try {
        await liff.init({ liffId })
      }
      catch (error) {
        console.error('liff error', error.message)
      }

      if (!liff.isLoggedIn()) {
        tkey  =  tkey == null ? '': tkey
        // alert(tkey)
        // liff.login({ redirectUri : `https://sswcenter-line-liff.diligentsoftinter.com/${tkey}` })

      }
    }
    fetchData()
  }, [])
  
  return <Component {...pageProps} />
}

export default MyApp
