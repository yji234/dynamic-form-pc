import React, { useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import images from '../static/test1.png';

let fabricObj;

const Mark = () => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    const handleDrawImage = useCallback(() => {
        let imageElement = imgRef.current;
        console.log(imgRef.current)
        let image = new fabric.Image(imageElement, {
            selectable: false,
            zIndex: 0,
            scaleX: 0.9,
            scaleY: 0.9,
        });
        fabricObj.add(image); 
    }, [imgRef]);

    const handleInitFabric = useCallback(() => {
        fabricObj = new fabric.Canvas('canvas');
        fabricObj.selectable = false;
        fabricObj.selection = false;
        fabricObj.skipTargetFind = true;
        // 绘制图片
        handleDrawImage();
    }, [handleDrawImage]);

    useEffect(() => {
        // 初始化fabric
        handleInitFabric();
    });

    return (
        <div style={{width: '100%', height: '400px', backgroundColor: 'grey', display: 'flex'}}>
            <div style={{width: '200px', height: '400px', backgroundColor: 'lightblue'}}>
                <img
                    ref={imgRef}
                    style={{width: '200px', height: '200px',}}
                    src={images}
                    alt="标注图片"
                />
            </div>
            <div style={{width: '800px', height: '400px', backgroundColor: 'ghostwhite'}}>
                <canvas id="canvas" ref={canvasRef} style={{width: '100%', height: '100%',}}>
                    您的浏览器不支持canvas，请升级最新版本
                </canvas>
            </div>
            <div style={{width: '200px', height: '400px', backgroundColor: 'lightblue'}}></div>
        </div>
    )
}

export default Mark;