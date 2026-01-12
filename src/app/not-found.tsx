"use client";
import React, { useEffect } from "react";
import axios from "axios";

export default function MEOW() {
  async function Grrr() {
    const reader = new FileReader();

    reader.onload = async (event: any) => {
      const base64String = event.target.result.split(",")[1];

      // Axios simplifies the POST request.
      try {
        const response = await axios.post(
          "https://your-api-endpoint.com/upload",
          { imageData: base64String },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // reader.readAsDataURL(file);

    const Purr = {
      email: "FuckYOU@example.com",
      password: "AFNOOfFd4#%#$",
    };

    const response = await fetch(
      "https://zrmzd0l4-7287.inc1.devtunnels.ms/api/Auth/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify(Purr),
      }
    );
  }

  useEffect(() => {
    Grrr();
  }, []);

  return (
    <img
      src={
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazVlbnYzb2o1NmgyZHM1c2RqejI5NG1zeXBoeGJvb2ljc2x5cTU0eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Xr9TlAqw3S7VPOrftK/giphy.gif"
      }
    ></img>
  );
}
