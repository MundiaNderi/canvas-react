import React, { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import CanvasImg from "./assets/canvas.png";

const App = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());
  const [bgColor, setBgColor] = useState("#ffffff");
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialImgDims, setInitialImgDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = imgRef.current;
    img.src = CanvasImg;
    img.onload = () => {
      const canvas = canvasRef.current;
      const maxWidth = canvas.clientWidth;
      const maxHeight = canvas.clientHeight;
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * scale;
      const height = img.height * scale;
      setImgDims({ width, height });
    };
  }, []);

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    canvas.width = imgDims.width;
    canvas.height = imgDims.height;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, imgDims.width, imgDims.height);
  }, [bgColor, imgDims]);

  useEffect(() => {
    if (imgDims.width && imgDims.height) {
      drawImage();
    }
  }, [bgColor, imgDims, drawImage]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setInitialImgDims(imgDims);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;
      const width = initialImgDims.width + deltaX;
      const height = initialImgDims.height + deltaY;
      setImgDims({ width, height });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="App">
      <div>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <label>Select Background Color</label>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        //style={{ border: '1px solid #000', cursor: 'pointer', marginTop: '20px', maxWidth: '600px', maxHeight: '400px' }}
      ></canvas>
      <span>
        <span>
          <p style={{ color: "black" }}>View this site on Netlify</p>
          <a href="https://github.com/MundiaNderi/canvas">Serah Nderi</a>
        </span>
      </span>
    </div>
  );
};

export default App;
