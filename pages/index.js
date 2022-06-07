import { useState, useEffect, useRef } from "react";
import { data } from "../data/images.js";
import { motion, useAnimation, useMotionValue } from "framer-motion";

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

const banner = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterAnimation = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
  exit: {
    y: -400,
  },
};

const AnimatedLetters = ({ title, canAnimate }) => {
  return (
    <>
      <motion.div
        className="flex flex-row"
        variants={banner}
        initial="initial"
        animate={"animate"}
      >
        {[...title].map((letter, i) => {
          return (
            <motion.p
              key={`l${i}`}
              className={`text-[100px] text-white font-thin`}
              variants={letterAnimation}
            >
              {letter}
            </motion.p>
          );
        })}
      </motion.div>
    </>
  );
};

const gridUtils = [600, 400, 600, 800, 600];

export default function Home() {
  const [gridVisible, setGridVisible] = useState(true);
  const [canAnimate, setcanAnimate] = useState(false);
  const animation = useAnimation();
  const gridRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    async function sequence() {
      await animation.set((index) => {
        return {
          y: gridUtils[index % 5],
          scale: 0.8,
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
        setcanAnimate(true);
      }, 200);
    }
    setTimeout(() => {
      sequence();
    }, 0);
  }, []);

  const handleParallax = (event) => {
    if (gridRef.current && canAnimate) {
      const { width, height } = gridRef.current.getBoundingClientRect();
      const offsetX = event.pageX - width * 0.5;
      const offsetY = event.pageY - height * 0.5;
      const speed = 20 * -1;

      const newTransformX = (offsetX * speed) / 100;
      const newTransformY = (offsetY * speed) / 100;

      x.set(newTransformX);
      y.set(newTransformY);
    }
  };

  return (
    <div className="relative w-screen contentHeight bg-[#292929] overflow-hidden cubicTransistion">
      <div className="fixed top-0 p-4 z-30">
        <button
          className="border border-black p-3"
          onClick={() => setGridVisible(!gridVisible)}
        >
          Switch
        </button>
      </div>

      {!canAnimate && (
        <motion.div
          variants={banner}
          animate={"animate"}
          className="w-full absolute z-30 p-10 left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] grid place-items-center"
        >
          <AnimatedLetters canAnimate={canAnimate} title="Photorealistic" />
          <AnimatedLetters canAnimate={canAnimate} title="Cinematic" />
          <AnimatedLetters canAnimate={canAnimate} title="Beautiful" />
        </motion.div>
      )}

      {gridVisible && (
        <div ref={gridRef} className="gridContainer">
          <motion.div
            onMouseMove={handleParallax}
            style={{ x, y }}
            transition={defaultTransistion}
            className="gridElement"
          >
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
          </motion.div>
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
