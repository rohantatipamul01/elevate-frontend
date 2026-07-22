import React from "react";

export default function DashboardCard({ title, value, color }) {
    return (
        <div
            style={{
                background: color,
                padding: "20px",
                borderRadius: "12px",
                color: "white",
                textAlign: "center",
                boxShadow: "0 5px 12px rgba(0,0,0,.2)"
            }}
        >
            <h3>{title}</h3>

            <h1>{value}</h1>
        </div>
    );
}