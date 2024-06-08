"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PropertyImage } from "@prisma/client";
import Image from "next/image";

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
};

interface Props {
  images: PropertyImage[] | undefined;
}

const PropertyImageSlider = ({ images }: Props) => {
  return (
    <Slider {...SLIDER_SETTINGS} arrows={false} className="p-0">
      {images?.map((image) => (
        <div className="relative w-full h-[420px]" key={image?.id}>
          <Image
            fill
            // width={500}
            // height={400}
            src={image.url}
            alt="property image"
            className="rounded-md shadow-md"
          />
        </div>
      ))}
    </Slider>
  );
};

export default PropertyImageSlider;
