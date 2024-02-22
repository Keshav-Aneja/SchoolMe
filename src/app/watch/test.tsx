// "use client";
// import React, { useRef, useEffect, useState } from "react";

// interface StrokeData {
//   startTime: string;
//   endTime: string;
//   strokeSize: number;
//   strokeColor: string;
//   positionArray: number[][];
// }

// export default function Watch() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
//   const [strokeData, setStrokeData] = useState<StrokeData[] | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (ctx) {
//       ctxRef.current = ctx;
//       const storedData = localStorage.getItem("strokeData");
//       if (storedData) {
//         const parsedStrokeData: StrokeData[] = JSON.parse(storedData);
//         setStrokeData(parsedStrokeData);
//         animateStroke();
//       }
//     }
//   }, []);

//   function drawStroke(
//     points: number[][],
//     strokeSize: number,
//     strokeColor: string
//   ) {
//     if (ctxRef.current) {
//       ctxRef.current.beginPath();
//       ctxRef.current.moveTo(points[0][0], points[0][1]);

//       for (let i = 1; i < points.length; i++) {
//         ctxRef.current.lineTo(points[i][0], points[i][1]);
//       }

//       ctxRef.current.lineWidth = strokeSize;
//       ctxRef.current.strokeStyle = strokeColor;
//       ctxRef.current.stroke();
//     }
//   }

//   function animateStroke() {
//     strokeData?.forEach((stroke) => {
//       //   const startTime = new Date(stroke.startTime).getTime();
//       //   const endTime = new Date(stroke.endTime).getTime();
//       const duration = stroke.endTime - stroke.startTime;
//       const animationStartTime = performance.now();

//       function animate(currentTime: number) {
//         const elapsedTime = currentTime - animationStartTime;
//         const progress = elapsedTime / duration;

//         if (progress < 1) {
//           if (ctxRef.current) {
//             ctxRef.current.clearRect(
//               0,
//               0,
//               canvasRef.current?.width!,
//               canvasRef.current?.height!
//             );

//             const animatedPoints = stroke.positionArray.map((point) => [
//               point[0] * progress,
//               point[1] * progress,
//             ]);

//             const strokeSize = stroke.strokeSize;
//             const strokeColor = stroke.strokeColor;
//             drawStroke(animatedPoints, strokeSize, strokeColor);
//             requestAnimationFrame(animate);
//           }
//         } else {
//           // Animation complete
//           const strokeSize = stroke.strokeSize;
//           const strokeColor = stroke.strokeColor;
//           drawStroke(stroke.positionArray, strokeSize, strokeColor);
//         }
//       }

//       requestAnimationFrame(animate);
//     });
//   }

//   return (
//     <>
//       <canvas
//         ref={canvasRef}
//         width={window.innerWidth}
//         height={window.innerHeight}
//       />
//     </>
//   );
// }
