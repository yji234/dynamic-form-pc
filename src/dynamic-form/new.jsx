import React, { useCallback } from 'react';
import { Button, Form, Input, Select } from 'antd';
import './New.css';

const baseAttributeList = [
    {
        id: '1001',
        type: 'input',
        name: '单行输入框',
    },
    {
        id: '1002',
        type: 'textarea',
        name: '多行输入框',
    },
    {
        id: '1003',
        type: 'date',
        name: '日期',
    },
    {
        id: '1004',
        type: 'radio',
        name: '单选框',
    },
]

const New = () => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const save = useCallback(() => {

    }, []);

    const preview = useCallback(() => {

    }, []);

    const onFinish = value => {
        console.log(value);
        // TODO:发送value到后端
    }

    const onReset = () => {
        form.resetFields();
    };  
    
    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: "${label}不能为空!",
    };

    // const dragoverHandle = useCallback((ele) => {
    //     ele.ondragover = (event) => {
    //         event.preventDefault();    // 阻止冒泡
    //     }
    // }, []);

    // const ondropHandle = useCallback((ele) => {
    //     ele.ondrop = (event) => {
    //         console.log(event);
    //     }
    // }, []);

    // const onclickHandle = useCallback((ele) => {
    //     ele.onclick = (event) => {
    //         console.log(event);
    //     }
    // } ,[]);

    // const onblurHandle = useCallback((ele) => {
    //     ele.onblur = (event) => {
    //         console.log(event);
    //     }
    // }, []);

    // const controlSetEleOnblurHandle = useCallback((ele) => {
    //     ele.onblur = (event) => {
    //         console.log(event);
    //     } 
    // }, []);

    // const dragDropElements = useCallback((id) => {
    //     const contentEle = document.getElementById(id);
    //     const controlSetEle = document.getElementById('controlSet');
    //     // ondragover
    //     dragoverHandle(contentEle);
    //     // ondrop
    //     ondropHandle(contentEle);
    //     // onclick
    //     onclickHandle(contentEle);
    //     // onblur
    //     onblurHandle(contentEle);
    //     // controlSetEle onblur
    //     controlSetEleOnblurHandle(controlSetEle);
    // }, [dragoverHandle, ondropHandle, onclickHandle, onblurHandle, controlSetEleOnblurHandle]);

    // useEffect(() => {
    //     dragDropElements('content');
    // });

    const dragstartHandle = useCallback((event) => {
        console.log(event.target.id);
        event.dataTransfer.setData("id", event.target.id);
    }, []);

    const dropHandle = useCallback((event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("id");
        event.target.appendChild(document.getElementById(id));
    }, []);

    const dragoveHandle = useCallback((event) => {
        event.preventDefault();
    }, []);

    return (
        <div id="new">
            <div id="saveOrPreview">
                <Button type="primary" onClick={() => save()}>保存</Button>
                <Button onClick={() => preview()}>预览</Button>
            </div>
            <div id="newOuter">
                <div id="controlLibrary">
                    {
                        <>
                            <p className="tip">可以直接拖拽哦</p>
                            {
                                baseAttributeList.length > 0 && baseAttributeList.map((baseAttribute) => {
                                    return (
                                        <Button
                                            id={baseAttribute.id}
                                            key={baseAttribute.id} 
                                            className="baseAttribute" 
                                            draggable="true"
                                            onDragStart={(event) => dragstartHandle(event)}
                                        >{baseAttribute.name}</Button>
                                    )
                                })
                            }
                        </> 
                    }
                </div>
                <div id="mainForm">
                    <div id="content" onDrop={(event) => dropHandle(event)} onDragOver={(event) => dragoveHandle(event)}></div>
                </div>
                <div id="controlSet">
                    <p className="setTitle">设置控件属性</p>
                    <Form form={form} name="dynamicForm" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name="label" label="label" rules={[{ required: true }]}>
                            <Input placeholder="请输入label" />
                        </Form.Item>
                        <Form.Item name="value" label="value" rules={[{ required: true }]}>
                            <Input placeholder="请输入value" />
                        </Form.Item>
                        <Form.Item name="placeHolder" label="placeHolder" rules={[{ required: true }]}>
                            <Input placeholder="请输入placeHolder" />
                        </Form.Item>
                        <Form.Item name="isRequired" label="isRequired" rules={[{ required: true }]}>
                            <Select
                                placeholder="请选择isRequired"
                                allowClear
                            >
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="isDisabled" label="isDisabled" rules={[{ required: true }]}>
                            <Select
                                placeholder="请选择isDisabled"
                                allowClear
                            >
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="maxLength" label="maxLength" rules={[{ required: true }]}>
                            <Input placeholder="请输入maxLength" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">确认</Button>
                            <Button htmlType="button" onClick={onReset}>重置</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
 
export default New;
