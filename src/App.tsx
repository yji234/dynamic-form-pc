import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './App.less';
import index from './route/index';
import renderRoutes from './route/renderRoutes';

const App: FC = () => (
  <div className="App">
    <ConfigProvider>
      <BrowserRouter>
        {renderRoutes(index)}
      </BrowserRouter>
    </ConfigProvider>
  </div>
);

export default App;
