import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from './Header/Header';

const Layout = (props) => {
    const {children} = props;
    return (
        <>
        <Header/>
        <div style={{height: '100vh'}}>
            {children}
        </div>
        </>
    );
}

export default Layout;
