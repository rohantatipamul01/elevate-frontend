import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function TasksPage() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [dueDate, setDueDate] = useState("");

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const response = await api.get("/tasks");

            setTasks(response.data);

        } catch (e) {

            console.log(e);

        }

    };

    const createTask = async () => {

        try {

            await api.post("/tasks", {

                title,
                description,
                dueDate

            });

            setTitle("");
            setDescription("");
            setDueDate("");

            loadTasks();

        } catch (e) {

            console.log(e);

        }

    };

    const completeTask = async (id) => {

        await api.put(`/tasks/${id}/complete`);

        loadTasks();

    };

    const deleteTask = async (id) => {

        await api.delete(`/tasks/${id}`);

        loadTasks();

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>My Tasks</h1>

            <br/>

            <input
                placeholder="Task Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <br/><br/>

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />

            <br/><br/>

            <input
                type="date"
                value={dueDate}
                onChange={(e)=>setDueDate(e.target.value)}
            />

            <br/><br/>

            <button onClick={createTask}>
                Create Task
            </button>

            <hr/>

            {

                tasks.map(task=>(

                    <div
                        key={task.id}
                        style={{
                            border:"1px solid gray",
                            padding:"20px",
                            marginBottom:"20px"
                        }}
                    >

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>

                            Progress :

                            {task.progress}%

                        </p>

                        <p>

                            Due :

                            {task.dueDate}

                        </p>

                        <button
                            onClick={()=>completeTask(task.id)}
                        >
                            Complete
                        </button>

                        <button
                            onClick={()=>deleteTask(task.id)}
                            style={{
                                marginLeft:"20px"
                            }}
                        >
                            Delete
                        </button>

                    </div>

                ))

            }

        </div>

    );

}