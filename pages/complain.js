import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import NavHeader from '../component/NavHeader'
import { Button, DatePicker, ConfigProvider, Input, Rate, Select, Upload, Modal, Form } from 'antd';
import { useRouter } from 'next/router'
import * as moment from 'moment';
import 'moment/locale/th';
moment.locale('th')
import th_TH from 'antd/lib/locale/th_TH';
import axios from 'axios'
import config from '../config'
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const BASE_URL = config.BASE_URL
const token = config.token

function Complain() {
    // const router = useRouter()
    const [datatype, setDatatype] = useState([])
    const [profile, setProfile] = useState({})
    const [alertM, setUAlertm] = useState("");
    // const [status, setStatus] = useState("N");
    // const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(
        {
            user_id: '',
            date_service: '',
            dept: '',
            type: '',
            tname: '',
            tel: '',
            rate: 1,
            like_text: '',
            change_text: '',
            ok: false,
            attackFlie: ''
        })
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getTypeUser()
        async function getData() {
            const liff = (await import('@line/liff')).default
            await liff.ready
            const profile = await liff.getProfile()
            setProfile(profile)
            setFormData({ ...formData, user_id: profile.userId })



        }
        getData()

    }, [])

    const getTypeUser = async () => {
        try {
            let res = await axios.get(`${BASE_URL}/get-user-type`, { headers: { "token": token } })
            setDatatype(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }

    }

    //upload file
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const handleChange = async ({ file, fileList }) => {
        // info.file.status
        // console.log(newFileList)
        console.log(fileList)
        setFileList(fileList);

        if (fileList.length > 0) {
            let image_ = await getBase64(file.originFileObj)
            setFormData({ ...formData, attackFlie: image_ })
        } else {

            setFormData({ ...formData, attackFlie: '' })
        }


        //    console.log(image_)
    };

    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewVisible(true);

    };

    const onRemove = () => {
        console.log('xx')
        setFormData({ ...formData, attackFlie: '' })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>เลือกรูปภาพ</div>
            <div>(แนบไฟล์)</div>
        </div>
    );


    const handleFormFinish = (values) => {
        console.log(values)
        // i just want to get simple result:
        // [{ apiVersion: '1.0', data: {...} }]
    }
    // end upload

    const onChangeDate = (date, dateString) => {
        console.log(date, dateString);
        setFormData({ ...formData, date_service: dateString })
    };

    const onChangeType = (value) => {
        console.log(`selected ${value}`);
        setFormData({ ...formData, type: value })

    };
    const submit = async () => {


        Swal.fire({
            title: 'คุณต้องการส่งรายการใช่หรือไม่ ?',
            // text: "คุณจะไม่สามารถย้อนกลับได้หากกดยืนยัน!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ใช่'
        }).then(async (result) => {
            // console.log(profile.username)
            if (result.isConfirmed) {
                setIsLoading(true)
                try {
                    let res = await axios.post(`${BASE_URL}/add-complain`, formData, { headers: { "token": token } })
                    console.log(res.data)
                    let isOK = await Swal.fire(
                        'ส่งเรียบร้อย!',
                        '',
                        'success'
                    )
                    setIsLoading(false)
                    if (isOK.isConfirmed) {
                        console.log(isOK)
                        const liff = (await import('@line/liff')).default
                        await liff.ready
                        liff.closeWindow()
                        await axios.get(`https://sw-center-line.diligentsoftinter.com/rely_m/${formData.user_id}`)
                    }


                } catch (error) {
                    console.log(error)
                    let isOK = await Swal.fire(
                        'ข้อมูลผิดหลาด!',
                        '',
                        'error'
                    )
                }



            }
        })






        // e.preventDefault()
        // console.log(formData)
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








        // }
    }

    const agree = (value) => {
        console.log(value)
        setFormData({ ...formData, ok: value })
    }

    return (
        <div style={{ textAlign: "left" }}>
            <NavHeader title='ร้องเรียน/เสนอแนะ' />
            <div style={{ paddingTop: '18%', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 300, borderRadius: 15 }}>

                    <div className='text-center' style={{ marginTop: 0 }}>
                        {/* <h4 style={{ color: '#3f51b5', paddingTop: 20 }}>ร้องเรียน/เสนอแนะ</h4> */}
                        <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 20 }}><p>ข้อมูลทั่วไป</p></div>
                        <form>
                            <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                                <div className="form-group" style={{ marginTop: 10 }}>
                                    <ConfigProvider locale={th_TH}>
                                        <DatePicker style={{ width: '100%' }} onChange={onChangeDate} size='medium' placeholder='วันที่เกิดเหตุ' />
                                    </ConfigProvider>
                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="หน่วยงานที่พบ" value={formData.dept} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, dept: e.target.value })

                                    }}

                                    />

                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="ชื่อ-สกุล ผู้แจ้ง" value={formData.tname} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, tname: e.target.value })

                                    }}

                                    />

                                </div>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <Input placeholder="เบอร์โทร ผู้แจ้ง" value={formData.tel} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, tel: e.target.value })

                                    }}

                                    />

                                </div>

                                <div className="form-group" style={{ marginTop: 15 }}>
                                    {/* <Input placeholder="ประเภทผู้แสดงความคิดเห็น" value={formData.dept} onChange={e => {
                                        // setIsCode(false)
                                        setFormData({ ...formData, dept: e.target.value })

                                    }}

                                    /> */}
                                    <Select
                                        showSearch
                                        placeholder="ประเภทผู้แสดงความคิดเห็น"
                                        optionFilterProp="children"
                                        onChange={onChangeType}
                                        // onSearch={onSearch}
                                        // filterOption={(input, option) =>
                                        //     (option!.children).toLowerCase().includes(input.toLowerCase())
                                        // }
                                        style={{ width: '100%' }}
                                    >
                                        {datatype.map((item, i) => {

                                            return <Option value={item.id} key={i}>{item.name}</Option>
                                        })}
                                    </Select>

                                </div>


                            </div>
                        </form>
                        {/* <p style={{ color: 'red' }}>{alertM}</p> */}


                    </div>
                </div>


                {console.log(formData.attackFlie)}
                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 200, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 20 }}><p>เรื่องชื่นชม</p></div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <TextArea value={formData.like_text} rows={4} placeholder="กรอกเรื่องชื่นชม" onChange={e => {
                            // setIsCode(false)
                            setFormData({ ...formData, like_text: e.target.value })

                        }} />
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 200, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 20 }}><p>เรื่องที่ท่านต้องการให้ปรับปรุงแก้ไข</p></div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <TextArea value={formData.change_text} rows={4} placeholder="กรอกเรื่องที่ท่านต้องการให้ปรับปรุงแก้ไข" onChange={e => {
                            // setIsCode(false)
                            setFormData({ ...formData, change_text: e.target.value })

                        }} />
                    </div>
                </div>
                <div style={{ textAlign: 'left', backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 100, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 20 }}><p>ระดับความพึงพอใจในภาพรวม</p></div>
                    <Rate count={5} value={formData.rate} style={{ fontSize: 28, marginTop: -15, marginLeft: 20 }} onChange={e => {
                        // setIsCode(false)
                        setFormData({ ...formData, rate: e })

                    }} />
                </div>
                <Form
                    action=''
                    layout="vertical"
                    onFinish={handleFormFinish}
                >
                    <div style={{ textAlign: 'left', backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 120, borderRadius: 15, marginTop: 10 }}>
                        <div className='row'>

                            <div className='col-9'>
                                <div style={{ paddingTop: 10, paddingLeft: 20 }}>
                                    <Upload
                                        // action={dummyRequest}
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        onRemove={onRemove}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </div>
                            </div>

                        </div>



                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel} >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Form>
                <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 150, borderRadius: 15, marginTop: 10 }}>
                    <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 20 }}><p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; หากโรงพยาบาลศรีสังวรสุโขทัย เรียนเชิญท่านเข้าร่วมประชุม/โทรศัพท์ไปเพื่อสอบถามและเสนอแนะแนวทางการแก้ไขปัญหาของโรงพยาบาล</p></div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <div className='row mt-4' >
                            <div className='col-6'>
                                <Button type={formData.ok ? 'primary' : "dashed"} primary block onClick={() => agree(true)}>
                                    ยินดีให้ความร่วมมือ
                                </Button>
                            </div>
                            <div className='col-6'>
                                <Button type={!formData.ok ? 'primary' : "dashed"} danger block onClick={() => agree(false)}>
                                    ไม่ยินดีให้ความร่วมมือ
                                </Button>
                            </div>
                        </div>



                    </div>
                </div>
                {/* {formData.ok ?
                    <div style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, height: 150, borderRadius: 15, marginTop: 10 }}>
                        <div style={{ textAlign: 'left', marginLeft: 20, paddingTop: 20 }}></div>

                    </div> : ''} */}

                <div style={{ marginTop: 30, marginLeft: 10, marginRight: 10, marginBottom: 10 }} >
                    <Button type={profile != {} ? "primary" : "default"} block size={'large'} onClick={submit} loading ={isLoading} >
                        ส่ง
                    </Button>
                </div>
                <div className='row' style={{ marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 100 }} >
                </div>
            </div>
        </div>
    )
}

export default Complain