import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

export const Slider = (props: { imagesSrc: string[] }) => {
  const { imagesSrc } = props;
  console.log(imagesSrc);
  return (
    <div className="h-full w-[500px] ">
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="flex items-center justify-center"
      >
        {imagesSrc.map((imageSrc) => {
          return (
            <SwiperSlide key={Math.random()}>
              <div className=" flex justify-center">
                <Image
                  width={200}
                  height={200}
                  src={imageSrc}
                  alt="Product image"
                  className="h-[400px] w-[400px] object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
