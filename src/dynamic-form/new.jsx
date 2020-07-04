import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import './New.css';

const baseAttributeList = [
    {
        id: '1',
        type: 'input',
        name: '单行输入框',
    },
    {
        id: '2',
        type: 'textarea',
        name: '多行输入框',
    },
    {
        id: '3',
        type: 'igitalinput',
        name: '数字输入框',
    },
    {
        id: '4',
        type: 'money',
        name: '金额',
    },
    {
        id: '5',
        type: 'radio',
        name: '单选框',
    },
    {
        id: '6',
        type: 'checkbox',
        name: '多选框'
    },
    {
        id: '7',
        type: 'date',
        name: '日期',
    },
    {
            id: '8',
            type: 'daterange',
            name: '日期区间',
    },
    {
        id: '9',
        type: 'picture',
        name: '上传图片',
    },
    {
        id: '10',
        type: 'file',
        name: '上传文件',
    },
    {
        id: '11',
        type: 'remark',
        name: '备注',
    },
    {
        id: '12',
        type: 'refselect',
        name: '参照选择',
    }
];
// 拖拽元素
const newEles = {
    'input': '<div class="target input"><div class="targetLabel">单行输入框</div><div class="targetValue">请输入</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'textarea': '<div class="target textarea" style="height: 80px!important; line-height: 80px!important;"><div class="targetLabel">多行输入框</div><div class="targetValue">请输入</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'igitalinput': '<div class="target igitalinput" draggable="true"><div class="targetLabel">数字输入框</div><div class="targetValue">请输入</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'money': '<div class="target money" draggable="true" style="margin-bottom: 30px!important;"><div class="targetLabel">金额</div><div class="targetValue">请输入</div><div class="closeIcon" name="closeIcon">X</div><div class="hintWord"> 大写: <span>壹仟元整</span></div></div>',
    'radio': '<div class="target radio" draggable="true"><div class="targetLabel">单选框</div><div class="targetValue">请选择</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'checkbox': '<div class="target checkbox" draggable="true"><div class="targetLabel">多选框</div><div class="targetValue">请选择</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'date': '<div class="target datetime" draggable="true"><div class="targetLabel">日期</div><div class="targetValue">请选择</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'daterange': '<div class="target datetimerange startDate" draggable="true" style="margin-bottom: 1px;"><div class="targetLabel">开始日期</div><div class="targetValue">请选择</div><div class="closeIcon" name="closeIcon">X</div></div><div class="target datetimerange stopDate" draggable="true"><div class="targetLabel">结束日期</div><div class="targetValue">请选择</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'picture': '<div class="target image" draggable="true"><div class="targetLabel">上传图片</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'file': '<div class="target file" draggable="true"><div class="targetLabel">上传附件</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'remark': '<div class="target remark" draggable="true"><div class="targetLabel"></div><div class="targetValue">请输入说明文字</div><div class="closeIcon" name="closeIcon">X</div></div>',
    'refselect': '<div class="target refselect" draggable="true"><div class="targetLabel">参照选择</div><div class="targetValue">请选择</div><div class="closeIcon" name="closeIcon">X</div></div>'
};

const New = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [elementType, setElementType] = useState('') ;    // 设置元素属性

    const save = useCallback(() => {

    }, []);

    const preview = useCallback(() => {

    }, []);

    const onFinish = value => {
        console.log(value);
        // TODO:发送value到后端
    }

    // const onReset = () => {
    //     form.resetFields();
    // };  
    
    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: "${label}不能为空!",
    };

    const getId = useCallback(() => {
        return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
    }, []);

    // 根据元素类型获取新建的元素
    const createTrueDropElement = useCallback((elementType) => {
        const appendEle = newEles[elementType];
        // 创建元素并赋值
        const trueDropElement = document.createElement('div');
        trueDropElement.innerHTML = appendEle;
        // 创建的元素设置动态id和拖拽属性
        trueDropElement.setAttribute('id', getId());
        trueDropElement.setAttribute('draggable', true);
        return trueDropElement;
    }, [getId]);

    // 设置控件属性
    const setControlAttribute = useCallback((element) => {
        console.log(element);
        console.log(element.childNodes[0].childNodes);
        let labelElement = element.childNodes[0].childNodes[0];
        let valueElement = element.childNodes[0].childNodes[1];
        console.log(labelElement, valueElement);
        element.onclick = (event) => {
            setElementType(event.toElement.innerHTML);
        }
        let settingsElement = document.querySelectorAll('.settings');
        for(let i = 0; i < settingsElement.length; i++) {
            console.log(settingsElement[i]);
            settingsElement[i].onblur = (event) => {
                switch(i) {
                    case 0:
                        labelElement.innerHTML = event.target.value;
                        break;
                    case 1:
                        valueElement.innerHTML = event.target.value;
                        break; 
                    case 2:
                        console.log(event.target);
                        // let isRequired = event.target
                        // labelElement.className = isRequired ? 'targetLabelRequired' : '';  
                        break;     
                    default:
                        break;    
                }
                
            }
        }
    }, []);


    const dragstartHandle = useCallback((event) => {
        console.log(event.target.id);
        event.dataTransfer.setData("elementType", event.target.id);
    }, []);

    const dropHandle = useCallback((event) => {
        event.preventDefault();
        const elementType = event.dataTransfer.getData("elementType");
        const targetElement = document.getElementById('content');
        // 此时是无效的
        if (elementType === '' || elementType === undefined) {
            console.error('出错了');
            return;
        }
        // 根据元素类型获取新建的元素
        const trueDropElement = createTrueDropElement(elementType);
        // 放置位置
        if(event.target.id && event.target.id === 'content') {
            // 直接添加，追加到最后。
            targetElement.appendChild(trueDropElement);
        } else {
            // 如果不是，则插入在目标元素后面
            const brotherElement = event.target.parentNode.parentNode;
            targetElement.insertBefore(trueDropElement, brotherElement.nextSibling);
        }
        // 设置控件属性
        setControlAttribute(trueDropElement);
    }, [createTrueDropElement, setControlAttribute]);

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
                                            id={baseAttribute.type}
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
                    <p className="setTitle">可以设置<span className="elementType">{elementType}</span>控件属性哦</p>
                    <Form form={form} name="dynamicForm" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name="label" label="label" rules={[{ required: true }]}>
                            <Input placeholder="请输入label" className="settings"/>
                        </Form.Item>
                        {/* <Form.Item name="value" label="value" rules={[{ required: true }]}>
                            <Input placeholder="请输入value" />
                        </Form.Item> */}
                        <Form.Item name="placeHolder" label="placeHolder" rules={[{ required: true }]}>
                            <Input placeholder="请输入placeHolder" className="settings" />
                        </Form.Item>
                        <Form.Item name="isRequired" label="isRequired" rules={[{ required: true }]}>
                            <Select
                                placeholder="请选择isRequired"
                                allowClear
                                className="settings"
                            >
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="isDisabled" label="isDisabled" rules={[{ required: true }]}>
                            <Select
                                placeholder="请选择isDisabled"
                                allowClear
                                className="settings"
                            >
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="maxLength" label="maxLength" rules={[{ required: true }]}>
                            <Input placeholder="请输入maxLength" className="settings" />
                        </Form.Item>
                        {/* <Form.Item>
                            <Button type="primary" htmlType="submit">确认</Button>
                            <Button htmlType="button" onClick={onReset}>重置</Button>
                        </Form.Item> */}
                    </Form>
                </div>
            </div>
        </div>
    )
}
 
export default New;
