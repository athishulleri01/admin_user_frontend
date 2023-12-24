import React, { Children } from 'react'
import Navbar from '../Navbar/Navbar'
import { Helmet } from 'react-helmet'


const Layout = ({children,title,content}) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={content} />
            </Helmet>
            <Navbar />
            <div className='container '>
                {children}
            </div>
        </>
    )
}

export default Layout

