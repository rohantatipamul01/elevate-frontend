import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthShell from "../components/AuthShell";
import { Field, PasswordInput } from "../components/FormControls";
import { signup } from "../api/authService";
import { tokens } from "../styles/theme";

export default function SignupPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        dateOfBirth: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const update = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value
        });
    };

    const handleSignup = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await signup(form);

            alert("Registration Successful");

            navigate("/login");

        } catch (err) {

            setError(
                err.response?.data ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthShell
            eyebrow="Get Started"
            title="Create Your Elevate Account"
            subtitle="Track habits, tasks and build streaks."
        >

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup}>

                <Field label="Full Name">
                    <input
                        type="text"
                        placeholder="Rohan Tatipamul"
                        value={form.fullName}
                        onChange={update("fullName")}
                        required
                    />
                </Field>

                <Field label="Username">
                    <input
                        type="text"
                        placeholder="rohan123"
                        value={form.username}
                        onChange={update("username")}
                        required
                    />
                </Field>

                <Field label="Email">
                    <input
                        type="email"
                        placeholder="rohan@gmail.com"
                        value={form.email}
                        onChange={update("email")}
                        required
                    />
                </Field>

                <Field label="Date of Birth">
                    <input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={update("dateOfBirth")}
                    />
                </Field>

                <Field label="Password">
                    <PasswordInput
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={update("password")}
                    />
                </Field>

                <button
                    className="btn-primary"
                    style={{
                        width: "100%",
                        padding: "14px"
                    }}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Creating Account..."
                            : (
                                <>
                                    Sign Up
                                    <ArrowRight size={18}/>
                                </>
                            )
                    }
                </button>

            </form>

            <p
                style={{
                    marginTop:20,
                    textAlign:"center",
                    color:tokens.mute
                }}
            >
                Already have an account?

                <span
                    className="link-text"
                    onClick={() => navigate("/login")}
                >
                    {" "}Login
                </span>

            </p>

        </AuthShell>

    );

}