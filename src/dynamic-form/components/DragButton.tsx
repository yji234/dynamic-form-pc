import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal, Form, Input, Switch } from 'antd';

interface DragButtonProps{

}

const DragButton: FC<DragButtonProps> = (props) => {
  // const { getFormList, modifyItem } = props;
  console.log('DragButtonProps', props);
  /**
   * id: 控件id
   * type: 控件类型
   * name: 控件名称
  */
  const [buttonList, setButtonList] = useState<any>([
    {
      id: '1',
      type: 'input',
      name: 'Input',
      bgColor: '#D89CF6',
    },
    {
      id: '2',
      type: 'textarea',
      name: 'Textarea',
      bgColor: '#35D0BA',
    },
    {
      id: '3',
      type: 'inputNumber',
      name: 'InputNumber',
      bgColor: '#FFCD3C',
    },
    {
      id: '4',
      type: 'money',
      name: 'Money',
      bgColor: '#916DD5',
    },
    {
      id: '5',
      type: 'radio',
      name: 'Radio',
      bgColor: '#98D6EA',
    },
    {
      id: '6',
      type: 'checkbox',
      name: 'Checkbox',
      bgColor: '#FF9DE2',
    },
    {
      id: '7',
      type: 'date',
      name: 'Date',
      bgColor: '#FFA372',
    },
    {
      id: '8',
      type: 'daterange',
      name: 'Daterange',
      bgColor: '#8BCDCD',
    },
    {
      id: '9',
      type: 'picture',
      name: 'Upload-Picture',
      bgColor: '#3FC5F0',
    },
    {
      id: '10',
      type: 'file',
      name: 'Upload-File',
      bgColor: '#C4AFF0',
    },
    {
      id: '11',
      type: 'remark',
      name: 'Text',
      bgColor: '#A1DE93',
    },
    {
      id: '12',
      type: 'select',
      name: 'Select',
      bgColor: '#3797A4',
    }
  ]);

  const handleDragStart = useCallback((e) => {
    console.log('handleDragStart--', e.target);
  }, []);

  return (
    <div className="drag-button-container" style={{ width: '400px', background: '#7E8A97', padding: "50px 0px" }}>
      {
        buttonList.map((item: any) => (
          <Button
            key={item.id}
            type={item.type}
            style={{ width: '180px', height: '40px', margin: '10px', background: item.bgColor, border: '0px', color: '#ffffff' }}
            className="drag-button"
            draggable="true"
            onDragStart={(e) => handleDragStart(e)}
          >
            {item.name}
          </Button>
        ))
      }
    </div>
  )
}
 
export default DragButton;
  