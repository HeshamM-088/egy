const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Overview of the site activity.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Users" value="128" />
        <Card title="Events" value="9" />
        <Card title="Visits" value="12.4k" />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-3xl font-bold text-teal-700 dark:text-teal-400">
        {value}
      </div>
    </div>
  );
};

export default Dashboard;
