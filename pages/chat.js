import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import NavHeader from '../component/NavHeader';
import axios from 'axios'
import config from '../config'
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';
import ReactLoading from 'react-loading';

const BASE_URL = config.BASE_URL
const token = config.token
const socket = io(BASE_URL);
const i = 1



const Chat = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [isLoading, setIsLoading] = useState(true);
    const [lastPong, setLastPong] = useState(null);
    const [text, setText] = useState('');
    const [userId, setUserId] = useState('');
    const [detail, setDetail] = useState('');
    const [data, setData] = useState([])
    const [profile, setProfile] = useState({})



    useEffect(() => {


        async function getData() {
            const liff = (await import('@line/liff')).default
            await liff.ready
            const profile = await liff.getProfile()
            setProfile(profile)
            setUserId(profile.userId)
            getChat(profile.userId)



        }
        getData()

        // getChat(userId)


        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on(userId, (data) => {
            getChat(userId)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const getChat = async (user_id) => {
        try {
            let res = await axios.get(`${BASE_URL}/get-chat/${user_id}`, { headers: { "token": token } })
            setData(res.data)
            setIsLoading(false)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }

    }


    const onSend = async () => {
        let post = {
            user_id: userId,
            detail: detail,
            staff: userId,
            image: profile.pictureUrl,
            name : profile.displayName
        }
        try {
            let res = await axios.post(`${BASE_URL}/add-chat`, post, { headers: { "token": token } })
            // setData(res.data)
            getChat(userId)
            socket.emit('message',{user_id :  userId,type : 'client'} )
            setDetail('')
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }

    }

    const sendPing = () => {

        socket.emit('message', userId);
    }
    return (
        <div className="h-100 ">
            <div className="justify-content-center h-100">

                <div className="card">
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight">
                            <div className="img_cont">
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                                <span className="online_icon" />
                            </div>
                            <div className="user_info">
                                <span>ผู้ดูแลระบบ</span>
                                {/* <p>1767 Messages</p> */}
                            </div>
                           
                        </div>
                       
                    </div>
                    <div className="card-body msg_card_body">

                        {isLoading ? 
                        <div className="d-flex justify-content-center">
                            <ReactLoading type='spinningBubbles' color='#ffffff' height={'10%'} width={'10%'} />
                        </div> : <div></div> }



                        {data.map((item, i) => {
                            let type_class = item.type == 'admin' ?
                                <div className='d-flex justify-content-start mb-4' key={i}>
                                    <div className="img_cont_msg">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                    </div>
                                    <div className="msg_cotainer">
                                        {item.detail}
                                        {/* <span className="msg_time">2022-08-24 10:05:47</span> */}
                                    </div>
                                </div> :

                                <div className="d-flex justify-content-end mb-4" key={i}>
                                    <div className="msg_cotainer_send">
                                        {item.detail}
                                        {/* <span className="msg_time_send">2022-08-24 10:05:47</span> */}
                                    </div>
                                    <div className="img_cont_msg">
                                        <img src={item.image} className="rounded-circle user_img_msg" width={20} height={20} />
                                    </div>
                                </div>

                            return type_class
                        })}



                        {/* <div className="d-flex justify-content-end mb-4">
                            <div className="msg_cotainer_send">
                                Hi Khalid i am good tnx how about you?
                                <span className="msg_time_send">8:55 AM, Today</span>
                            </div>
                            <div className="img_cont_msg">
                                <img src={BASE_URL + '/user.png'} className="rounded-circle user_img_msg" width={20} height={20} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-start mb-4">
                            <div className="img_cont_msg">
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                            </div>
                            <div className="msg_cotainer">
                                I am good too, thank you for your chat template
                                <span className="msg_time">9:00 AM, Today</span>
                            </div>
                        </div> */}

                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            {/* <div className="input-group-append">
                            <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
                        </div> */}
                            <input className="form-control type_msg" placeholder="พิมพ์ข้อความ..."
                                value={detail} onChange={e => {
                                    // setIsCode(false)
                                    setDetail(e.target.value)

                                }}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text send_btn"><SendOutlined onClick={onSend} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat