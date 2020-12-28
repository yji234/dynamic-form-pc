import React, { FC, useMemo } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FormListParams } from './CreateFormSetAttr';

const { TextArea } = Input;

const Review: FC<{}> = () => {
  const formList = useMemo(() => {
    if(sessionStorage.getItem('forms')) {
      const forms: any = sessionStorage.getItem('forms')
      return JSON.parse(forms)
    }
  }, [])
  console.log(formList);
  const [form] = Form.useForm();

  return (
    <div className="review">
      <Form form={form} name="setAttr">
        {
          formList.map((item: FormListParams) => (
            <div className="dynamic-form-item" key={item.id}>
              {
                item.type === 'Input' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <Input
                      maxLength={item.maxLength || 99999}
                      placeholder={item.placeHolder}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
              {
                item.type === 'TextArea' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <TextArea
                      maxLength={item.maxLength || 99999}
                      placeholder={item.placeHolder}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
              {
                item.type === 'InputNumber' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <InputNumber
                      maxLength={item.maxLength || 99999}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
              {
                item.type === 'Money' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <InputNumber
                      maxLength={item.maxLength || 99999}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
            </div>
          ))
        }
      </Form>
    </div>
  );
};
 
export default Review;
  