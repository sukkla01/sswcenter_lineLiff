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
                            <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{ overflowY: 'scroll !important', height: '100vh !important' }}>
                                <div className="media media-chat">
                                    <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                    <div className="media-body">
                                        <p>Hi</p>

                                    </div>
                                </div>
                                {/* <div className="media media-meta-day">Today</div> */}



                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        <p>Do you have pictures of Matley Marriage?</p>
                                        <p className="meta"><time dateTime={2018}>00:10</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat">
                                    <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                    <div className="media-body">
                                        <p>Hi</p>

                                    </div>
                                </div>
                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        <p>Do you have pictures of Matley Marriage?</p>
                                        <p className="meta"><time dateTime={2018}>00:10</time></p>
                                    </div>
                                </div>

                                <div className="ps-scrollbar-x-rail" style={{ left: 0, bottom: 0 }}><div className="ps-scrollbar-x" tabIndex={0} style={{ left: 0, width: 0 }} /></div><div className="ps-scrollbar-y-rail" style={{ top: 0, height: 0, right: 2 }}><div className="ps-scrollbar-y" tabIndex={0} style={{ top: 0, height: 2 }} />
                                </div>
                            </div>
                            <div className="publisher bt-1 border-light">
                                <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                <input className="publisher-input" type="text" placeholder="Write something" />
                                <span className="publisher-btn file-group">
                                    <i className="fa fa-paperclip file-browser" />
                                    <input type="file" />
                                </span>
                                <a className="publisher-btn" href="#" data-abc="true"><i className="fa fa-smile" /></a>
                                <a className="publisher-btn text-info" href="#" data-abc="true"><i className="fa fa-paper-plane" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Test