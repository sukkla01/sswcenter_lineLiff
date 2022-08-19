import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';


const socket = io(`https://sw-center-api.diligentsoftinter.com`);
const i = 1
const Test = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [text, setText] = useState('');


    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('message', (data) => {
            setText(data);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        socket.emit('message', text);
    }


    return (
        <div>
            <p>Connected: {'' + isConnected}</p>
            <input onChange={e => {
                // setIsCode(false)
                setText(e.target.value)

            }}
            />
            <p>Last pong: {text}</p>
            <button onClick={sendPing}>Send ping</button>
        </div>
    )
}

export default Test