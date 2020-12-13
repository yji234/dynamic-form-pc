import React, { useCallback, useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import './New.css';

const baseAttributeList = [
    {
        id: '1',
        type: 'input',
        name: 'Input',
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
                ruleValue: 'isDisabled',
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
            {
                id: '6',
                ruleName: '最大长度',
                ruleValue: 'maxLength',
                ruleType: 'text',
                defaultValue: '',
                placeHolder: '',
                topTip: '最多80',
                bottomTip: '',
                checkboxLabel: ''
            },
        ],
    },
    {
        id: '2',
        type: 'textarea',
        name: 'Textarea',
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
                ruleValue: 'isDisabled',
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
            {
                id: '6',
                ruleName: '最大长度',
                ruleValue: 'maxLength',
                ruleType: 'text',
                defaultValue: '',
                placeHolder: '',
                topTip: '最多200',
                bottomTip: '',
                checkboxLabel: ''
            },
        ],
    },
    {
        id: '3',
        type: 'igitalinput',
        name: 'InputNumber',
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
                ruleValue: 'isDisabled',
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
            {
                id: '6',
                ruleName: '最大长度',
                ruleValue: 'maxLength',
                ruleType: 'text',
                defaultValue: '',
                placeHolder: '',
                topTip: '最多9',
                bottomTip: '',
                checkboxLabel: ''
            },
        ],
    },
    {
        id: '4',
        type: 'money',
        name: 'Money',
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
                ruleValue: 'isDisabled',
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
            {
                id: '6',
                ruleName: '最大长度',
                ruleValue: 'maxLength',
                ruleType: 'text',
                defaultValue: '',
                placeHolder: '',
                topTip: '最多9',
                bottomTip: '',
                checkboxLabel: ''
            },
        ],
    },
    {
        id: '5',
        type: 'radio',
        name: 'Radio',
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
                ruleValue: 'isDisabled',
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
        id: '6',
        type: 'checkbox',
        name: 'Checkbox',
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
                ruleValue: 'isDisabled',
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
        id: '7',
        type: 'date',
        name: 'Date-Picker',
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
                ruleValue: 'isDisabled',
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
            id: '8',
            type: 'daterange',
            name: 'Daterange-Picker',
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
                    ruleValue: 'isDisabled',
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
        id: '9',
        type: 'picture',
        name: 'Upload-Picture',
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
                ruleValue: 'isDisabled',
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
        id: '10',
        type: 'file',
        name: 'Upload-File',
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
                ruleValue: 'isDisabled',
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
        id: '11',
        type: 'remark',
        name: 'Text',
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
                ruleValue: 'isDisabled',
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
        id: '12',
        type: 'refselect',
        name: 'Select',
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
                ruleValue: 'isDisabled',
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
//             ruleValue: 'isDisabled',
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
// let attributeList = [
    // {
    //     id: "1",
    //     ruleName: "标题",
    //     ruleValue: "label",
    //     ruleType: "text",
    //     defaultValue: "",
    //     placeHolder: '请输入',
    //     topTip: "最多20字",
    //     bottomTip: "",
    //     checkboxLabel: '',
    // },
    // {
    //     id: '2',
    //     ruleName: '提示文字',
    //     ruleValue: 'placeHolder',
    //     ruleType: 'text',
    //     defaultValue: '',
    //     placeHolder: '请输入',
    //     topTip: '最多50字',
    //     bottomTip: '内容最多可填写1000字',
    //     checkboxLabel: ''
    // },
    // {
    //     id: '3',
    //     ruleName: '必填',
    //     ruleValue: 'isRequired',
    //     ruleType: 'checkbox',
    //     defaultValue: '',
    //     placeHolder: '',
    //     topTip: '',
    //     bottomTip: '',
    //     checkboxLabel: '是否必填'
    // },
    // {
    //     id: '4',
    //     ruleName: '禁用',
    //     ruleValue: 'isDisabled',
    //     ruleType: 'checkbox',
    //     defaultValue: '',
    //     placeHolder: '',
    //     topTip: '',
    //     bottomTip: '',
    //     checkboxLabel: '是否禁用'
    // },
    // {
    //     id: '5',
    //     ruleName: '打印',
    //     ruleValue: 'isPrint',
    //     ruleType: 'checkbox',
    //     defaultValue: '',
    //     placeHolder: '',
    //     topTip: '如不勾选，打印时不显示该项',
    //     bottomTip: '',
    //     checkboxLabel: '参与打印'
    // },
// ]
let controlSetElement;

const New = () => {
    const [elementTypeText, setElementTypeText] = useState('');    // 设置元素属性
    const [attributeList, setAttributeList] = useState([]);     // 控件属性列表
    // const [myValue, setMyValue] = useState('hello');

    const save = useCallback(() => {

    }, []);

    const preview = useCallback(() => {

    }, []);

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

    // 清除右侧控件属性设置
    const clearControlSet = useCallback(() => {
        // 清除属性
        // console.log(controlSetElement);
        controlSetElement.removeAttribute('current-attribute');
        setAttributeList([...[]]);
        const inputElementList = document.querySelectorAll('#controlSet .settings');
        for (let i = 0; i < inputElementList.length; i++){
            // console.log(inputElementList[i].value);
            inputElementList[i].value = '';
            inputElementList[i].checked = false;
        }
    }, [setAttributeList]);

    // 设置控件属性
    const setControlAttribute = useCallback((element) => {
        // console.log(element);
        const inputElementList = document.querySelectorAll('#controlSet .settings');
        const targetLabelElement = element.querySelectorAll('.targetLabel')[0];
        const targetValElement = element.querySelectorAll('.targetValue')[0];
        setElementTypeText(targetLabelElement.innerHTML);
        for (let i = 0; i < inputElementList.length; i++) {
            inputElementList[i].onchange = (event) => {
                const inputElement = event.target;
                // console.log(inputElement);
                // console.log(inputElement.value);
                switch(inputElement.name) {
                    case 'label':
                        targetLabelElement.innerHTML = inputElement.value;
                        break;
                    case 'placeHolder':
                        targetValElement.innerHTML = inputElement.value;
                        break;
                    case 'isRequired':
                        if(inputElement.checked) {
                            targetLabelElement.classList.add('targetLabelRequired');
                        } else {
                            targetLabelElement.classList.remove('targetLabelRequired');
                        }
                        break;
                    case 'isDisabled':
                        if(inputElement.checked) {
                            targetValElement.classList.add('targetValueDisabled');
                        } else {
                            targetValElement.classList.remove('targetValueDisabled');
                        }
                        break;
                    case 'isPrint':
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

        // 清除右侧控件属性设置
        clearControlSet();

        // 根据元素类型获取新建的元素
        const trueDropElement = createTrueDropElement(elementType);

        // 拖拽元素将元素对应的属性设置挂载到最右边控件属性的
        const attribute = baseAttributeList.filter((baseAttribute) => baseAttribute.type === elementType);
        let attributeParmas = {
            id: trueDropElement.getAttribute('id'),
            list: attribute[0].list, 
        }
        trueDropElement.setAttribute('current-attribute', JSON.stringify(attributeParmas))
        trueDropElement.setAttribute('class', 'comcom');
        controlSetElement.setAttribute('current-attribute', JSON.stringify(attributeParmas));
        setAttributeList([...attributeParmas.list]);

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
        setTimeout(() => {
            setControlAttribute(trueDropElement);
        }, 0)
    }, [createTrueDropElement, setControlAttribute, setAttributeList, clearControlSet]);

    const dragoveHandle = useCallback((event) => {
        event.preventDefault();
    }, []);

    const clickHandle = useCallback((event) => {
        // 当前点击对象的ID--长串
        const toId = event.target.parentElement.getAttribute('id') || event.target.parentElement.parentElement.getAttribute('id');
        const controlElement = document.getElementById(toId);
        const attributeParmas = controlElement.getAttribute('current-attribute');
        if(!attributeParmas) {
            return;
        }
        // 将所有的属性都保存到右边的编辑框，用于后续的数据保存 [例如 组件的ID, 需要一个唯一的东西来标识的, 即使是使用索引]
        controlSetElement.setAttribute('current-attribute', attributeParmas);
        // 将需要修改的值，赋值到表单上
        setAttributeList([...JSON.parse(attributeParmas).list]);
        // 控件设置里面的属性变化，中间的预览变化
        setTimeout(function () {
            setControlAttribute(controlElement);
        }, 0);
    }, [setControlAttribute]);

    useEffect(() => {
        controlSetElement = document.getElementById('controlSet');
    });

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
                    <div
                        id="content"
                        onDrop={(event) => dropHandle(event)}
                        onDragOver={(event) => dragoveHandle(event)}
                        onClick={(event) => clickHandle(event)}
                    ></div>
                </div>
                <div id="controlSet">
                    <p className="setTitle">可以设置<span className="elementType">{elementTypeText}</span>控件属性哦</p>
                    <div>
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
                                                <Input 
                                                    className="settings"
                                                    type={attribute.ruleType}
                                                    placeholder={attribute.placeHolder} 
                                                    defaultValue={attribute.defaultValue}
                                                    name={attribute.ruleValue}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default New;
