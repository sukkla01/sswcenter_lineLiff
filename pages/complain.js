import React, { useEffect, useState } from 'react'
import NavHeader from '../component/NavHeader'
import { Button, DatePicker, ConfigProvider, Input, Rate } from 'antd';
import { useRouter } from 'next/router'
import * as moment from 'moment';
import 'moment/locale/th';
moment.locale('th')
import th_TH from 'antd/lib/locale/th_TH';

import axios from 'axios'
import config from '../config'

const { TextArea } = Input;

function Complain() {
    // const router = useRouter()
    // const [count, setCount] = useState(0)
    const [profile, setProfile] = useState({})
    const [alertM, setUAlertm] = useState("");
    // const [status, setStatus] = useState("N");
    // const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(
        {
            dept: '',
            tel: '',
            rate: 1,
            like_text: ''
        })


    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const submit = async () => {
        // e.preventDefault()

        // let data = {
        //     cid: formData.cid,
        //     tel: formData.tel,
        //     userId: profile.userId,
        //     line_name: profile.displayName,
        //     picture: profile.pictureUrl
        // }
        // if (formData.cid == '' || formData.tel == '' || Object.keys(profile).length == 0) {
        //     setUAlertm('กรุณากรอกข้อมูลให้ครบ')
        // } else {

        //     try {
        //         let res = await axios.get(`${BASE_URL}/get-hn/${formData.cid}`, { headers: { "token": token } })
        //         if (res.data.length == 0) {
        //             setUAlertm('คุณยังไม่เคยมาโรงพยาบาลกรุณาติดต่อห้องบัตร')
        //         } else {
        //             try {
        //                 let res = await axios.post(`${BASE_URL}/add-register`, data, { headers: { "token": token } })
        //                 console.log(res.data)
        //                 router.push('/success')
        //             } catch (error) {
        //                 alert(error)
        //             }
        //         }
        //     } catch (error) {
        //         alert(error)
        //     }







        // }
    }


    return (
        <div style={{ textAlign: "center" }}>
            <NavHeader title='ร้องเรียน/เสนอแนะ' />
            <div style={{ paddingTop: '20%', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 350, borderRadius: 15 }}>

                    <div className='text-center' style={{ marginTop: 0 }}>
                        {/* <h4 style={{ color: '#3f51b5', paddingTop: 20 }}>ร้องเรียน/เสนอแนะ</h4> */}
                        <div style={{ textAlign: 'left', marginLeft: 20,paddingTop:10 }}><p>ข้อมูลทั่วไป</p></div>
                        <form>
                            <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                                <div className="form-group" style={{ marginTop: 10 }}>
                                    <ConfigProvider locale={th_TH}>
                                        <DatePicker style={{ width: '100%' }} onChange={onChange} size='medium' placeholder='วันที่เกิดเหตุ' />
                                    </ConfigProvider>
                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="หน่วยงาน" value={formData.dept} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, dept: e.target.value })

                                    }}

                                    />

                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="ประเภทผู้แสดงความคิดเห็น" value={formData.dept} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, dept: e.target.value })

                                    }}

                                    />

                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="ชื่อ-สกุล" value={formData.dept} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, dept: e.target.value })

                                    }}

                                    />

                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="เบอร์โทร" value={formData.dept} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, dept: e.target.value })

                                    }}

                                    />

                                </div>

                            </div>
                        </form>
                        <p style={{ color: 'red' }}>{alertM}</p>


                    </div>
                </div>

                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 100, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 10 }}><p>ระดับความพึงพอใจในภาพรวม</p></div>
                    <Rate count={5} value={formData.rate} style={{ fontSize: 28 }} onChange={e => {
                        // setIsCode(false)
                        setFormData({ ...formData, rate: e })

                    }} />
                </div>

                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 200, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 10 }}><p>เรื่องชื่นชม</p></div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 200, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 10 }}><p>เรื่องที่ท่านต้องการให้ปรับปรุงแก้ไข</p></div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                    </div>
                </div>

                <div style={{ marginTop: 50, marginLeft: 20, marginRight: 20, marginBottom: 100 }} >
                    <Button type={profile != {} ? "primary" : "default"} shape="round" block size={'large'} onClick={submit} >
                        ส่ง
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Complain