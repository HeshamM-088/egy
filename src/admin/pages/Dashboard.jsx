import React, { useEffect, useState } from "react";

const API_USERS = `https://egi-topaz.vercel.app/api/v1/users`;
const API_EVENTS = `https://egi-topaz.vercel.app/api/v1/events`;

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [error, setError] = useState("");

  const fetchDashboardStats = async () => {
    try {
      const [usersRes, eventsRes] = await Promise.all([
        fetch(API_USERS),
        fetch(API_EVENTS)
      ]);

      const usersJson = await usersRes.json();
      const eventsJson = await eventsRes.json();

      if (!usersRes.ok || !eventsRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      setUsersCount(usersJson.data?.length || 0);
      setEventsCount(eventsJson.data?.length || 0);

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {error && <p className="text-red-400">{error}</p>}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Users" value={usersCount} />
        <Card title="Events" value={eventsCount} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="p-4 border rounded-xl shadow-md">
    <p className="text-sm opacity-70">{title}</p>
    <h2 className="text-3xl font-bold text-teal-500">{value}</h2>
  </div>
);

export default Dashboard;
