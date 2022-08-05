import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import NavHeader from '../component/NavHeader'
import LoadingSkeleton from '../component/LoadingSkeleton'


export default function Home() {
  const router = useRouter()
  const [alertM, setUAlertm] = useState("");

  useEffect(() => {
    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    let tkey = params.get('key');
    // alert(path)
    tkey = tkey == null ? '' : tkey
    setUAlertm(tkey)
    router.push(`/${tkey}`)

  }, [])
  return (
    <>
      <NavHeader />
      <div className='container' style={{ marginTop: 60 }}>
        <p>page : {alertM}</p>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    </>
  )
}
