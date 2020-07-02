import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Management from './dynamic-form/Management';

const Index = () => {
    return (
        <Management />
    )
}
 
ReactDOM.render(
    <Index />,
    document.getElementById('root')
);
  