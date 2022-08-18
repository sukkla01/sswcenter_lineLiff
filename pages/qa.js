import React, { useEffect, useState } from 'react'
import NavHeader from '../component/NavHeader'
import { Collapse, Input, Typography } from 'antd';
import axios from 'axios'
import config from '../config'

const { Panel } = Collapse;
const { Search } = Input;
const { Paragraph, Text } = Typography;

const text = `คำตอบ :   `;

const BASE_URL = config.BASE_URL
const token = config.token

const Qa = () => {
    const [data, setData] = useState([])
    const [ellipsis, setEllipsis] = useState(true);

    useEffect(() => {
        getTypeUser()

    }, [])

    const getTypeUser = async () => {
        try {
            let res = await axios.get(`${BASE_URL}/get-qa-all`, { headers: { "token": token } })
            setData(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }

    }

    const onSearch = async (value) => {
        try {
            let res = await axios.get(`${BASE_URL}/get-qa-search/${value}`, { headers: { "token": token } })
            setData(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div style={{ textAlign: "left" }}>
            <NavHeader title='ถาม-ตอบ' />
            <div style={{ paddingTop: '15%' }}>
                <div className='main-wrapper' style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, borderRadius: 15 }}>
                    <div style={{ margin: 10 }}>
                        <div style={{ paddingTop: 10, paddingLeft: 5 }}>ถาม-ตอบ (Q&A)</div>
                        <Search placeholder="ค้นหา" onSearch={onSearch} style={{ width: '100%' }} />
                        {data.length > 0 ?
                         
                        <Collapse style={{ marginTop: 10 }} defaultActiveKey={['0']} >
                            {data.map((item, i) => {
                                return <Panel header={ item.qa_question.length > 50 ? 'คำถาม : ' + item.qa_question.substring(0,30) + '. . .' : 'คำถาม : ' + item.qa_question} key={i}>
                                    <div><b>คำถาม :</b><Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'ดูเพิ่ม' } : false}>
                                        {item.qa_question}
                                    </Paragraph></div>
                                    <div><b>คำตอบ  :</b> <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'ดูเพิ่ม' } : false}>
                                        {item.qa_answer}
                                    </Paragraph> </div>
                                </Panel>
                            })}


                        </Collapse> : <div className='text-center' style={{ marginTop : 20 }}>ไม่พบข้อมูล</div>  }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Qa