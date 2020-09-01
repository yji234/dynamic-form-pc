import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { fabric } from 'fabric';
import images from '../static/test1.png';
import './CanvasMark.css'
let fabricObj;
let xLine;
let yLine;
let axisTip;
let drawStatus = false;
let mouseFrom;
let drawObject;

const CanvasMark = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const canvasBoxRef = useRef(null);
  // const [mouseFrom, setMouseFrom] = useState({});
  // const [drawStatus, setDrawStatus] = useState(false);

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

  const handleSetAxisTip = useCallback(() => {
    return new fabric.Text('(0, 0)', {
      fontSize: 20,
      originX: 0,  // 放到看不见的位置
      originY: 0  // 放到看不见的位置
    });
  }, []);

  const initFabric = useCallback(() => {
    const canvasBox = canvasBoxRef.current;
    let canvasWidth = canvasBox.clientWidth||canvasBox.offsetWidth;
    let canvasHeight = canvasBox.clientHeight||canvasBox.offsetHeight;
    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;

    fabricObj = new fabric.Canvas('canvas')
    // 鼠标默认样式
    // fabricObj.defaultCursor = 'crosshair';

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

    xLine = handleSetXLine();
    yLine = handleSetYLine();
    axisTip = handleSetAxisTip();

    fabricObj.add(
        img,
        xLine,
        yLine,
        axisTip,
    );
  }, [handleSetXLine, handleSetYLine, handleSetAxisTip])

  const handleDrawXYLine = useCallback((event) => {
    xLine.height = fabricObj.height
    xLine.left = event.pointer.x  // 左边的距离

    yLine.width = fabricObj.width
    yLine.top = event.pointer.y  // 上边的距离

    // TODO: 被覆盖时，可以修改下显示位置
    axisTip.text = '(' + parseInt(event.pointer.x) + ',' + parseInt(event.pointer.y) + ')'
    axisTip.left = event.pointer.x
    axisTip.top = event.pointer.y - axisTip.height
  }, []);

  const handleMouseMove = useCallback((event) => {
    handleDrawXYLine(event)
    console.log(drawStatus)
    if(drawStatus){
      let rect = fabricObj.getActiveObject();
      rect.set('width', event.pointer.x - mouseFrom.x)
      rect.set('height', event.pointer.y - mouseFrom.y)
      fabricObj.renderAll();
    }
    fabricObj.renderAll();
  }, [handleDrawXYLine]);

  const handleMouseDown = useCallback((event) => {
    drawStatus = true;
    mouseFrom = {
      x: event.pointer.x,
      y: event.pointer.y,
    }
    console.log('handleMouseDown')
    let rect = new fabric.Rect({
      left: event.pointer.x,
      top: event.pointer.y,
      hasControls: false, //选中时是否可以放大缩小
      hasRotatingPoint: false,//选中时是否可以旋转
      stroke: '#000', // 边框原色
      strokeWidth: 2, // 边框大小
      fill: 'rgba(255,255,255, 0.2)',
    })
    fabricObj.add(rect)
    fabricObj.setActiveObject(rect)
  }, []);

  const handleMouseUp = useCallback((event) => {
    // setDrawStatus(false);
    drawStatus = false;
    console.log('handleMouseUp')
    if(drawObject) {
      
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    fabricObj.remove({
      xLine,
      yLine,
      axisTip,
    })
  }, []);

  const fabricObjEvent = useCallback(() => {
    fabricObj.on({
      'mouse:move': (event) => handleMouseMove(event),
      'mouse:down': (event) => handleMouseDown(event),
      'mouse:up': (event) => handleMouseUp(event),
      'mouse:out': (event) => handleMouseOut(event),
    })
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOut]);

  useEffect(() => {
    initFabric();
    fabricObjEvent();
  }, [initFabric, fabricObjEvent])

  const handleEdit = useCallback(() => {

  }, []);

  return (
      <div id="canvasMark">
        <div id="canvasBox" ref={canvasBoxRef} style={{width: '600px', height: '400px', border: '1px solid grey'}}>
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
        />
        <div style={{width: '400px', height: '400px', border: '1px solid grey',}}>
          <button onClick={() => handleEdit()}>编辑</button>
        </div>
      </div>
  )
}
 
export default CanvasMark;
