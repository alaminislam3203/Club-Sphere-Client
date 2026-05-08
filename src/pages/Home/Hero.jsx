import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import Container from '../../components/shared/Container';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// React Icons
import {
  FaArrowRight,
  FaUserFriends,
  FaPlusCircle,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Hero = () => {
  const { t } = useTranslation();

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
      accentColor: '#605dff',
      layout: 'flex-col-reverse lg:flex-row',
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
      accentColor: '#10b981',
      layout: 'flex-col-reverse lg:flex-row-reverse',
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
      accentColor: '#fe3885',
      layout: 'flex-col-reverse lg:flex-row',
    },
  ];

  return (
    <section className="relative w-full min-h-[500px] flex items-center overflow-hidden py-10 lg:py-0">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="relative group/swiper">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.hero-next',
              prevEl: '.hero-prev',
            }}
            pagination={{
              clickable: true,
              bulletClass:
                'swiper-pagination-bullet !w-2 !h-2 !bg-gray-300 !opacity-100 !transition-all !duration-300',
              bulletActiveClass: '!w-8 !bg-primary !rounded-full',
            }}
            loop={true}
            className="w-full pb-12 md:pb-0"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`mb-12 flex items-center justify-between gap-10 lg:gap-20 ${slide.layout}`}
                >
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center lg:text-left z-10"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white shadow-sm border border-gray-100">
                      <HiSparkles className="text-yellow-500" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                        {t('hero_welcome_badge', 'Premium Community')}
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                      {slide.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span style={{ color: slide.accentColor }}>
                        {slide.title.split(' ').slice(-1)}
                      </span>
                    </h1>

                    <p className="text-base text-gray-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                      {slide.subtitle}
                    </p>

                    <Link
                      to={slide.path}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-primary/30"
                    >
                      <span className="text-sm uppercase tracking-wider">
                        {slide.buttonText}
                      </span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  {/* Styled Image Section */}
                  <div className="flex-1 flex justify-center items-center relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="relative"
                    >
                      <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-dashed border-gray-200 animate-[spin_20s_linear_infinite]" />

                      <div className="relative w-[260px] h-[340px] md:w-[350px] md:h-[450px] p-3 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:rotate-2">
                        <img
                          src={slide.img}
                          alt={slide.title}
                          className="w-full h-full object-cover rounded-[1.5rem]"
                        />

                        <div
                          className="absolute top-6 -right-6 w-20 h-20 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg flex items-center justify-center text-2xl hidden md:flex"
                          style={{ color: slide.accentColor }}
                        >
                          {slide.icon}
                        </div>
                      </div>

                      <div
                        className="absolute -bottom-6 -left-6 w-32 h-32 blur-3xl opacity-20 rounded-full"
                        style={{ backgroundColor: slide.accentColor }}
                      />
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons for Mobile */}
          <div className="flex lg:hidden absolute top-[35%] left-0 right-0 justify-between items-center z-50 px-2 pointer-events-none">
            <button className="hero-prev pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-800 active:scale-95 transition-all border border-gray-100">
              <FaChevronLeft size={14} />
            </button>
            <button className="hero-next pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-800 active:scale-95 transition-all border border-gray-100">
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
