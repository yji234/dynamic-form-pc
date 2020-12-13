import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './CreateFormSetAttr.css';

interface buttonListParams{
  id: string, 
  name: string,
  bgColor: string,
}

interface formListParams{
  id: string,
  type: string,
  label: string,
  placeHolder?: string,
  isRequired?: boolean,
  isDisabled?: boolean,
}

const CreateFormSetAttr: FC<{}> = () => {
  /**
   * id: 控件id
   * type: 控件类型
   * name: 控件名称
  */
  const [buttonList, setButtonList] = useState<buttonListParams[]>([
    {
      id: '1', 
      name: 'Input',
      bgColor: '#D89CF6',
    },
    {
      id: '2',
      name: 'Textarea',
      bgColor: '#35D0BA',
    },
    {
      id: '3',
      name: 'InputNumber',
      bgColor: '#FFCD3C',
    },
    {
      id: '4',
      name: 'Money',
      bgColor: '#916DD5',
    },
    {
      id: '5',
      name: 'Radio',
      bgColor: '#98D6EA',
    },
    {
      id: '6',
      name: 'Checkbox',
      bgColor: '#FF9DE2',
    },
    {
      id: '7',
      name: 'Date',
      bgColor: '#FFA372',
    },
    {
      id: '8',
      name: 'Daterange',
      bgColor: '#8BCDCD',
    },
    {
      id: '9',
      name: 'Upload-Picture',
      bgColor: '#3FC5F0',
    },
    {
      id: '10',
      name: 'Upload-File',
      bgColor: '#C4AFF0',
    },
    {
      id: '11',
      name: 'Remark',
      bgColor: '#A1DE93',
    },
    {
      id: '12',
      name: 'Select',
      bgColor: '#3797A4',
    }
  ]);
  /**
   * 生成表单元素
   * id: 控件id
   * type: 控件类型
   * label: 控件label
   * placeHolder: 控件placeHolder
   * isRequired: 设置控件是否必填
   * isDisabled: 设置控件是否禁用
   * 
  */
  const [formList, setFormList] = useState<formListParams[]>([]);

  const [form] = Form.useForm();

  const handleDragStart = useCallback((e) => {
    // console.log('handleDragStart', e.target);
    // console.log('handleDragStart', e.target.id);
    // console.log('handleDragStart', e.target.name);
    e.dataTransfer.setData("elementType",e.target.name);
  }, []);

  const handleDrop = useCallback((e) => {
    console.log('handleDrop--', e.target);
    e.preventDefault();
    const elementType: string = e.dataTransfer.getData("elementType");
    const element = {
      id: uuidv4(),
      type: elementType,
      label: elementType,
      placeHolder: 'Please do something...',
      isRequired: false,
      isDisabled: false,
    };
    console.log('formList', formList);
    setFormList([
      ...formList,
      element,
    ]);
  }, [formList]);

  const handleDragOver = useCallback((e) => {
    // console.log('handleDragOver--', e.target);
    e.preventDefault();
  }, []);

  const handleDelete = useCallback((list: formListParams[], id: string) => {
    console.log(list);
    console.log('handleDelete', id);
    const newFormList = list.filter((item) => {
      return item.id !== id;
    });
    console.log(newFormList);
    setFormList([...newFormList]);
  }, []);

  return (
    <div 
      className="create-form-set-attr" 
      style={{ padding: '20px', display: 'flex', justifyContent: 'center'}}
    >
      <div
        className="drag-source"
        style={{ width: '400px', background: '#7E8A97', padding: "20px", marginRight: '10px' }}
      >
        <h3 style={{ textAlign: 'center' }}>可拖拽控件</h3>
        {
          buttonList.map((item: any) => (
            <Button
              key={item.id}
              id={item.id}  // 拖拽的时候需要
              name={item.name}
              style={{ width: '160px', height: '40px', margin: '10px', background: item.bgColor, border: '0px', color: '#ffffff' }}
              className="drag-button"
              draggable="true"
              onDragStart={handleDragStart}
            >
              {item.name}
            </Button>
          ))
        }
      </div>
      <div
        className="drag-target"
        style={{ width: '400px', height: '800px', background: '#3B6978', padding: "20px", marginRight: '10px' }}
      >
        <h3 style={{ marginBottom: "10px", textAlign: 'center' }}>拖拽生成表单</h3>
        <div
          style={{
            height: '740px',
            background: '#4E89AE',
            overflowY: 'hidden'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {
            formList.map((item: formListParams) => (
              <div
                key={item.id}
                className="targetItem"
                style={{ 
                  width: '100%',
                  height: '40px',
                  background: item.isDisabled ? '#f5f5f5' : '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  cursor: item.isDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                <div
                  className={item.isRequired ? 'label isRequired' : 'label'}
                  style={{
                    width: '120px',
                    height: '40px',
                    // background: '#F39233',
                    borderRight: '1px solid #d9d9d9',
                    // lineHeight: '40px',
                    paddingRight: '2px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                </div>
                <div
                  className="placeHolder"
                  style={{
                    width: '220px',
                    height: '40px',
                    // background: '#916DD5',
                    color: '#d9d9d9',
                    // lineHeight: '40px',
                    paddingLeft: '2px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {item.placeHolder}
                </div>
                <div
                  className="delete"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#ff4d4f',
                    textAlign: 'center',
                    lineHeight: '40px',
                    borderRadius: '5px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                  onClick={() => handleDelete(formList, item.id)}
                >
                  X
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div
        className="set-attr"
        style={{ width: '400px', height: '800px', background: '#8675A9', padding: '20px' }}
      >
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>设置控件属性值</h3>
        <Form form={form} name="setAttr">
          <Form.Item
            name="name"
            label="控件名称"
            rules={[{ required: true, message: '请输入控件名称，不超过15字' }]}
          >
            <Input maxLength={15} placeholder="请输入控件名称" />
          </Form.Item>
          <Form.Item
            name="placeHolder"
            label="提示文字"
            rules={[{ required: true, message: '请输入提示文字，不超过20字' }]}
          >
            <Input maxLength={20} placeholder="请输入提示文字" />
          </Form.Item>
          <Form.Item
            name="isRequired"
            label="是否必填"
            rules={[{ required: true, message: '请选择是否必填' }]}
          >
            <Radio.Group>
              <Radio.Button value="1">是</Radio.Button>
              <Radio.Button value="0">否</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="isDisabled"
            label="是否禁用"
            rules={[{ required: true, message: '请选择是否禁用' }]}
          >
            <Radio.Group>
              <Radio.Button value="1">是</Radio.Button>
              <Radio.Button value="0">否</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
 
export default CreateFormSetAttr;
  