import React from 'react'
import { Link } from 'react-router-dom'

export const LeftMenu = () => {
    return (
        <div style={{
            height: 'calc(100vh - 60px)',
            width: 150,
            borderRightWidth: 1,
            borderRightColor: '#a9a9a9',
            borderRightStyle: 'solid',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#00808033'
}}>
            <br></br>
            <br></br>
            <Link style={styles.menuItem} to={'/profile/orders'}>Zamówienia</Link>
            <Link style={styles.menuItem} onClick={() => {localStorage.clear()}} to={'/login'}>Wyloguj</Link>
        </div >
    )
}

const styles = {
    menuItem: {
        padding: 10,
        textDecoration: 'none',
        color: '#000',
        borderBottomWeight: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: 'teal',
       
    }
}