import React from 'react'
import NavHeader from '../component/NavHeader'
import { Collapse,Input } from 'antd';

const { Panel } = Collapse;
const { Search } = Input;

const text = `คำตอบ :   `;

const Qa = () => {

    const onSearch = (value) =>{
        console.log(value)
    };

    return (
        <div style={{ textAlign: "left" }}>
            <NavHeader title='ถาม-ตอบ' />
            <div style={{ paddingTop: '15%' }}>
                <div className='main-wrapper' style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, borderRadius: 15 }}>
                    <div style={{ margin: 10 }}>
                        <p style={{ paddingTop: 10, paddingLeft: 5 }}>ถาม-ตอบ (Q&A)</p>
                        <Search placeholder="ค้นหา" onSearch={onSearch} style={{ width: '100%' }} />
                        <Collapse   style={{ marginTop:10 }}>
                            <Panel header="คำถามที่ 1" key="1">
                                <p>{text}</p>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="คำถามที่ 2" key="2">
                                <p>{text}</p>
                            </Panel>
                            <Panel header="คำถามที่  3" key="3">
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Qa