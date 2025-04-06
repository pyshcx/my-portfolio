"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MediumSlider = () => {
  const articles = [
    { 
      image: '/PHOTO-2025-04-06-16-31-30.jpg',
       link: 'https://medium.com/@pranayshah19/gm-and-nvidia-forge-powerful-ai-alliance-to-transform-automotive-manufacturing-and-vehicle-c0efc09e2b81',
    },
    { 
      image: '/PHOTO-2025-03-10-19-14-06.jpg',
      link: 'https://medium.com/@pranayshah19/ultraviolette-automotive-ferrari-backed-indian-ev-innovator-brings-autonomous-tech-to-two-wheelers-2c09e2437ac7',
    },
    { 
      image: '/PHOTO-2025-03-10-19-24-15.jpg',
      link: 'https://medium.com/@pranayshah19/autonomous-speed-record-shattered-maserati-mc20-hits-197-7-mph-with-no-human-behind-the-wheel-9a0fe1cf8058',
    },
    { 
      image: '/PHOTO-2025-03-10-19-24-14.jpg',
      link: 'https://medium.com/@pranayshah19/byds-god-s-eye-redefining-autonomous-driving-accessibility-and-industry-competition-01577d90b787',
    }
  ];

  return (
    <div className="max-w-md mx-auto">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Pagination, Navigation]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        navigation={true}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px] overflow-hidden rounded-xl shadow-lg flex items-center justify-center bg-black">
              <img 
                src={article.image} 
                alt={article.title || "Article image"}
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-white hover:text-[#00BFA6] transition-all duration-300"
                >
                  <span className="mr-2 font-medium">Read on Medium</span>
                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediumSlider;
