import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { fabric } from 'fabric';
import { Button } from 'antd';
import images from '../static/test1.png';
import './CanvasMark.css';
let fabricObj;
let drawObject;
let labelResult = [];
let fabricJson;
let drawStatus = false;
let mouseFrom;
let mouseTo;
let isEdit = false;

const CanvasMark = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const canvasBoxRef = useRef(null);
  // const [mouseFrom, setMouseFrom] = useState({});
  // const [mouseTo, setMouseTo] = useState({});
  const [shape, setShape] = useState('rect');
  const [activeIndex, setActiveIndex] = useState(0);
  // const [drawStatus, setDrawStatus] = useState(false);
  const [markResult, setMarkResult] = useState([]);

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
    );
  }, [])

  const handleClickImg = useCallback((index) => {
    setActiveIndex(index);
    fabricObj.clear().renderAll();
    initFabric();
  }, [initFabric]);

  const handleDrawRect = useCallback(() => {
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
    switch(shape) {
      case 'rect':
        fabricNew = handleDrawRect();
        break;
      default:
        break;  
    }
    if (fabricNew){
      fabricNew.set('shape',shape);
      fabricObj.add(fabricNew);
      drawObject = fabricNew;
    }
  }, [handleDrawRect, shape]);

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
    if (drawStatus) {
      handleDraw();
    }
  }, [handleDraw]);

  const handleMouseUp = useCallback((event) => {
    console.log('handleMouseUp')
    console.log(event.pointer)
    mouseTo = {
      x: event.pointer.x,
      y: event.pointer.y,
    }
    console.log(drawObject)
    if(drawObject){
      drawObject.set('id',labelResult.length);
      labelResult.push(drawObject)
    }
    console.log(labelResult);
    setMarkResult([...labelResult])
    drawObject = null;
    drawStatus = false;
    // 画完即可编辑
    // fabricObj.isDrawingMode = false;
    // fabricObj.selectable = true;
    // fabricObj.selection = true;
    // fabricObj.skipTargetFind = false;
    // fabricObj.bringToFront(drawObject);
    // fabricObj.setActiveObject(drawObject);
    // isEdit = true;
  }, []);

  const handleSelectionCreated = useCallback((event) => {
    console.log('selection created')
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
    isEdit = true;
  }, []);

  const handleObjectModified = useCallback((event) => {
    // 修改对象
    console.log('object:modified')
    // console.log(markResult)
    // markResult.forEach(item=>{
    //     if (item.id === event.target.id){
    //         item = event.target
    //     }
    // });
    // console.log(markResult)
  }, []);

  const handleSelectionUpdated = useCallback((event) => {
    console.log('selection:updated')
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
  }, []);

  const handleSelectionCleared = useCallback((event) => {
    console.log('selection:cleared');
    isEdit = false;
  }, []);

  const fabricObjEvent = useCallback(() => {
    fabricObj.on({
      'mouse:down': (event) => handleMouseDown(event),
      'mouse:move': (event) => handleMouseMove(event),
      'mouse:up': (event) => handleMouseUp(event),
      'selection:created': (event) => handleSelectionCreated(event),
      'selection:updated': (event) => handleSelectionUpdated(event),
      'selection:cleared': (event) => handleSelectionCleared(event),
      'object:modified': (event) => handleObjectModified(event),
    })
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleSelectionCreated, handleObjectModified, handleSelectionUpdated, handleSelectionCleared]);

  useEffect(() => {
    initFabric();
    fabricObjEvent();
  }, [initFabric, fabricObjEvent])

  const handleDelete = useCallback((event, index) => {
    event.stopPropagation();
    let markResultList = [...markResult];
    fabricObj.remove(markResultList[index]);
    markResultList.splice(index, 1)
    setMarkResult([...markResultList])
  }, [markResult]);

  const handleEdit = useCallback((event, index) => {
    event.stopPropagation();
    console.log(index)
    let markResultList = [...markResult];
    fabricObj.isDrawingMode = false;
    fabricObj.selectable = true;
    fabricObj.selection = true;
    fabricObj.skipTargetFind = false;
    fabricObj.bringToFront(markResultList[index]);
    fabricObj.setActiveObject(markResultList[index]);
    isEdit = true;
  }, [markResult]);

  const handleClickMarkItem = useCallback((event, index) => {
    event.stopPropagation();
  }, []);

  return (
      <div id="canvasMark">
        <div id="canvasBox" ref={canvasBoxRef} style={{width: '600px', height: '400px',}}>
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
        <div style={{width: '400px', height: '400px', backgroundColor: 'lightGrey', cursor: 'pointer',}}>
          <h4>标注结果</h4>
          {
            markResult && markResult.map((item, index) => {
              return (
                <p key={item} onClick={(event) => {handleClickMarkItem(event, index)}}>
                  <span>框{index+1}: left: {item.left}, top: {item.top} </span>
                  <Button type="primary" size="small" style={{marginRight: '10px'}} onClick={(event) => { handleEdit(event, index)}}>编辑</Button> 
                  <Button type="primary" size="small" onClick={(event) => { handleDelete(event, index)}}>删除</Button>
                </p>
              )
            })
          }
        </div>
      </div>
  )
}
 
export default CanvasMark;
