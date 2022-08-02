import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


export default function Home() {
  const router = useRouter()

  useEffect(() => {

    let path = localStorage.getItem('path')
    if (path == 'test') {
      router.push('/test')
    }
    else if (path == 'myprofile') {
      router.push('/myprofile')
    }
    else {
      router.push('/')
    }
  }, [])
  return (
    <div>
      test index
    </div>
  )
}
