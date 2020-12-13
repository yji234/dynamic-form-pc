import React, { lazy, Suspense } from 'react';
import BlankLayout from '../layout/BlankLayout';

const SuspenseComponent = (Component: React.FC) => (props: JSX.IntrinsicAttributes &{ children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Component {...props} />
  </Suspense>
);

const FormList = lazy(() => import('../dynamic-form/view/FormList'));
const DragDrop = lazy(() => import('../dynamic-form/view/New'));
const CreateFormSetAttr = lazy(() => import('../dynamic-form/view/CreateFormSetAttr'));

export interface RouteType {
  key?: string;
  path: string;
  name?: string,
  exact?: boolean;
  strict?: boolean;
  requiresAuth?: boolean;
  component: React.FC<{routes: any}>;
  routes?: Array<RouteType>;
  redirect?: string;
}

const routes: Array<RouteType> = [
  {
    path: '/form',
    component: BlankLayout,
    routes: [
      {
        path: '/form/list',
        exact: true,
        component: SuspenseComponent(FormList),
      },
      {
        path: '/form/drag-drop',
        exact: true,
        component: SuspenseComponent(DragDrop),
      },
      {
        path: '/form/create-form-set-attr',
        exact: true,
        component: SuspenseComponent(CreateFormSetAttr),
      },
    ],
  },
  // {
  //   path: '*',
  //   redirect: '/result/no-match',
  //   component: SuspenseComponent(NoMatch),
  // },
];
export default routes;
