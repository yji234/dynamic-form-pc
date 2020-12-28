import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { getDragSource } from '../api/dragdrop';

interface ButtonListParams{
  id: string, 
  name: string,
  bgColor: string,
}

const DragSource: FC<{}> = () => {
  /**
   * id: 控件id
   * type: 控件类型
   * name: 控件名称
  */
  const [buttonList, setButtonList] = useState<ButtonListParams[]>([
    // {
    //   id: '1', 
    //   name: 'Input',
    //   bgColor: '#D89CF6',
    // },
    // {
    //   id: '2',
    //   name: 'TextArea',
    //   bgColor: '#35D0BA',
    // },
    // {
    //   id: '3',
    //   name: 'InputNumber',
    //   bgColor: '#FFCD3C',
    // },
    // {
    //   id: '4',
    //   name: 'Money',
    //   bgColor: '#916DD5',
    // },
    // {
    //   id: '5',
    //   name: 'Radio',
    //   bgColor: '#98D6EA',
    // },
    // {
    //   id: '6',
    //   name: 'Checkbox',
    //   bgColor: '#FF9DE2',
    // },
    // {
    //   id: '7',
    //   name: 'Date',
    //   bgColor: '#FFA372',
    // },
    // {
    //   id: '8',
    //   name: 'Daterange',
    //   bgColor: '#8BCDCD',
    // },
    // {
    //   id: '9',
    //   name: 'Upload-Picture',
    //   bgColor: '#3FC5F0',
    // },
    // {
    //   id: '10',
    //   name: 'Upload-File',
    //   bgColor: '#C4AFF0',
    // },
    // {
    //   id: '11',
    //   name: 'Remark',
    //   bgColor: '#A1DE93',
    // },
    // {
    //   id: '12',
    //   name: 'Select',
    //   bgColor: '#3797A4',
    // },
  ]);

  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('elementType',e.target.name);
  }, []);

  // const handleAddSource = useCallback(() => {
  //   buttonList.forEach((item) => {
  //     addDragSource(item).then((res) => {
  //       console.log(res);
  //     })
  //   });
  // }, []);

  const handleGetDragSource = useCallback(() => {
    getDragSource().then((res) => {
      const result: any = res.data;
      setButtonList([...result]);
    });
  }, [])

  useEffect(() => {
    handleGetDragSource();
  }, []);

  return (
    <div
      className="drag-source"
      style={{ width: '400px', background: '#F5F5F5', padding: '20px', marginRight: '10px' }}
    >
      <h3 style={{ textAlign: 'center' }}>可拖拽控件</h3>
      {/* <Button onClick={handleAddSource}>Add</Button> */}
      {
        buttonList.map((item: any) => (
          <Button
            key={item._id}
            id={item._id}  // 拖拽的时候需要
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
  );
};
 
export default DragSource;
  