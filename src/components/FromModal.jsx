import React, { useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

const FormModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();

  const handleOk = useCallback(() => {
    form.submit();
  }, [form]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setVisible(false);
  }, [form]);

  const onFinish = value => {
    console.log(value);
    // TODO:发送value到后端
    setVisible(false);
  }

  const validateMessages = {
    required: "${label}不能为空!",
  };

  useImperativeHandle(ref, () => ({
    setVisibleFromFather: () => {
      form.resetFields();
      setVisible(true);
    },
  }), [form, setVisible]);

  return (
    <Modal
      title="新建"
      visible={visible}
      closable={false}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} htmlType="submit">
          确认
        </Button>,
      ]}
    >
      <Form form={form} name="dynamicForm" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="formName" label="表单名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="isApproval" label="是否需要审批" rules={[{ required: true }]}>
          <Select
            placeholder="请选择是否需要审批"
            allowClear
          >
            <Option value="1">是</Option>
            <Option value="0">否</Option>
              </Select>
        </Form.Item>
        <Form.Item name="approvalBillType" label="审批单据类型" rules={[{ required: true }]}>
          <Select
            placeholder="请选择审批单据类型"
            allowClear
          >
            <Option value="0">章证照管理</Option>
            <Option value="1">租房福利</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})
 
export default FormModal;
  