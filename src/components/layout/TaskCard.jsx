import React from "react";

export default function TaskCard({ task }) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px"
            }}
        >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Progress : {task.progress}%</p>

            <p>Due : {task.dueDate}</p>

        </div>

    );

}