"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
interface StrokeData {
  startTime: number;
  endTime: number;
  strokeSize: number;
  strokeColor: string;
  positionArray: number[][];
}

export default function Watch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [strokeData, setStrokeData] = useState<StrokeData[] | null>(null);
  const [strokeNum, setStrokeNum] = useState(0);

  useEffect(() => {
   const f=async()=>{
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctxRef.current = ctx;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/recording/uploadget?session_name=${'test1'}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        } 
      })
      console.log(res)  
      const storedData = localStorage.getItem("strokeData");
      if (storedData) {
        const parsedStrokeData: StrokeData[] = JSON.parse(storedData);
        setStrokeData(parsedStrokeData);
      }
    }
   }
   f()
  }, []);
  useEffect(() => {
    const strokeDataLength = strokeData?.length;
    let count = 0;
    if (strokeDataLength) {
      for (let i = 0; i < strokeDataLength; i++) {
        drawStroke(
          strokeData[i].strokeSize,
          strokeData[i].strokeColor,
          strokeData[i].positionArray,
          strokeData[i].startTime,
          strokeData[i].endTime
        );
      }
    }
  }, [strokeData]);
  function drawStroke(
    strokeSize: number,
    strokeColor: string,
    strokePoints: number[][],
    start: number,
    end: number
  ) {
    console.log(strokeNum);
    const stroke_length = strokePoints.length;
    const delay = (end - start) / stroke_length;
    if (ctxRef.current) {
      ctxRef.current.beginPath();
      let lastX = strokePoints[0][0];
      let lastY = strokePoints[0][1];
      ctxRef.current.moveTo(lastX, lastY);

      (async () => {
        for (let i = 1; i < stroke_length; i++) {
          let x = strokePoints[i][0];
          let y = strokePoints[i][1];
          if (ctxRef.current) {
      
            ctxRef.current.moveTo(lastX, lastY);
            ctxRef.current.lineTo(x, y);

            ctxRef.current.lineJoin = "round";
            ctxRef.current.lineCap = "round";
            ctxRef.current.lineWidth = strokeSize;
            ctxRef.current.strokeStyle = strokeColor;

            lastX = x;
            lastY = y;

            // Introduce a delay of 5 milliseconds
            await new Promise((resolve) => setTimeout(resolve, delay));
            ctxRef.current.stroke();
          }
          x=0;
          y=0
        }
      })();
      ctxRef.current.closePath();
      lastX = 0;
      lastY = 0;
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
}
