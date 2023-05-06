import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./styles.css";
import Register from "./pages/Register";

export default function App() {
    const [username, setUsername] = useState("");
    function ProtectedRoute({ children }) {
        if (!username) {
            return <Navigate to="/" replace />;
        }
        return children;
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Login setUsername={setUsername} />}
                    />
                    <Route path="register" element={<Register setUser={setUsername}/>} />
                    <Route
                        path="dashboard/*"
                        element={
                            <ProtectedRoute>
                                <Dashboard username={username} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
