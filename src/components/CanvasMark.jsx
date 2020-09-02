import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { fabric } from 'fabric';
import { Button } from 'antd';
import images from '../static/test1.png';
import './CanvasMark.css';
let fabricObj;
let drawObject;
let labelResult = [];
let drawStatus = false;
let mouseFrom = {};
let mouseTo = {};
let isEdit = false;
let xLine;
let yLine;
let selectedShape = 'rect';
let moveCount;

const CanvasMark = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const canvasBoxRef = useRef(null);
  const [markResult, setMarkResult] = useState([]);
  const markResultRef = useRef(null);
  const [currentMarkResultId, setCurrentMarkResultId] = useState();
  const currentMarkResultIdRef = useRef(null);

  const handleSetXLine = useCallback(() => {
    return new fabric.Line([0, 0, 0, 0], {
      fill: 'red',
      stroke: 'red', //笔触颜色
      strokeWidth: 0.5,//笔触宽度
      hasControls: false, //选中时是否可以放大缩小
      hasRotatingPoint: false,//选中时是否可以旋转
      hasBorders:false,//选中时是否有边框
      transparentCorners:true,
      perPixelTargetFind:true,//默认false。当设置为true，对象的检测会以像互点为基础，而不是以边界的盒模型为基础。
      selectable:false,//是否可被选中
      lockMovementX: true,//X轴是否可被移动(true为不可，因为前缀是lock)
      lockMovementY: true,//Y轴是否可被移动(true为不可，因为前缀是lock)
    });
  }, []);

  const handleSetYLine = useCallback(() => {
    return new fabric.Line([0, 0, 0, 0], {
      fill: 'red',
      stroke: 'red', //笔触颜色
      strokeWidth: 0.5,//笔触宽度
      hasControls: false, //选中时是否可以放大缩小
      hasRotatingPoint: false,//选中时是否可以旋转
      hasBorders:false,//选中时是否有边框
      transparentCorners:true,
      perPixelTargetFind:true,//默认false。当设置为true，对象的检测会以像互点为基础，而不是以边界的盒模型为基础。
      selectable:false,//是否可被选中
      lockMovementX: true,//X轴是否可被移动(true为不可，因为前缀是lock)
      lockMovementY: true,//Y轴是否可被移动(true为不可，因为前缀是lock)
    });
  }, []);

  const initFabric = useCallback(() => {
    const canvasBox = canvasBoxRef.current;
    let canvasWidth = canvasBox.clientWidth||canvasBox.offsetWidth;
    let canvasHeight = canvasBox.clientHeight||canvasBox.offsetHeight;
    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;

    fabricObj = new fabric.Canvas('canvas')
    fabricObj.selectable = false;
    fabricObj.selection = false;
    fabricObj.skipTargetFind = true;

    const imgElement = imgRef.current;
    const imgWidth = imgElement.naturalWidth;
    const imgHeight = imgElement.naturalHeight;

    let scale;
    if(imgWidth/imgHeight > canvasWidth/canvasHeight){
        scale = canvasWidth/imgWidth;
    }else {
        scale = canvasHeight/imgHeight
    }

    let img = new fabric.Image(imgElement,{
      scaleX: scale,
      scaleY: scale,
      zIndex: 0,
      selectable: false,
    });
    fabricObj.add(
        img,
        xLine,
        yLine,
    );
    fabricObj.renderAll();
  }, [])

  const handleDrawXYLine = useCallback((mouseTo) => {
    yLine.height = fabricObj.height
    yLine.left = mouseTo.x  // 左边的距离

    xLine.width = fabricObj.width
    xLine.top = mouseTo.y  // 上边的距离

    fabricObj.renderAll();
  }, []);

  const handleClickImg = useCallback((index) => {
    fabricObj.clear().renderAll();
    initFabric();
  }, [initFabric]);

  const handleDrawRect = useCallback(() => {
    const width = mouseTo.x - mouseFrom.x;
    const height = mouseTo.y - mouseFrom.y;
    if(width <= 5 && height <= 5) {
      return false;
    }
    let path =  "M " +
      mouseFrom.x + " " +
      mouseFrom.y + " L " +
      mouseTo.x + " " +
      mouseFrom.y + " L " +
      mouseTo.x + " " +
      mouseTo.y + " L " +
      mouseFrom.x + " " +
      mouseTo.y + " L " +
      mouseFrom.x + " " +
      mouseFrom.y + " z";
    return new fabric.Path(path, {
        left: mouseFrom.x,
        top: mouseFrom.y,
        stroke: "#000",
        strokeWidth: 2,
        fill: "rgba(255, 255, 255, 0.2)",
    });
  }, []);


  const handleDraw = useCallback(() => {
    if(drawObject) {
      fabricObj.remove(drawObject);
    }
    let fabricNew = null;
    switch(selectedShape) {
      case 'rect':
        fabricNew = handleDrawRect();
        break; 
      default:
        break;  
    }
    if (fabricNew){
      fabricNew.set('shape',selectedShape);
      fabricObj.add(fabricNew);
      drawObject = fabricNew;
    }
  }, [handleDrawRect]);

  const handleMouseDown = useCallback((event) => {
    if (isEdit){
      return;
    }
    drawStatus = true;
    mouseFrom = {
      x: event.pointer.x,
      y: event.pointer.y,
    }
    console.log('mouse:down')
  }, []);

  const handleMouseMove = useCallback((event) => {
    mouseTo = {
      x: event.pointer.x,
      y: event.pointer.y,
    }
    handleDrawXYLine(mouseTo)
    if (moveCount % 2 && !drawStatus) {
      //减少绘制频率
      return;
    }
    moveCount++;
    handleDraw();
    // fabricObj.renderAll();
  }, [handleDrawXYLine, handleDraw]);

  const handleEdit = useCallback((event, markResultItem) => {
    isEdit = true;
    drawStatus = false
    selectedShape = '';
    fabricObj.isDrawingMode = false;
    fabricObj.selectable = true;
    fabricObj.selection = true;
    fabricObj.skipTargetFind = false;
    fabricObj.bringToFront(markResultItem);
    fabricObj.setActiveObject(markResultItem);
    
  }, []);

  const handleEditAll = useCallback(() => {
    isEdit = true;
    drawStatus = false;
    selectedShape = '';
    fabricObj.isDrawingMode = false;
    fabricObj.selectable = true;
    fabricObj.selection = true;
    fabricObj.skipTargetFind = false;
  }, []);

  const handleMouseUp = useCallback((event) => {
    moveCount = 1;
    mouseTo = {
      x: event.pointer.x,
      y: event.pointer.y,
    }
    console.log('mouse:up');
    if(selectedShape === 'rect') {
      if(drawObject && !isEdit){
        drawObject.set('id',labelResult.length);
        labelResult.push(drawObject)
        // 画完即可编辑
        handleEdit(event, drawObject)
        // handleEditAll()
      }
    }
    setMarkResult([...labelResult])
    markResultRef.current = [...labelResult];
    drawObject = null;
    drawStatus = false;
  }, [handleEdit]);

  const handleSelectionCreated = useCallback((event) => {
    console.log('selection:created')
    event.target.set({
        transparentCorners: false,
        cornerColor: '#ff7a55',
        cornerStrokeColor: '#ff7a55',
        borderColor: 'red',
        cornerSize: 12,
        padding: 10,
        cornerStyle: 'circle',
        borderDashArray: [3, 3]
    });
    setCurrentMarkResultId(event.target.id);
    currentMarkResultIdRef.current = event.target.id;
  }, []);

  const handleObjectModified = useCallback((event) => {
    // 修改对象
    // console.log('object:modified')
    // markResult.forEach(item=>{
    //     if (item.id === event.target.id){
    //         item = event.target
    //     }
    // });
  }, []);

  const handleSelectionUpdated = useCallback((event) => {
    console.log('selection:updated')
    setCurrentMarkResultId(event.target.id);
    currentMarkResultIdRef.current = event.target.id;
    event.target.set({
      transparentCorners: false,
      cornerColor: '#ff7a55',
      cornerStrokeColor: '#ff7a55',
      borderColor: 'red',
      cornerSize: 12,
      padding: 10,
      cornerStyle: 'circle',
      borderDashArray: [3, 3],
    });
  }, []);

  const handleDrawText = useCallback((current, label) => {
    let text = current.id + 1;
    let textBox = new fabric.Textbox("", {
      left: current.left,
      top: current.top - 17,
      fontSize: 15,
      hasBorders: false,
      padding: 5,
      borderColor: 'red',
      fill: 'red',
      hasControls: false,
      textboxBorderColor: 'red',
      showTextBoxBorder: true,
      zIndex: 1,
      text: text + label,
    });
    fabricObj.add(textBox);
  }, []);

  const handleSelectShape = useCallback((shape) => {
    selectedShape = shape;
    isEdit = false;
    fabricObj.isDrawingMode = false;
    fabricObj.selectable = false;
    fabricObj.selection = false;
    fabricObj.skipTargetFind = true;
  }, []);

  const handleSelectionCleared = useCallback((event) => {
    console.log('selection:cleared');
    handleSelectShape('rect');
  }, [handleSelectShape]);

  const handleMouseOver = useCallback((event) => {
    console.log('mouse:over');
  }, []);

  const handleMouseOut = useCallback((event) => {
    console.log('mouse:out')
    mouseTo = {
      x: -1,
      y: -1,
    }
    handleDrawXYLine(mouseTo)
  }, [handleDrawXYLine]);

  const fabricObjEvent = useCallback(() => {
    fabricObj.on({
      'mouse:down': (event) => handleMouseDown(event),
      'mouse:move': (event) => handleMouseMove(event),
      'mouse:up': (event) => handleMouseUp(event),
      'mouse:over': (event) => handleMouseOver(event),
      'mouse:out': (event) => handleMouseOut(event),
      'selection:created': (event) => handleSelectionCreated(event),
      'selection:updated': (event) => handleSelectionUpdated(event),
      'selection:cleared': (event) => handleSelectionCleared(event),
      'object:modified': (event) => handleObjectModified(event),
      'object:moving': () => {},
      'mouse:down:before': (event) => {
        console.log('mouse:down:before ');
      }
    })
  }, [
    handleMouseMove, 
    handleMouseDown, 
    handleMouseUp, 
    handleMouseOver, 
    handleMouseOut, 
    handleSelectionCreated, 
    handleSelectionUpdated,
    handleObjectModified, 
    handleSelectionCleared,
  ]);

  const handleKeyDown = useCallback((event) => {
    let ev = event || window.event;
    switch(ev.keyCode) {
      case 68:  // D 选中矩形框
        handleSelectShape('rect');
        break;
      case 13:  // 46 Delete 删除
        let markResultList = [...markResultRef.current];
        markResultList.forEach((item) => {
          if(currentMarkResultIdRef.current === item.id) {
            fabricObj.remove(item);
            fabricObj.renderAll();
          }
        });
        break; 
      case 75:  // K 快捷键

        break; 
      case 76:  // L 选择标签

        break; 
      case 9:   // Tab 下一个标签

        break; 
      case 70:  //  F 适应屏幕  
        
        break;  
      case 79:  // O  标签可见

        break;
      case 86:  // V  图形可见

        break;
      case 67:  // C  显示/隐藏当前图形

        break;
      case 83:  // R 重新标注 

        break;
      default:
        break;  
    }
  }, [handleSelectShape]);

  useEffect(() => {
    xLine = handleSetXLine();
    yLine = handleSetYLine();
    initFabric();
    fabricObjEvent();
    document.addEventListener("keydown", handleKeyDown)
  }, [handleSetXLine, handleSetYLine, initFabric, fabricObjEvent])

  const handleDelete = useCallback((event, index) => {
    event.stopPropagation();
    let markResultList = [...markResult];
    fabricObj.remove(markResultList[index]);
    markResultList.splice(index, 1)
    setMarkResult([...markResultList])
    markResultRef.current = [...markResultList];
  }, [markResult]);

  const handleClickMarkItem = useCallback((event, index) => {
    event.stopPropagation();
  }, []);

  const handleSelectLabel = useCallback((event, index) => {
    event.stopPropagation();
    let markResultList = [...markResult];
    handleDrawText(markResultList[index], '标签一');
  }, [markResult, handleDrawText]);

  const handleOnlyShowCurrentMark = useCallback(() => {
    let markResultList = [...markResult];
    markResultList.forEach((item) => {
      if(currentMarkResultId !== item.id) {
        fabricObj.remove(item);
        fabricObj.renderAll();
      }
    });
  }, [currentMarkResultId, markResult]);

  const handleShowAllMark = useCallback(() => {
    let markResultList = [...markResult];
    markResultList.forEach((item) => {
      fabricObj.remove(item);   // 防止图层重复
      fabricObj.add(item);
      fabricObj.renderAll();
    });
  }, [markResult]);

  return (
      <div id="canvasMark">
        <div id="shape">
          <Button type="primary" size="small" style={{marginBottom: '10px'}} onClick={() => { handleSelectShape('rect')}}>矩形</Button> 
          <Button type="primary" size="small" onClick={() => { handleEditAll()}}>编辑</Button> 
        </div>
        <div id="canvasBox" ref={canvasBoxRef} style={{width: '600px', height: '400px', border: '1px solid grey',}}>
          <canvas 
            id="canvas" 
            ref={canvasRef} 
            style={{width: '100%', height: '100%',}}
          >您的浏览器不支持canvas，请升级最新版本</canvas>
        </div>
        <img
          ref={imgRef}
          style={{width: '200px', height: '200px',}}
          src={images}
          alt="标注图片"
          onClick={() => handleClickImg(0)}
        />
        <div style={{width: '500px', height: '400px', backgroundColor: 'lightGrey', cursor: 'pointer',}}>
          <h4>标注结果</h4>
          <Button type="primary" size="small" style={{marginRight: '5px'}} onClick={() => { handleShowAllMark()}}>图形可见</Button> 
          <Button type="primary" size="small" style={{marginRight: '5px'}} onClick={() => { handleOnlyShowCurrentMark()}}>当前图形</Button> 
          {
            markResult && markResult.map((item, index) => {
              return (
                <p key={item.id} onClick={(event) => {handleClickMarkItem(event, index)}}>
                  <span>框{index+1}: left: {item.left}, top: {item.top} </span>
                  <Button type="primary" size="small" style={{marginRight: '5px'}} onClick={(event) => { handleEdit(event, markResult[index])}}>编辑</Button> 
                  <Button type="primary" size="small" style={{marginRight: '5px'}} onClick={(event) => { handleDelete(event, index)}}>删除</Button>
                  <Button type="primary" size="small" onClick={(event) => { handleSelectLabel(event, index)}}>标签选择</Button>
                </p>
              )
            })
          }
        </div>
      </div>
  )
}
 
export default CanvasMark;
