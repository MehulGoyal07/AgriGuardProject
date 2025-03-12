import { FaTools } from 'react-icons/fa'; // Example icon for maintenance

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 md:p-16 rounded-lg shadow-lg text-center max-w-lg mx-auto">
        {/* Icon */}
        <div className="text-orange-500 mb-6">
          <FaTools className="text-6xl mx-auto" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          We&apos;ll Be Back Soon!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Our website is currently undergoing scheduled maintenance. We apologize for any inconvenience. Please check back later or contact us if you need immediate assistance.
        </p>

        {/* Action Button */}
        <a
          href="mailto:support@yourdomain.com"
          className="inline-block bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default MaintenancePage;
