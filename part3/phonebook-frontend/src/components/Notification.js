import React from "react";

const Notification = ({ message }) => {
  if (!message) return null;
  return (
    <div
      className={`notification ${message.error ? "notification--error" : ""}`}
    >
      {message.msg}
    </div>
  );
};

export default Notification;
