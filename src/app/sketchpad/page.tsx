"use client";
import React, { useRef, useEffect, useState } from "react";

const SketchPad = () => {
  const canvasRef = useRef(null);
  const activeColor = "#000000";
  const ctxRef = useRef(null);
  const [activeBg, setActiveBg] = useState("#000000");
  const [pos, setPos] = useState({ lastX: 0, lastY: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  //   const canvas: any = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   const draw = (ctx: any, xpos: number, ypos: number) => {
  //     if (!isDrawing.current) return;

  //     ctx.fillStyle = "#000000";
  //     ctx.beginPath();
  //     ctx.arc(xpos, ypos, 10, 0, 2 * Math.PI);

  //     ctx.fill();
  //   };
  function getMousePos(e: any, canvas: any) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }
  function motion(e: any, canvas: any, ctx: any) {
    if (!isDrawing) return;
    const { x, y } = getMousePos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.lastX, pos.lastY);
    ctx.lineTo(x, y);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5; //lineThickness;
    ctx.stroke();
    setPos({ lastX: x, lastY: y });
    // lastX = x;
    // lastY = y;
  }
  function draw(e: any, canvas: any, ctx: any) {
    motion(e, canvas, ctx);
    //   ctx.strokeStyle = activeColorItem.getAttribute("data-key");
    ctx.strokeStyle = "#000000"; //activeColor;
  }
  function erase(e: any, ctx: any, canvas: any) {
    motion(e, canvas, ctx);
    ctx.strokeStyle = activeBg;
  }
  function paint(e: any, ctx: any) {
    //   canvas.style.backgroundColor = activeColor;
    //   activeBackground = activeColor;
    ctx.fillStyle = activeColor;
    setActiveBg(activeColor);
    ctx.beginPath();
    ctx.arc(pos.lastX, pos.lastY, 2000, 0, 2 * Math.PI);
    ctx.fill();
  }

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctxRef.current = ctx;
    // Our first draw
    // draw(context, 100, 100); // Initial draw at position (100, 100)
  }, []);

  //   const handleMouseDown = (event: any) => {
  //     isDrawing.current = true;
  //     handleMouseMove(event);
  //   };

  //   const handleMouseMove = (event: any) => {
  //     const canvas: any = canvasRef.current;
  //     const context = canvas?.getContext("2d");
  //     if (context && isDrawing.current) {
  //       const rect = canvas.getBoundingClientRect();
  //       const xpos = event.clientX - rect.left;
  //       const ypos = event.clientY - rect.top;
  //       draw(context, xpos, ypos);
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     isDrawing.current = false;
  //   };
  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const { x, y } = getMousePos(e, canvasRef.current);
    setPos({ lastX: x, lastY: y });
  };
  const handleMouseMove = (e: any) => {
    if (isDrawing) draw(e, canvasRef.current, ctxRef.current);
  };
  //   canvas.addEventListener("mouseup", () => (isDrawing = false));
  return (
    <div
      className="canvas-rect"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDrawing(false)}
    >
      <canvas ref={canvasRef} width={1300} height={700} />
    </div>
  );
};

export default SketchPad;
