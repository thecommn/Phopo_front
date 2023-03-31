import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { Link } from "react-router-dom";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";
import axios from "axios";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "../css/MypageSlider.css";
import "../css/Imguploadbtn.css";

export default function MpImgSliderGuest({ userEmail }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseImages = await axios.get(
          `http://192.168.0.209:8090/post`
        );
        const posts = responseImages.data.filter(
          (post) => post.email === userEmail
        );
        const urls = posts.map((post) => post.image_url);
        setImageUrls(urls);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, [userEmail]);

  return (
    <>
      <div className="MySwiperTop">
        <Swiper
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect="fade"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectFade]}
          className="mySwiper2"
        >
          {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Link to="/detail">
                <img src={imageUrl} alt={`Imagefile ${index}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={1}
        slidesPerView={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`Imagefile ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}