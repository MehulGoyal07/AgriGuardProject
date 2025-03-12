// components/MaintenanceMode.jsx
const MaintenanceMode = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Under Maintenance 🚧</h1>
        <p className="text-gray-600 mb-6">
          We&apos;re currently working on improving our website. Please check back later.
        </p>
        <p className="text-gray-500">Thank you for your patience!</p>
      </div>
    </div>
  );
};

export default MaintenanceMode;