import React, { FC, useEffect } from 'react';
import { Form, Input, Radio } from 'antd';

interface SetAttrProps{
  currentSelected: any;
  handleUpdateFormListAttr: (name: string, value: any) => void;
}

const SetAttr: FC<SetAttrProps> = (props) => {
  const {currentSelected, handleUpdateFormListAttr} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('currentSelected', currentSelected);
    if(!currentSelected) {
      return;
    }
    form.setFieldsValue(currentSelected);
  }, [form, currentSelected]);

  return (
    <div
      className="set-attr"
      style={{ width: '400px', height: '800px', background: '#F5F5F5', padding: '20px', marginRight: '10px' }}
    >
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>设置控件属性值</h3>
      <Form form={form} name="setAttr">
        <Form.Item
          name="label"
          label="控件名称"
          rules={[{ required: true, message: '请输入控件名称，不超过15字' }]}
        >
          <Input
            maxLength={15}
            placeholder="请输入控件名称"
            onChange={(e) => handleUpdateFormListAttr('label', e.target.value)}
            disabled={!currentSelected}
          />
        </Form.Item>
        <Form.Item
          name="placeHolder"
          label="提示文字"
          rules={[{ required: true, message: '请输入提示文字，不超过20字' }]}
        >
          <Input
            maxLength={20}
            placeholder="请输入提示文字"
            onChange={(e) => handleUpdateFormListAttr('placeHolder', e.target.value)}
            disabled={!currentSelected}
          />
        </Form.Item>
        <Form.Item
          name="isRequired"
          label="是否必填"
          rules={[{ required: true, message: '请选择是否必填' }]}
        >
          <Radio.Group onChange={(e) => handleUpdateFormListAttr('isRequired', e.target.value)}>
            <Radio.Button value={1} disabled={!currentSelected}>是</Radio.Button>
            <Radio.Button value={0} disabled={!currentSelected}>否</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="isDisabled"
          label="是否禁用"
          rules={[{ required: true, message: '请选择是否禁用' }]}
        >
          <Radio.Group onChange={(e) => handleUpdateFormListAttr('isDisabled', e.target.value)}>
            <Radio.Button value={1} disabled={!currentSelected}>是</Radio.Button>
            <Radio.Button value={0} disabled={!currentSelected}>否</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};
 
export default SetAttr;
  