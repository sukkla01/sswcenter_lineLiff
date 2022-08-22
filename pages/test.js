import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import NavHeader from '../component/NavHeader';
import config from '../config'

const BASE_URL = config.BASE_URL

const socket = io(BASE_URL);
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
            {/* <p>Connected: {'' + isConnected}</p>
            <input onChange={e => {
                // setIsCode(false)
                setText(e.target.value)

            }}
            />
            <p>Last pong: {text}</p>
            <button onClick={sendPing}>Send ping</button> */}
            <NavHeader />
            <div className="page-content page-container" id="page-content" >
                <div className="row container d-flex justify-content-center" style={{ paddingTop: 80 }}>
                    <div className="col-md-6">
                        <div className="card card-bordered">
                            <div className="card-header">
                                <h4 className="card-title"><strong>Chat</strong></h4>
                                {/* <a className="btn btn-xs btn-secondary" href="#" data-abc="true">Let's Chat App</a> */}
                            </div>
                            <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{ overflowY: 'scroll !important', height: '400px !important' }}>
                                <div className="media media-chat">
                                    <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                    <div className="media-body">
                                        <p>Hi</p>

                                    </div>
                                </div>
                                {/* <div className="media media-meta-day">Today</div> */}
                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">

                                        <p>Long time no see! Tomorrow office. will be free on sunday.</p>
                                        <p className="meta"><time dateTime={2018}>00:06</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat">
                                    <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                    <div className="media-body">
                                        <p>Okay</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Test