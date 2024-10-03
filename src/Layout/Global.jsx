import React from 'react'
import Saidbar from '../Components/Saidbar/Saidbar'
import App from '../App'

export default function Global() {
    return (
        <div className='global_wrapper'>
            <Saidbar />

            <App />
        </div>
    )
}
