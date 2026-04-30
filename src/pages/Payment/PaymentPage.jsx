import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import {
  FaCreditCard,
  FaTag,
  FaLock,
  FaSpinner,
  FaDollarSign,
  FaCheckCircle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Loading from '../Loading';

const PaymentPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isProcessing, setIsProcessing] = useState(false);

  const { price, planName } = location.state || {};

  // --- Validation ---
  if (authLoading) return <Loading />;

  if (price === undefined || price === null) {
    Swal.fire(
      t('alert_error', 'Error'),
      t('pay_details_missing', 'Payment details missing. Redirecting...'),
      'error',
    );
    setTimeout(() => navigate('/pricing'), 1500);
    return <Loading />;
  }

  const finalCost = parseFloat(price);

  // --- Payment & Database Logic ---
  const handlePaymentInitiation = async () => {
    if (!user?.email) {
      Swal.fire(
        t('alert_warning', 'Warning'),
        t('login_to_continue', 'Please login to continue'),
        'warning',
      );
      return navigate('/login');
    }

    setIsProcessing(true);

    const paymentPayload = {
      userEmail: user.email,
      userName: user.displayName,
      amount: finalCost,
      planName: planName,
      paymentType: 'plan-membership',
      status: 'active',
      date: new Date(),
    };

    try {
      if (finalCost === 0) {
        await axiosSecure.post('/save-membership', paymentPayload);

        Swal.fire({
          title: t('success_title', 'Success!'),
          text: t('plan_active_msg', { plan: planName }),
          icon: 'success',
          confirmButtonColor: '#0b99ce',
          customClass: { popup: 'rounded-[2rem]' },
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        const res = await axiosSecure.post(
          '/payment-checkout-session',
          paymentPayload,
        );

        if (res.data.url) {
          window.location.replace(res.data.url);
        }
      }
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error(t('payment_failed', 'Payment processing failed.'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="bg-slate-50 py-16 min-h-screen flex items-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto w-full bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b99ce]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="w-20 h-20 bg-blue-50 text-[#0b99ce] rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner group transition-transform hover:scale-110 duration-500">
            {finalCost === 0 ? (
              <FaCheckCircle className="text-emerald-500" />
            ) : (
              <FaCreditCard className="group-hover:rotate-12 transition-transform" />
            )}
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {finalCost === 0
              ? t('activate_plan_title', 'Activate Plan')
              : t('checkout_pay_title', 'Checkout Payment')}
          </h1>
          <p className="text-slate-500 font-medium mt-3 leading-relaxed">
            {t('finalize_subscription', 'Finalize your')}{' '}
            <span className="text-[#0b99ce] font-black">{planName}</span>{' '}
            {t('subscription_label', 'subscription')}
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50 p-8 rounded-[2rem] space-y-5 mb-10 border border-slate-100 relative">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.15em] text-slate-400">
              <FaTag className="text-[#0b99ce]" />{' '}
              {t('plan_selected', 'Plan Selected')}:
            </span>
            <span className="text-slate-800 font-black tracking-tight bg-white px-4 py-1 rounded-lg shadow-sm">
              {planName}
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-slate-200 pt-6">
            <span className="flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.15em] text-slate-400">
              <FaDollarSign className="text-[#fe3885]" />{' '}
              {t('amount_to_pay', 'Amount to Pay')}:
            </span>
            <span className="text-5xl font-black text-slate-900 tracking-tighter">
              {finalCost === 0
                ? t('fee_free', 'FREE')
                : `$${finalCost.toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePaymentInitiation}
          disabled={isProcessing}
          className={`w-full py-6 rounded-2xl font-black text-lg uppercase tracking-widest text-white shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 active:scale-95
            ${
              isProcessing
                ? 'bg-slate-300 cursor-not-allowed'
                : finalCost === 0
                  ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                  : 'bg-[#0b99ce] hover:bg-[#fe3885] shadow-blue-100 hover:shadow-rose-100'
            }`}
        >
          {isProcessing ? (
            <>
              <FaSpinner className="animate-spin" />{' '}
              {t('btn_processing', 'Processing...')}
            </>
          ) : (
            <>
              {finalCost === 0
                ? t('btn_activate_starter', 'Activate Starter Plan')
                : t('btn_confirm_pay', 'Confirm & Pay Now')}
              <FaCheckCircle size={18} className="opacity-50" />
            </>
          )}
        </button>

        {/* Trust Badge */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-[0.2em]">
            <FaLock
              className={
                finalCost === 0 ? 'text-emerald-500' : 'text-[#0b99ce]'
              }
            />
            {finalCost === 0
              ? t('secure_activation', 'Secure Activation')
              : t('secure_encryption', 'Secure Encryption by Stripe')}
          </p>
          {finalCost > 0 && (
            <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
                className="h-5"
              />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentPage;
