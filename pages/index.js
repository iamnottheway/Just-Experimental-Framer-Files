import { useState, useEffect } from "react";
import { data } from "../data/images.js";
import { motion, useAnimation } from "framer-motion";

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

const gridUtils = [400, 600, 700, 800, 400];

export default function Home() {
  const [gridVisible, setGridVisible] = useState(true);
  const loaderControls = useAnimation();
  const animation = useAnimation();

  useEffect(() => {
    async function sequence() {
      await animation.set((index) => {
        return {
          y: gridUtils[index % 5],
          scale: 1.1,
        };
      });

      await animation.start((index) => {
        return {
          y: 0,
          transition: defaultTransistion,
        };
      });

      setTimeout(() => {
        setGridVisible(false);
      }, 200);
    }
    setTimeout(() => {
      sequence();
    }, 0);
  }, []);

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
                <motion.div
                  animate={animation}
                  className="element"
                  key={`a-${i}`}
                  custom={i}
                >
                  <div className="thumbail">
                    <ImageElement src={image.src} id={i} />
                  </div>
                </motion.div>
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
