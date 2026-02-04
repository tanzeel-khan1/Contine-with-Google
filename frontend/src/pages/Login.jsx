import React from 'react'

const Login = () => {
  return (
    <div>
            <button onClick={() => window.open("http://localhost:5000/auth/google", "_self")}>Login with google</button>

    </div>
  )
}

export default Login