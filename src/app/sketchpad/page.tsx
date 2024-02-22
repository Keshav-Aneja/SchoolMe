"use client";
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    speechRecognition:any
  }
}
import { AudioRecorder } from 'react-audio-voice-recorder';
import React, { useRef, useEffect, useState } from "react";
import DrawingPanel from "@/components/DrawingPanel";
import axios from 'axios';
import Cookies from "js-cookie";
const SketchPad = () => {
  const canvasRef = useRef(null);
  const activeColor = "#000000";
  const ctxRef = useRef(null);
  const [activeBg, setActiveBg] = useState("#000000");
  const [pos, setPos] = useState({ lastX: 0, lastY: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [startRecording, setStartRecording] = useState<any>(null);
  const [color, setSelectedColor] = useState("#262626");
  const [strokeSize, setStrokeSize] = useState(5);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [positionArray, setPositionArray] = useState<any>([]);
  const [strokeData, setStrokeData] = useState<any>({});
  const [isRecording, setIsRecording] = useState(false);
  const [sessionCanvasDetails, setSessionCanvasDetails] = useState<any>([]);
  
  // const [wavFile,setWavFile]=useState<Blob>();
  // const [recordingComplete,setRecordingComplete]=useState<boolean>(true);
  // const [transcript,setTranscript]=useState<string>("");
  // const recognitionRef=useRef<any>()
  //   const canvas: any = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   const draw = (ctx: any, xpos: number, ypos: number) => {
  //     if (!isDrawing.current) return;

  //     ctx.fillStyle = "#000000";
  //     ctx.beginPath();
  //     ctx.arc(xpos, ypos, 10, 0, 2 * Math.PI);

  //     ctx.fill();
  //   };
  const addAudioElement = (blob:Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    // document.body.appendChild(audio);
  };
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
    ctx.lineWidth = strokeSize; //lineThickness;
    ctx.stroke();
    setPos({ lastX: x, lastY: y });
    setPositionArray((prevPos: any) => [...prevPos, [x, y]]);
    // lastX = x;
    // lastY = y;
  }
  function draw(e: any, canvas: any, ctx: any) {
    motion(e, canvas, ctx);
    //   ctx.strokeStyle = activeColorItem.getAttribute("data-key");
    ctx.strokeStyle = color; //activeColor;
  }
  function erase(e: any, ctx: any, canvas: any) {
    motion(e, canvas, ctx);
    ctx.strokeStyle = activeBg;
  }
  function paint(e: any, ctx: any) {
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
  }, []);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const { x, y } = getMousePos(e, canvasRef.current);
    setPos({ lastX: x, lastY: y });
    if (isRecording) {
      const curr_click_time = new Date();
      const diff = curr_click_time.getTime() - startRecording;
      setStartTime(diff);
    }
  };
  const handleMouseMove = (e: any) => {
    if (isDrawing) draw(e, canvasRef.current, ctxRef.current);
  };
  useEffect(() => {
    clearCanvas();
    // console.log(sessionCanvasDetails);
    // fs.write("data.txt", sessionCanvasDetails);
  }, [isRecording]);

  const clearCanvas = () => {
    const ctx = ctxRef.current as CanvasRenderingContext2D | null;
    const canvas = canvasRef.current;

    if (ctx && canvas) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  };
  const handleStartStopRecording = () => {
    if (!isRecording) {
      const curr_time = new Date();
      setIsRecording(true);
      setStartRecording(curr_time.getTime());
    } else {
      setIsRecording(false);
      try {
        const response = axios.post('http://localhost:8000/recording/upload', {
          recording: sessionCanvasDetails
        }, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
    if (isRecording) {
      const curr_click_up_time = new Date();
      const diff = curr_click_up_time.getTime() - startRecording;
      setEndTime(diff);
      const strokeObj = {
        strokeColor: color,
        strokeSize: strokeSize,
        startTime,
        endTime: diff,
        positionArray,
      };
      setStrokeData(strokeObj);
      setSessionCanvasDetails((prevDet: any) => [...prevDet, strokeObj]);
    }
  };
  return (
    <div
      className="canvas-rect w-screen h-screen relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button
        type="button"
        className="px-4 py-2 bg-black  text-white rounded-full absolute top-4 right-4"
        onClick={handleStartStopRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <DrawingPanel
        setColor={setSelectedColor}
        setStrokeSize={setStrokeSize}
        setStart={setStartTime}
        setEnd={setEndTime}
        setPositions={setPositionArray}
        setIsDrawing={setIsDrawing}
        isDrawing={isDrawing}
      />
      <AudioRecorder 
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      downloadOnSavePress={true}
      downloadFileExtension="webm"
    />
    </div>
  );
};

export default SketchPad;