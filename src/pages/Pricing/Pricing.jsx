import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Container from '../../components/shared/Container';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import {
  IoDiamondOutline,
  IoRocketOutline,
  IoLeafOutline,
} from 'react-icons/io5';

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pricingPlans = [
    {
      id: 1,
      name: t('plan_starter_name', 'Starter'),
      price: 0,
      period: t('plan_period_forever', '/forever'),
      description: t(
        'plan_starter_desc',
        'Perfect to explore clubs and join free events.',
      ),
      features: [
        t('feat_join_3', 'Join up to 3 clubs'),
        t('feat_free_events', 'Access free events'),
        t('feat_community', 'Community support'),
        t('feat_badge', 'Basic profile badge'),
        t('feat_notif', 'Event notifications'),
      ],
      unavailable: [
        t('feat_create_club', 'Create your own club'),
        t('feat_priority', 'Priority support'),
        t('feat_adfree', 'Ad-free experience'),
      ],
      buttonText: t('btn_get_started', 'Get Started Free'),
      popular: false,
      icon: <IoLeafOutline />,
      color: 'text-green-500',
      btnColor: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    },
    {
      id: 2,
      name: t('plan_pro_name', 'Pro Member'),
      price: 9.99,
      period: t('plan_period_month', '/month'),
      description: t(
        'plan_pro_desc',
        'Ideal for active members participating in paid events.',
      ),
      features: [
        t('feat_unlimited_clubs', 'Join unlimited clubs'),
        t('feat_paid_events', 'Register for paid events'),
        t('feat_247', 'Priority 24/7 support'),
        t('feat_premium_content', 'Access to premium content'),
        t('feat_verified_badge', 'Verified Member Badge'),
        t('feat_no_ads', 'No advertisements'),
      ],
      unavailable: [],
      buttonText: t('btn_subscribe', 'Subscribe Now'),
      popular: true,
      icon: <IoRocketOutline />,
      color: 'text-[#0b99ce]',
      btnColor:
        'bg-gradient-to-r from-[#0b99ce] to-[#0ea5e9] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    },
    {
      id: 3,
      name: t('plan_manager_name', 'Club Manager'),
      price: 19.99,
      period: t('plan_period_month', '/month'),
      description: t(
        'plan_manager_desc',
        'Best for club managers or power members.',
      ),
      features: [
        t('feat_all_pro', 'All Pro features included'),
        t('feat_manage_5', 'Create & Manage 5 Clubs'),
        t('feat_exclusive', 'Host exclusive events'),
        t('feat_dedicated', 'Dedicated account manager'),
        t('feat_analytics', 'Advanced analytics dashboard'),
        t('feat_branding', 'Custom club branding'),
      ],
      unavailable: [],
      buttonText: t('btn_premium', 'Go Premium'),
      popular: false,
      icon: <IoDiamondOutline />,
      color: 'text-[#fe3885]',
      btnColor: 'bg-gray-900 text-white hover:bg-gray-800',
    },
  ];

  const handleSubscription = plan => {
    if (!user) {
      Swal.fire({
        title: t('auth_required_title', 'Authentication Required'),
        text: t(
          'auth_required_desc',
          'Please login to choose a membership plan.',
        ),
        icon: 'warning',
        confirmButtonColor: '#0b99ce',
      });
      return navigate('/login');
    }

    navigate('/dashboard/payment-page', {
      state: {
        price: plan.price,
        planName: plan.name,
      },
    });
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0b99ce]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#fe3885]/5 rounded-full blur-[120px]"></div>
      </div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-4"
          >
            <HiSparkles className="text-[#fe3885]" />
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              {t('pricing_badge', 'Flexible Pricing')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            {t('pricing_title_start', 'Choose Your')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b99ce] to-[#fe3885]">
              {t('pricing_title_end', 'Plan')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg"
          >
            {t(
              'pricing_subtitle',
              "Whether you're just exploring or managing a community, we have a plan for you. No hidden fees.",
            )}
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl bg-white flex flex-col h-full border transition-all duration-300 ${
                plan.popular
                  ? 'border-[#0b99ce] shadow-2xl shadow-blue-200/50 scale-105 z-10 ring-4 ring-[#0b99ce]/10'
                  : 'border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0b99ce] to-[#0ea5e9] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <HiSparkles className="text-yellow-300" />{' '}
                  {t('badge_popular', 'Most Popular')}
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gray-50 ${plan.color}`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm mt-2 min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-500 align-top">
                    $
                  </span>
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 font-medium ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 p-0.5 rounded-full bg-green-100 text-green-600">
                      <FaCheck size={10} />
                    </div>
                    <span className="text-gray-600 text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.unavailable.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-50">
                    <div className="mt-1 p-0.5 rounded-full bg-gray-100 text-gray-400">
                      <FaTimes size={10} />
                    </div>
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscription(plan)}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${plan.btnColor}`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
