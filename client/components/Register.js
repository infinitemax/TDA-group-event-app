import React, { useState } from "react";

const Register = (props) => {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);

    console.log("Register function called");

    props.client.register(
        e.target.email.value,
        e.target.password.value,
        e.target.confirmPassword.value
      )
      .then((response) => {
        console.log(response);
        setDisabled(false);
        props.LoggedIn(response.data.token);
        console.log("User data submitted:", {
          email: e.target.email.value,
          password: e.target.password.value,
          confirmPassword: e.target.confirmPassword.value,
        });
      })
      .catch((error) => {
        console.log(error.response.data)
        console.log(error);
        setDisabled(false);
        alert("Registration failed");
      });
      console.log("Sending to backend:", {
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-5 text-3xl font-semibold text-center text-gray-700">
          Register
        </h1>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 mt-5 text-white rounded-md bg-slate-700 hover:bg-slate-dark"
              disabled={disabled}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-5 text-center text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Login
            </a>
          </div>
        </form>

        <div className="flex items-center mt-6">
          <div className="flex-1 border-t"></div>
          <span className="mx-3 text-gray-600">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        <div className="my-6">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
