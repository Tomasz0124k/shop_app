import React from 'react'
import Navbar from '../../../components/Navbar'
import { LeftMenu } from '../../../components/UserProfile/LeftMenu'

const index = (props) => {
    return (
        <div>
            <Navbar color={'#008080'} />
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