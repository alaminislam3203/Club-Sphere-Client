import { Link } from 'react-router';
const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">
        You Are Forbidden to Access This Page
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Please contact the administrator if you believe this is an error.
      </p>
      <div className="my-3 space-x-3">
        <Link to="/" className="btn btn-primary text-black">
          {' '}
          Go to Home
        </Link>
        <Link className="btn btn-secondary" to="/dashboard">
          {' '}
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
