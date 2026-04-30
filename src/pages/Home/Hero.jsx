import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import Container from '../../components/shared/Container';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট

// React Icons
import {
  FaArrowRight,
  FaUserFriends,
  FaPlusCircle,
  FaCalendarAlt,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const brandSecondary = '#fe3885';

const Hero = () => {
  const { t } = useTranslation(); // t ফাংশন ডিক্লেয়ার

  const slides = [
    {
      title: t('hero_slide1_title', 'Discover Local Clubs'),
      subtitle: t(
        'hero_slide1_desc',
        'Find communities that match your passion. Connect with like-minded people today.',
      ),
      buttonText: t('hero_slide1_btn', 'Join a Club'),
      icon: <FaUserFriends />,
      img: 'https://i.ibb.co.com/fGqXGyNd/image.png',
      path: '/clubs',
      theme: {
        colors: {
          start: '#0ea5e9',
          end: brandSecondary,
          shadow: 'shadow-blue-500/30',
        },
        layout: 'flex-col-reverse lg:flex-row',
      },
    },
    {
      title: t('hero_slide2_title', 'Create Your Own Club'),
      subtitle: t(
        'hero_slide2_desc',
        'Start a journey. Host events, manage members, and grow your own community.',
      ),
      buttonText: t('hero_slide2_btn', 'Create a Club'),
      icon: <FaPlusCircle />,
      img: 'https://i.ibb.co.com/fWKCyNm/image.png',
      path: '/pricing',
      theme: {
        colors: {
          start: '#0ea5e9',
          end: brandSecondary,
          shadow: 'shadow-green-500/30',
        },
        layout: 'flex-col-reverse lg:flex-row-reverse',
      },
    },
    {
      title: t('hero_slide3_title', 'Join Exciting Events'),
      subtitle: t(
        'hero_slide3_desc',
        "Don't miss out! Participate in exclusive club activities and make memories.",
      ),
      buttonText: t('hero_slide3_btn', 'Join Events'),
      icon: <FaCalendarAlt />,
      img: 'https://i.ibb.co.com/GQCWYSFG/image.png',
      path: '/events',
      theme: {
        colors: {
          start: '#0ea5e9',
          end: brandSecondary,
          shadow: 'shadow-pink-500/30',
        },
        layout: 'flex-col-reverse lg:flex-row',
      },
    },
  ];

  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-white mb-2 overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#fe3885]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Container>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              const colorClass =
                index === 0
                  ? 'bg-[#0ea5e9]'
                  : index === 1
                    ? 'bg-[#10b981]'
                    : 'bg-[#fe3885]';
              return `<span class="${className} !w-3 !h-3 ${colorClass}"></span>`;
            },
          }}
          loop={true}
          className="w-full h-full py-10"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex items-center justify-between gap-8 lg:gap-16 w-full h-full ${slide.theme.layout}`}
              >
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left z-10 space-y-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm w-fit mx-auto lg:mx-0"
                  >
                    <HiSparkles className="text-yellow-500" />
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-tighter">
                      {t('hero_welcome_badge', 'Welcome to ClubSphere')}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
                  >
                    <span className="text-gray-900 block">
                      {slide.title.split(' ').slice(0, -1).join(' ')}
                    </span>
                    <span className="text-[#0b99ce]">
                      {slide.title.split(' ').slice(-1)}
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                  >
                    <Link
                      to={slide.path}
                      className={`group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-black text-white transition-all duration-300 bg-[#0b99ce] hover:bg-[#fe3885] rounded-2xl shadow-xl ${slide.theme.colors.shadow} active:scale-95 overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
                        {slide.icon} {slide.buttonText}
                      </span>
                      <FaArrowRight className="transition-transform relative z-10 group-hover:translate-x-2" />
                    </Link>
                  </motion.div>
                </div>

                {/* Image Section */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="flex-1 relative z-10 w-full max-w-lg lg:max-w-xl"
                >
                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group border-[12px] border-white">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-[350px] sm:h-[450px] object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};
export default Hero;
