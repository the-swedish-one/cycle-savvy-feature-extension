import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(data);
      console.log(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>My Profile</h2>
      <h5 className="mt-3">ProfilePage: {data?.message} </h5>
    </div>
  );
}
