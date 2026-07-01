import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";
import "./ProfilePage.css";
import LoadingScreen from "../components/LoadingScreen";

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

      } catch (error) {

        console.log(error);

      } finally{
        setLoading(false);
      }

    };

    fetchProfile();

  }, []);

  

  if (loading) {

    return <LoadingScreen />;

  }

  if (!user) {

    return (
      <div className="empty-state-card">
        <h2>User Not Found</h2>
        <p>
          Unable to load profile data.
        </p>
      </div>
    );

  }

  return (

    <div className="profile-page page-enter">

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>

          <div>

            <h1>{user.name}</h1>

            <p>{user.email}</p>

          </div>

        </div>

        <div className="profile-stats">

          <div className="stat-box">

            <h2>
              {user.solvedProblems.length}
            </h2>

            <p>Problems Solved</p>

          </div>

          <div className="stat-box">

            <span
              className={`role-badge ${user.role}`}
            >
              {user.role}
            </span>

            <p>Role</p>

          </div>

          <div className="stat-box">

            <h2>
              {new Date(user.createdAt).toLocaleDateString()}
            </h2>

            <p>Joined</p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProfilePage;