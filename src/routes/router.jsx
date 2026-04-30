import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home/Home';
import Login from '../pages/AuthPages/Login';
import Register from '../pages/AuthPages/Register';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import Dashboard from '../layouts/Dashboard';
import Clubs from '../pages/Clubs/Clubs';
import Events from '../pages/Events/Events';
import Pricing from '../pages/Pricing/Pricing';
import Profile from '../pages/Profile/Profile';
import ClubsDetails from '../pages/ClubsDetails/ClubsDetails';
import EventsDetails from '../pages/EventsDetails/EventsDetails';
import PaymentCancelled from '../pages/Payment/PaymentCancelled';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import ClubMembershipPaymentSuccess from '../pages/Payment/ClubMembershipPaymentSuccess';
import Admin from '../pages/Dashboard/Admin/Admin';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers';
import ManageClubs from '../pages/Dashboard/Admin/Manage Clubs/ManageClubs';
import Transactions from '../pages/Dashboard/Admin/Transactions/Transactions';
import ClubManager from '../pages/Dashboard/ClubManager/ClubManager';
import MyClubs from '../pages/Dashboard/ClubManager/MyClubs/MyClubs';
import EditClub from '../pages/Dashboard/ClubManager/EditClub/EditClub';
import ClubMembers from '../pages/Dashboard/ClubManager/ClubMembers/ClubMembers';
import EventsManagement from '../pages/Dashboard/ClubManager/EventsManagement/EventsManagement';
import EventRegistrations from '../pages/Dashboard/ClubManager/EventRegistrations/EventRegistrations';
import MemberOverview from '../pages/Dashboard/Member/MemberOverview/MemberOverview';
import MyClubsMember from '../pages/Dashboard/Member/MyClubsMember/MyClubsMember';
import MyEventsMember from '../pages/Dashboard/Member/MyEventsMember/MyEventsMember';
import PaymentHistory from '../pages/Dashboard/Member/PaymentHistory/PaymentHistory';
import EditEvent from '../pages/Dashboard/ClubManager/EditEvent/EditEvent';
import AdminRoute from './AdminRoute';
import ClubManagerRoute from './ClubManagerRoute';
import MemberRoute from './MemberRoute';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import CreateEvent from '../pages/Dashboard/ClubManager/CreateEvent/CreateEvent';
import CreateClub from '../pages/Dashboard/ClubManager/CreateClub/CreateClub';
import PaymentPage from '../pages/Payment/PaymentPage';
import ForgetPassword from '../pages/AuthPages/ForgetPassword';
import ContactSupport from '../pages/FooterPage/ContactSupport';
import PrivacyPolicy from '../pages/FooterPage/PrivacyPolicy';
import TermsOfService from '../pages/FooterPage/TermsOfService';
import HelpCenter from '../pages/FooterPage/HelpCenter';
import Settings from '../pages/Dashboard/Settings/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/login',
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      { path: 'clubs', element: <Clubs /> },
      { path: 'clubs/:id', element: <ClubsDetails /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:id', element: <EventsDetails /> },

      // Footer Links
      { path: 'contact', element: <ContactSupport /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-of-service', element: <TermsOfService /> },
      { path: 'help-center', element: <HelpCenter /> },
      {
        path: 'payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: 'club-membership-payment-success',
        element: (
          <PrivateRoute>
            <ClubMembershipPaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/payment-page',
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/settings',
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-cancelled',
        element: (
          <PrivateRoute>
            <PaymentCancelled />
          </PrivateRoute>
        ),
      },
      { path: 'pricing', element: <Pricing /> },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: '/forget-password',
    element: (
      <GuestRoute>
        <ForgetPassword />
      </GuestRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'payment/:id', element: <PaymentPage /> },

      // --- ADMIN ONLY ROUTES ---
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/manage-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/manage-clubs',
        element: (
          <AdminRoute>
            <ManageClubs />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/transactions',
        element: (
          <AdminRoute>
            <Transactions />
          </AdminRoute>
        ),
      },

      // --- CLUB MANAGER ONLY ROUTES ---
      {
        path: 'manager',
        element: (
          <ClubManagerRoute>
            <ClubManager />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/my-clubs',
        element: (
          <ClubManagerRoute>
            <MyClubs />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/my-clubs/:id/edit',
        element: (
          <ClubManagerRoute>
            <EditClub />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/club-members',
        element: (
          <ClubManagerRoute>
            <ClubMembers />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/events-management',
        element: (
          <ClubManagerRoute>
            <EventsManagement />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/events-management/:id/edit',
        element: (
          <ClubManagerRoute>
            <EditEvent />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/event-registrations',
        element: (
          <ClubManagerRoute>
            <EventRegistrations />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/event-registrations/:eventId',
        element: <EventRegistrations />,
      },
      {
        path: 'manager/create-event',
        element: (
          <ClubManagerRoute>
            <CreateEvent />
          </ClubManagerRoute>
        ),
      },
      {
        path: 'manager/create-club',
        element: (
          <ClubManagerRoute>
            <CreateClub />
          </ClubManagerRoute>
        ),
      },

      // --- MEMBER ONLY ROUTES ---
      {
        path: 'member',
        element: (
          <MemberRoute>
            <MemberOverview />
          </MemberRoute>
        ),
      },
      {
        path: 'member/my-clubs',
        element: (
          <MemberRoute>
            <MyClubsMember />
          </MemberRoute>
        ),
      },
      {
        path: 'member/my-clubs/:id',
        element: (
          <MemberRoute>
            <ClubsDetails />
          </MemberRoute>
        ),
      },
      {
        path: 'member/my-events',
        element: (
          <MemberRoute>
            <MyEventsMember />
          </MemberRoute>
        ),
      },
      {
        path: 'member/payment-history',
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
    ],
  },
  { path: '/*', element: <ErrorPage /> },
]);
