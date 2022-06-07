import { data } from "../data/images.js";

const GridList = ({ data }) => {
  return (
    <div className="w-full relative flex flex-col-reverse h-screen pt-10 pb-0 px-20">
      <div className="block relative ">
        {data.map((image, i) => {
          return (
            <div className="relative m-0" key={`a-${i}`} custom={i}>
              <div className="thumbail">
                <img
                  className="w-full h-full object-contain"
                  src={image.src}
                ></img>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MainContainer = () => {
  return (
    <div className="w-full contentHeight relative  ">
      <div className="w-full flex justify-center relative py-10">
        <GridList data={data} />
        <GridList data={data} />
        <GridList data={data} />
      </div>
    </div>
  );
};

export default MainContainer;
