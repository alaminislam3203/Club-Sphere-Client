import React from 'react';
import Hero from './Hero';
import UpcomingEvents from './UpcomingEvents';
import FeaturedClubs from './FeaturedClubs';
import HowClubSphereWorks from './HowClubSphereWorks';
import WhyJoinClub from './WhyJoinClub';
import PopularCategories from './PopularCategories';
import SendMassage from '../../components/shared/SendMassage';

const Home = () => {
  return (
    <div className="bg-white min-h-screen transition-colors duration-300">
      <Hero />
      <UpcomingEvents />
      <PopularCategories />
      <FeaturedClubs />
      <HowClubSphereWorks />
      <WhyJoinClub />
      <SendMassage />
    </div>
  );
};

export default Home;
