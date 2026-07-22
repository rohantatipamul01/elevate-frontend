import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthShell from "../components/AuthShell";
import { Field, PasswordInput } from "../components/FormControls";
import { login } from "../api/authService";
import { tokens } from "../styles/theme";

export default function LoginPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const update = (key) => (e) => {

        setForm({
            ...form,
            [key]: e.target.value
        });

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await login(form);

            localStorage.setItem(
                "token",
                response.token
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data ||
                "Invalid Email or Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthShell
            eyebrow="Welcome Back"
            title="Login to Elevate"
            subtitle="Continue your productivity journey."
        >

            {error && (

                <div className="form-error">

                    {error}

                </div>

            )}

            <form onSubmit={handleLogin}>

                <Field label="Email">

                    <input

                        type="email"

                        placeholder="rohan@gmail.com"

                        value={form.email}

                        onChange={update("email")}

                        required

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

                    type="submit"

                    style={{

                        width: "100%",
                        padding: "14px"

                    }}

                    disabled={loading}

                >

                    {

                        loading ?

                            "Logging In..."

                            :

                            <>

                                Login

                                <ArrowRight
                                    size={18}
                                />

                            </>

                    }

                </button>

            </form>

            <p
                style={{
                    marginTop: 20,
                    textAlign: "center",
                    color: tokens.mute
                }}
            >

                Don't have an account?

                <span
                    className="link-text"
                    onClick={() => navigate("/signup")}
                >

                    {" "}Signup

                </span>

            </p>

        </AuthShell>

    );

}