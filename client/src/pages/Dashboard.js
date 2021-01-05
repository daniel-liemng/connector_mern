import React, { useEffect } from "react";
import { useProfileContext } from "../context/profileContext";

const Dashboard = () => {
  const { getCurrentProfile } = useProfileContext();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
