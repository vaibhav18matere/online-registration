"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Student Registration</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <input
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}