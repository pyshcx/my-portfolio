"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MediumSlider = () => {
  const articles = [
    { 
      image: '/PHOTO-2025-03-10-19-14-06.jpg',
      title: 'AI in Modern Robotics',
      link: 'https://medium.com/article1',
      date: 'Mar 15, 2024'
    },
    { 
      image: '/PHOTO-2025-03-10-19-24-14.jpg',
      title: 'Machine Learning Basics',
      link: 'https://medium.com/article2',
      date: 'Feb 28, 2024'
    },
    { 
      image: '/PHOTO-2025-03-10-19-24-15.jpg',
      title: 'Advanced AI Techniques',
      link: 'https://medium.com/article3',
      date: 'Jan 12, 2024'
    }
  ];

  return (
    <div className="max-w-md mx-auto mt-12 mb-12">
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
            <div className="relative w-full h-[600px]">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-white mb-4">{article.date}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300 inline-flex items-center"
                >
                  Read Article
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
