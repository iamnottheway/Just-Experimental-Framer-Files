import { useState } from "react";
import { data } from "../data/images.js";
import { motion } from "framer-motion";

const defaultTransistion = {
  duration: 1.25,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const ImageElement = ({ src, id }) => {
  return (
    <motion.img
      layoutId={`container-${id}`}
      className="w-full h-full object-contain"
      src={src}
      transition={defaultTransistion}
    ></motion.img>
  );
};

export default function Home() {
  const [gridVisible, setGridVisible] = useState(true);
  return (
    <div className="relative w-screen contentHeight bg-blue-600 overflow-hidden cubicTransistion">
      <div className="fixed top-0 p-4 z-30">
        <button
          className="border border-black p-3"
          onClick={() => setGridVisible(!gridVisible)}
        >
          Switch
        </button>
      </div>
      {gridVisible && (
        <div className="gridContainer">
          <div className="gridElement">
            {data.map((image, i) => {
              return (
                <div className="element" key={i}>
                  <div className="thumbail">
                    <ImageElement src={image.src} id={i} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!gridVisible && (
        <div className="list-elements">
          {data.map((image, i) => {
            return (
              <div className="listElement" key={i}>
                <ImageElement src={image.src} id={i} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
