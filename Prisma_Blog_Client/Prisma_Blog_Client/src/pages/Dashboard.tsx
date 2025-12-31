import { useEffect, useState } from "react";
import { getMe } from "../services/api";
import type { User } from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome {user.name}</h2>

      {user.role === "ADMIN" && (
        <p className="mt-4 text-red-500">Admin Access Enabled</p>
      )}
    </div>
  );
};

export default Dashboard;
