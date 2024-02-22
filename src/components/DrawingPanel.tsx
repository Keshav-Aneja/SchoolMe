import React from "react";
import Image from "next/image";
interface Props {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setStrokeSize: React.Dispatch<React.SetStateAction<number>>;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  setEnd: React.Dispatch<React.SetStateAction<number>>;
  setPositions: any;
  setIsDrawing: any;
  isDrawing: boolean;
}
const DrawingPanel = ({
  setColor,
  setStrokeSize,
  setStart,
  setEnd,
  setPositions,
  setIsDrawing,
  isDrawing,
}: Props) => {
  return (
    <div className="w-[60%] h-24 rounded-3xl border-[1px] border-[#aeaeae] shadow-lg absolute bottom-12 left-1/2 -translate-x-1/2 bg-white overflow-hidden px-4 pt-2 flex gap-4">
      <Image
        src="/pencil.png"
        alt="pencil"
        width={200}
        height={200}
        className="h-24 w-12 translate-y-4 hover:translate-y-0 transition-all duration-100 ease-linear hover:scale-110 shadow-xl"
        onClick={() => setIsDrawing(!isDrawing)}
      />
      <Image
        src="/eraser.png"
        alt="pencil"
        width={200}
        height={200}
        className="h-24 w-12 translate-y-4 hover:translate-y-0 transition-all duration-100 ease-linear hover:scale-110"
      />
      <div className="stroke-panel flex gap-4 items-center h-full">
        <div
          className="w-12 aspect-square bg-black rounded-full"
          onClick={() => setStrokeSize(20)}
        ></div>
        <div
          className="w-8 aspect-square bg-black rounded-full"
          onClick={() => setStrokeSize(10)}
        ></div>
        <div
          className="w-4 aspect-square bg-black rounded-full"
          onClick={() => setStrokeSize(5)}
        ></div>
      </div>
      <div className="Color-Palette flex gap-2 items-center h-full">
        {colors.map((color, i) => (
          <div
            className="w-8 aspect-square rounded-full"
            key={i}
            style={{ background: color }}
            onClick={() => setColor(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DrawingPanel;

const colors = ["#f6ce1b", "#9fde54", "#4fc0d0", "#f86f03", "#262626"];
