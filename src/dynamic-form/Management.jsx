import React, { useCallback, useRef, useState } from 'react';
import { Button, Table } from 'antd';
import FormModal from '../components/FromModal';
import CanvasMark from '../components/CanvasMark';
import New from './New';
import './Management.css';

const Management = () => {
  const [isShow] = useState(true);
  const modalRef = useRef(null);

  const addDynamicForm = useCallback((key) => {
    console.log(key);
  }, []);

  const columns = [
      {
        title: '表单名称',
        dataIndex: 'formName',
        key: 'formName',
      },
      {
        title: '是否需要审批',
        dataIndex: 'isApproval',
        key: 'isApproval',
      },
      {
        title: '审批单据类型',
        dataIndex: 'approvalBillType',
        key: 'approvalBillType',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <Button
            type="primary"
            onClick={() => {
              addDynamicForm(record.key)
            }}
          >新增动态表单</Button>
        ),
      },
  ];
  const data = [
      {
          key: '1', // 唯一id
          formName: '章证照管理',
          isApproval: 1,
          approvalBillType: 0,
      },
      {
          key: '2',
          formName: '租房福利',
          isApproval: 0,
          approvalBillType: 1,
      },
  ];

  const newTableItem = useCallback(() => {
    modalRef.current.setVisibleFromFather();
  }, []);

  return (
      <div id="management">
        <CanvasMark />
        {
          !isShow &&
          <div>
            <Button type="primary" id="newButton" onClick={() => newTableItem()}>新建</Button>
            <Table columns={columns} dataSource={data} />
            <FormModal ref={modalRef} />
            <New />
          </div>
        }
      </div>
  )
}

export default Management;
