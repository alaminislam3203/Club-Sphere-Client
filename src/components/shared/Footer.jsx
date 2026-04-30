import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Language/LanguageSwitcher';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-slate-600 pt-16 pb-8 border-t border-slate-100 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              CLUB<span className="text-[#0b99ce] ml-1">SPHERE</span>
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              {t(
                'footer_about_text',
                'Connecting passionate individuals with extraordinary clubs...',
              )}
            </p>
          </div>

          {/* Explore Sections */}
          <div>
            <h3 className="text-slate-900 font-black text-[10px] mb-6 uppercase tracking-[0.2em] opacity-50">
              {t('footer_explore_title', 'Explore')}
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link to="/" className="hover:text-[#0b99ce] transition-colors">
                  {t('nav_home', 'Home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('footer_browse_clubs', 'Browse All Clubs')}
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('footer_upcoming_events', 'Upcoming Events')}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('nav_pricing', 'Membership Pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-slate-900 font-black text-[10px] mb-6 uppercase tracking-[0.2em] opacity-50">
              {t('footer_support_title', 'Support')}
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link
                  to="/help-center"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('footer_help_center', 'Help Center')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('footer_tos', 'Terms of Service')}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('footer_privacy', 'Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#0b99ce] transition-colors"
                >
                  {t('footer_contact_support', 'Contact Support')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-black text-[10px] mb-6 uppercase tracking-[0.2em] opacity-50">
              {t('footer_office_title', 'Office')}
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#0b99ce]" />
                <span className="text-slate-500">
                  {t('footer_address', 'Sector 10, Uttara')}
                  <br />
                  {t('footer_city', 'Dhaka, Bangladesh')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#0b99ce]" />
                <span className="text-slate-500">+880 1234 567 890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Language Section */}
        <div className="flex flex-col items-center gap-6 mb-10 pt-10 border-t border-slate-50">
          <LanguageSwitcher />

          {/* Social Icons */}
          <div className="flex gap-4">
            <SocialLink
              href="https://github.com/alaminislam3203"
              icon={<FaGithub size={18} />}
            />
            <SocialLink
              href="https://www.linkedin.com/in/alaminislam3203/"
              icon={<FaLinkedin size={18} />}
            />
            <SocialLink
              href="https://x.com/alamin_codes"
              icon={<FaTwitter size={18} />}
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          © {currentYear} ClubSphere.{' '}
          {t('footer_rights', 'All rights reserved.')}
        </div>
      </div>
    </footer>
  );
}

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-slate-50 text-slate-400 hover:text-white hover:bg-[#0b99ce] rounded-2xl transition-all duration-300 shadow-sm border border-slate-100 active:scale-90"
  >
    {icon}
  </a>
);
