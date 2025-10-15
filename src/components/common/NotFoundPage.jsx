import React from 'react';

const NotFoundPage = () => {
    return (
        <div className='page'>
            <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <h1 style={{fontSize: "45px"}}>404 Not Found</h1>
                <h2> You've might made a mistake, but its okay :)</h2>
                <button className='usual-button' onClick={()=> window.location.href="/"}>Go to main page</button>
            </div>
        </div>
    );
};

export default NotFoundPage;