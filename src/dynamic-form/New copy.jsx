import React, { useCallback, useState } from 'react';
import { Button, Form } from 'antd';
import './New.css';

const baseAttributeList = [
    {
        id: '1',
        type: 'input',
        name: '单行输入框',
        list: [
            {
                id: "1",
                ruleName: "标题",
                ruleValue: "label",
                ruleType: "text",
                defaultValue: "",
                placeHolder: '请输入',
                topTip: "最多20字",
                bottomTip: "",
                checkboxLabel: '',
            },
            {
                id: '2',
                ruleName: '提示文字',
                ruleValue: 'placeHolder',
                ruleType: 'text',
                defaultValue: '',
                placeHolder: '请输入',
                topTip: '最多50字',
                bottomTip: '内容最多可填写1000字',
                checkboxLabel: ''
            },
            {
                id: '3',
                ruleName: '必填',
                ruleValue: 'isRequired',
                ruleType: 'checkbox',
                defaultValue: '',
                placeHolder: '',
                topTip: '',
                bottomTip: '',
                checkboxLabel: '是否必填'
            },
            {
                id: '4',
                ruleName: '禁用',
                ruleValue: 'isDiabled',
                ruleType: 'checkbox',
                defaultValue: '',
                placeHolder: '',
                topTip: '',
                bottomTip: '',
                checkboxLabel: '是否禁用'
            },
            {
                id: '5',
                ruleName: '打印',
                ruleValue: 'isPrint',
                ruleType: 'checkbox',
                defaultValue: '',
                placeHolder: '',
                topTip: '如不勾选，打印时不显示该项',
                bottomTip: '',
                checkboxLabel: '参与打印'
            },
        ],
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
const trueDropElementChild = {
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
// 控件属性，中间和右边连接点
// const elementAttribute = {
//     'input': [
//         {
//             id: "1",
//             ruleName: "标题",
//             ruleValue: "label",
//             ruleType: "text",
//             defaultValue: "",
//             placeHolder: '请输入',
//             topTip: "最多20字",
//             bottomTip: "",
//             checkboxLabel: '',
//         },
//         {
//             id: '2',
//             ruleName: '提示文字',
//             ruleValue: 'placeHolder',
//             ruleType: 'text',
//             defaultValue: '',
//             placeHolder: '请输入',
//             topTip: '最多50字',
//             bottomTip: '内容最多可填写1000字',
//             checkboxLabel: ''
//         },
//         {
//             id: '3',
//             ruleName: '必填',
//             ruleValue: 'isRequired',
//             ruleType: 'checkbox',
//             defaultValue: '',
//             placeHolder: '',
//             topTip: '',
//             bottomTip: '',
//             checkboxLabel: '是否必填'
//         },
//         {
//             id: '4',
//             ruleName: '禁用',
//             ruleValue: 'isDiabled',
//             ruleType: 'checkbox',
//             defaultValue: '',
//             placeHolder: '',
//             topTip: '',
//             bottomTip: '',
//             checkboxLabel: '是否禁用'
//         },
//         {
//             id: '5',
//             ruleName: '打印',
//             ruleValue: 'isPrint',
//             ruleType: 'checkbox',
//             defaultValue: '',
//             placeHolder: '',
//             topTip: '如不勾选，打印时不显示该项',
//             bottomTip: '',
//             checkboxLabel: '参与打印'
//         },
//     ],
//     // 'textarea': {
//     //     'name': 'textarea',
//     //     'proList': [
//     //         {
//     //             'ruleId': 'bc84a4336af64ef5b64e2431276fba51',
//     //             'ruleName': '标题',
//     //             'ruleValue': 'labelName',
//     //             'ruleType': 'text',
//     //             'defaultValue': '多行输入框',
//     //             'placeHolder': '请输入标题',
//     //             'topTip': '最多20字',
//     //             'bottomTip': '',
//     //             'checkboxLabel': ''
//     //         },
//     //         {
//     //             'ruleId': 'bc84a4336af64ef5b64e2431276fba52',
//     //             'ruleName': '提示文字',
//     //             'ruleValue': 'promptWords',
//     //             'ruleType': 'text',
//     //             'defaultValue': '请输入',
//     //             'placeHolder': '请输入提示文字',
//     //             'topTip': '最多50字',
//     //             'bottomTip': '内容最多可填写8000字',
//     //             'checkboxLabel': ''
//     //         },
//     //         {
//     //             'ruleId': 'bc84a4336af64ef5b64e2431276fba53',
//     //             'ruleName': '验证',
//     //             'ruleValue': 'verify',
//     //             'ruleType': 'checkbox',
//     //             'defaultValue': '',
//     //             'placeHolder': '',
//     //             'topTip': '',
//     //             'bottomTip': '',
//     //             'checkboxLabel': '(必填)'
//     //         },
//     //         {
//     //             'ruleId': 'bc84a4336af64ef5b64e2431276fba54',
//     //             'ruleName': '打印',
//     //             'ruleValue': 'print',
//     //             'ruleType': 'checkbox',
//     //             'defaultValue': '',
//     //             'placeHolder': '',
//     //             'topTip': '',
//     //             'bottomTip': '',
//     //             'checkboxLabel': '参与打印(如不勾选，打印时不显示该项)'
//     //         },
//     //     ]
//     // },
//     // 'date': {
//     //     'name': 'date',
//     //     'proList': [
//     //         {
//     //             checkboxLabel: null,
//     //             defaultValue: "",
//     //             bottomTip: "",
//     //             topTip: "",
//     //             id: "2e62fb45cc314d25b065f07d4cc29003",
//     //             options: [
//     //                 {
//     //                     checkboxLabel: '年-月-日 时:分',
//     //                     ruleType: 'radio'
//     //                 },
//     //                 {
//     //                     checkboxLabel: '年-月-日',
//     //                     ruleType: 'radio'
//     //                 }
//     //             ],
//     //             optionOne: "",
//     //             optionTwo: "",
//     //             optionThree: "",
//     //             ruleName: "日期类型",
//     //             ruleType: "radio",
//     //             ruleValue: "dats",
//     //             showCount: null
//     //         }
//     //     ]
//     // },
//     // 'radio': {
//     //     'name': 'radio',
//     //     'proList': [
//     //         {
//     //             checkboxLabel: null,
//     //             defaultValue: "",
//     //             bottomTip: "",
//     //             topTip: "最多200项，每项最多50字",
//     //             id: "2e62fb45cc314d25b065f07d4cc29006",
//     //             options: [
//     //                 {
//     //                     ruleType: 'input',
//     //                     defaultValue: '选项一',
//     //                     labelName: 'optionOne'
//     //                 },
//     //                 {
//     //                     ruleType: 'input',
//     //                     defaultValue: '选项二',
//     //                     labelName: 'optionTwo'
//     //                 },
//     //                 {
//     //                     ruleType: 'input',
//     //                     defaultValue: '选项三',
//     //                     labelName: 'optionThree'
//     //                 }
//     //             ],
//     //             optionOne: "",
//     //             optionTwo: "",
//     //             optionThree: "",
//     //             ruleName: "选项",
//     //             ruleType: "radio",
//     //             ruleValue: "select",
//     //             showCount: null
//     //         }
//     //     ]
//     // }
// };
// 控件属性列表
let attributeList = [
    {
        id: "1",
        ruleName: "标题",
        ruleValue: "label",
        ruleType: "text",
        defaultValue: "",
        placeHolder: '请输入',
        topTip: "最多20字",
        bottomTip: "",
        checkboxLabel: '',
    },
    {
        id: '2',
        ruleName: '提示文字',
        ruleValue: 'placeHolder',
        ruleType: 'text',
        defaultValue: '',
        placeHolder: '请输入',
        topTip: '最多50字',
        bottomTip: '内容最多可填写1000字',
        checkboxLabel: ''
    },
    {
        id: '3',
        ruleName: '必填',
        ruleValue: 'isRequired',
        ruleType: 'checkbox',
        defaultValue: '',
        placeHolder: '',
        topTip: '',
        bottomTip: '',
        checkboxLabel: '是否必填'
    },
    {
        id: '4',
        ruleName: '禁用',
        ruleValue: 'isDiabled',
        ruleType: 'checkbox',
        defaultValue: '',
        placeHolder: '',
        topTip: '',
        bottomTip: '',
        checkboxLabel: '是否禁用'
    },
    {
        id: '5',
        ruleName: '打印',
        ruleValue: 'isPrint',
        ruleType: 'checkbox',
        defaultValue: '',
        placeHolder: '',
        topTip: '如不勾选，打印时不显示该项',
        bottomTip: '',
        checkboxLabel: '参与打印'
    },
]

const New = () => {
    const [form] = Form.useForm();
    // const { Option } = Select;
    const [elementTypeText, setElementTypeText] = useState('') ;    // 设置元素属性
    // 拖拽元素类型
    // const [elementType, setElementType] = useState('');

    const save = useCallback(() => {

    }, []);

    const preview = useCallback(() => {

    }, []);

    const onFinish = value => {
        // console.log(value);
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
        const appendEle = trueDropElementChild[elementType];
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
        // console.log(element);
        let labelElement = element.childNodes[0].childNodes[0];
        let valueElement = element.childNodes[0].childNodes[1];
        element.onclick = (event) => {
            let targetLabel = event.toElement.className === 'targetLabel' ? event.toElement.innerHTML : event.toElement.previousSibling.innerHTML;
            setElementTypeText(targetLabel);
        }
        let settingsElement = document.querySelectorAll('.settings');
        for(let i = 0; i < settingsElement.length; i++) {
            // console.log(settingsElement[i]);
            settingsElement[i].onblur = (event) => {
                switch(i) {
                    case 0:
                        labelElement.innerHTML = event.target.value;
                        break;
                    case 1:
                        valueElement.innerHTML = event.target.value;
                        break; 
                    case 2:
                        // console.log(event.target);
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
        // console.log(event.target.id);
        event.dataTransfer.setData("elementType", event.target.id);
    }, []);

    const dropHandle = useCallback((event) => {
        event.preventDefault();
        const elementType = event.dataTransfer.getData("elementType");
        const targetElement = document.getElementById('content');
        // 此时是无效的
        if (elementType === '' || elementType === undefined) {
            // console.error('出错了');
            return;
        }

        // 根据元素类型获取新建的元素
        const trueDropElement = createTrueDropElement(elementType);

        const attribute = baseAttributeList.filter((baseAttribute) => baseAttribute.type === elementType);
        let attributeParmas = {
            id: trueDropElement.getAttribute('id'),
            list: attribute[0].list, 
        }
        console.log(attributeParmas);

        // let attr = elementAttribute[elementType];
        // console.log(attr);
        // console.log(trueDropElement.getAttribute('id'));
        // attr['id'] = trueDropElement.getAttribute('id');
        // let eleData = JSON.stringify(attr);
        // console.log(eleData);
        // if (!eleData) {
        //     return;
        // }
        let controlSetElement = document.getElementById('controlSet');
        controlSetElement.setAttribute('current-attrs', JSON.stringify(attributeParmas));
        // eleData = JSON.parse(eleData);
        // console.log(eleData);
        // attributeList = [...eleData];
        // console.log(attributeList);

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

    const inputChangeHandle = useCallback((event) => {
        console.log(event.target);
        console.log(event.target.value);
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
                    <p className="setTitle">可以设置<span className="elementType">{elementTypeText}</span>控件属性哦</p>
                    <Form form={form} name="dynamicForm" onFinish={onFinish} validateMessages={validateMessages}>
                        {
                           attributeList.length > 0 &&  attributeList.map((attribute) => {
                               return (
                                   <div key={attribute.id} className="attribute">
                                       <label>
                                            <span className="ruleName">{attribute.ruleName}</span>
                                            {
                                                attribute.topTip && (
                                                    <span className="topTip">{' (' + attribute.topTip + ')'}</span>
                                                )
                                            }  
                                        </label>
                                        {
                                            attribute.ruleValue !== 'dats' && attribute.ruleValue !== 'sopt' && attribute.ruleValue !== 'caption' && (
                                            <div className="settingsOuter">
                                                <input 
                                                    className="settings"
                                                    type={attribute.ruleType}
                                                    placeholder={attribute.placeHolder} 
                                                    defaultValue={attribute.defaultValue}
                                                    name={attribute.ruleValue}
                                                    onChange={(event) => inputChangeHandle(event)}
                                                />
                                                <span className="ruleValue">{attribute.checkboxLabel}</span>
                                            </div>
                                            )
                                        }
                                         <p className="bottomTip">{attribute.bottomTip}</p>
                                   </div>
                               )
                           })
                        }
                        {/* <Form.Item name="label" label="label" rules={[{ required: true }]}>
                            <Input placeholder="请输入label" className="settings"/>
                        </Form.Item>
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
                        </Form.Item> */}
                    </Form>
                </div>
            </div>
        </div>
    )
}
 
export default New;
