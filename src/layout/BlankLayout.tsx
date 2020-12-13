import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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
