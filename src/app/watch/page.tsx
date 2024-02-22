"use client";
import React, { useRef, useEffect, useState } from "react";
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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctxRef.current = ctx;
      const storedData = localStorage.getItem("strokeData");
      if (storedData) {
        const parsedStrokeData: StrokeData[] = JSON.parse(storedData);
        setStrokeData(parsedStrokeData);
      }
    }
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
          const x = strokePoints[i][0];
          const y = strokePoints[i][1];
          if (ctxRef.current) {
            // If the distance exceeds 100, move to the new point without drawing a line

            // Draw the line if the distance is within the threshold
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
