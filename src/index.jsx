import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Index = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <h2>{count}</h2>
            <button type="button" onClick={() => {
                setCount(count+1)
            }}>setCount</button> 
        </>
    )
}
 
ReactDOM.render(
    <Index />,
    document.getElementById('root')
);
  