import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    let tkey = params.get('key');
    // alert(path)
    tkey  =  tkey == null ? '': tkey
    router.push(`/${tkey}`)

  }, [])
  return (
    <div>
      test index
    </div>
  )
}
