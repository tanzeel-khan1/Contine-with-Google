import React from "react";

const LoginWithGoogle = () => {
  return (
    <button
      onClick={() => window.open("http://localhost:5000/auth/google", "_self")}
      className="
        w-full flex items-center justify-center gap-3 cursor-pointer
        border border-gray-300
        py-3 rounded-xl
        text-gray-700 font-medium
        hover:bg-purple-50
        transition
      "
    >
      <svg width="20" height="20" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6-6C34.2 2.6 29.4 0 24 0 14.6 0 6.6 5.4 2.8 13.3l7 5.4C11.7 13.4 17.4 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.1 24.5c0-1.7-.1-2.9-.4-4.2H24v8h12.6c-.3 2-1.9 5.1-5.5 7.1l-.1.6 7.1 5.5.5.1c4.7-4.3 7.5-10.6 7.5-17.1z"
        />
        <path
          fill="#FBBC05"
          d="M9.8 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-.1-.6-7-5.4-.5.2C.8 16.9 0 20.3 0 24s.8 7.1 2.2 10.1l7-5.4.6-.1z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.4 0 11.7-2.1 15.6-5.8l-7.5-5.8c-2 1.4-4.7 2.4-8.1 2.4-6.6 0-12.3-3.9-14.2-9.2l-.6.1-7 5.4-.2.5C6.6 42.6 14.6 48 24 48z"
        />
      </svg>

      <span>Continue with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
