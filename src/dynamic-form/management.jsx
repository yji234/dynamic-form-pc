import React, { useCallback } from 'react';
import { Button, Table, } from 'antd';
import './Management.css';

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
      render: (text, record) => (
        <Button type="primary">新增动态表单</Button>
      ),
    },
];
const data = [
    {
        key: '1',
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

const Management = () => {
    const newTableItem = useCallback(() => {

    }, [])

    return (
        <div id="management">
            <Button type="primary" id="newButton" onClick={() => newTableItem()}>新建</Button>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
 
export default Management;
  