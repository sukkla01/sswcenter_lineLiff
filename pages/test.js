import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';


// const socket = io(`wss://sw-center-api.diligentsoftinter.com`);

const Test = () => {
    const [count, setCount] = useState(0)
    const [profile, setProfile] = useState({})
    const [socket, setSocket] = useState(io(`https://sw-center-api.diligentsoftinter.com`))
    const [isConnected, setIsConnected] = useState();
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            console.log('connected')
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', (username) => {
            console.log(username)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    })

    const sendSocket = () => {
        console.log('send')
        socket.emit('add-work', 'ict009')
    }
    return (
        <div>
            {count == 1 ? <button onClick={() => setCount(count + 1)}>Click me</button> : ''}
            <p>SubID : {profile.userId}</p>
            { }
            <button onClick={sendSocket}>test</button>
        </div>
    )
}

export default Test