import React, { useEffect, useState } from 'react'

const Test = () => {
    const [count, setCount] = useState(0)
    const [profile, setProfile] = useState({})
    useEffect(() => {
        console.log('1234')
        localStorage.setItem('path', 'test');
        async function getData() {
            const liff = (await import('@line/liff')).default
            await liff.ready
            const profile = await liff.getProfile()
            setProfile(profile)
        }

        getData()
    })

    return (
        <div>
            {count == 1 ? <button onClick={() => setCount(count + 1)}>Click me</button> : ''}
            <p>SubID : {profile.userId}</p>
            {}
            
        </div>
    )
}

export default Test