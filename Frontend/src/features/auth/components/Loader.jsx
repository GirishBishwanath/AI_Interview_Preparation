import React from 'react'
import "./loader.scss"

const Loader = ({ message = "Loading..." }) => {
    return (
        <main className="loader-screen">
            <div className="spinner" />
            <h1>{message}</h1>
        </main>
    )
}

export default Loader