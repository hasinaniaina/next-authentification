import React from 'react'

export default function ForgotPaswword() {
  return (
    <div className="content">
      <div className="title">
        <h2>Forgot Password Form</h2>
      </div>
      <div className="input">
        <input type="email" className="email" placeholder="Email" />
      </div>
      <div className="button">
        <button>Send</button>
      </div>
    </div>
  )
}
