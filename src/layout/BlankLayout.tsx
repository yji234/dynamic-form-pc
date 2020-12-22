import React from 'react';
import renderRoutes from '../route/renderRoutes';
import { RouteType } from '../route/index';

const BlankLayout: React.FC<{routes: Array<RouteType>}> = ({
  routes,
}) => {
  return (
    <>
      {
        renderRoutes(routes)
      }
    </>
  );
};

export default BlankLayout;
