import React from 'react'
import Navbar from '../../../components/Navbar'
import { LeftMenu } from '../../../components/CMS/LeftMenu'

const index = (props) => {
    return (
        <div>
            <Navbar />
            <div style={{display: 'flex'}}>
                <LeftMenu />
                <div style={{width: 'calc(100vw - 160px)'}}>
                {props.children}
                </div>
            </div>
        </div>
    )
}

export default index