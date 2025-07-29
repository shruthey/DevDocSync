import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    department: "",
    position: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTestRegistration = async () => {
    const testData = {
      email: "test" + Date.now() + "@example.com",
      password: "testpassword123",
      first_name: "Test",
      last_name: "User",
    };

    console.log("Testing registration with:", testData);
    setIsLoading(true);
    setError("");

    try {
      await register(testData);
      alert("Test registration successful!");
    } catch (error) {
      console.error("Test registration error:", error);
      setError(
        "Test registration failed: " +
          (error?.detail || error?.message || "Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for registration (exclude confirmPassword)
      const { confirmPassword, ...registrationData } = formData;

      console.log("Attempting registration with:", registrationData);
      await register(registrationData);

      // Show success message and redirect to login
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different error formats
      let errorMessage = "Registration failed. Please try again.";

      if (error?.detail) {
        if (Array.isArray(error.detail)) {
          errorMessage = error.detail.map((err) => err.msg || err).join(", ");
        } else if (typeof error.detail === "string") {
          errorMessage = error.detail;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Join DevDocSync</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g., Engineering, Marketing"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g., Software Engineer, Manager"
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <button
            type="button"
            onClick={handleTestRegistration}
            className="register-button"
            disabled={isLoading}
            style={{ marginTop: "10px", backgroundColor: "#28a745" }}
          >
            Test Registration (Debug)
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
