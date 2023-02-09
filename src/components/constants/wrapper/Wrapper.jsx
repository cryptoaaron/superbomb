import React from 'react';
import Dashboard from '../../pages/dashboard/Dashboard';
import './Wrapper.css';
import './Responsive.css';
import Gradient from '../gradient/Gradient';

const Wrapper = () => {
    return (
        <>
            <Gradient />
            <div className='layout-wrapper'>
                <Dashboard />
            </div>
        </>

    )
}

export default Wrapper
