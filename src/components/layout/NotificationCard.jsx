import React from "react";

export default function NotificationCard({ notification }) {

    return (

        <div
            style={{
                background: "#fff3cd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px"
            }}
        >

            <h4>{notification.title}</h4>

            <p>{notification.message}</p>

        </div>

    );

}