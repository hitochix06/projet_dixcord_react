import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container } from "../components/Login/Container";
import { Wrapper } from "../components/Login/Wrapper";
import { auth } from "../firebase.config";

export default function ({ setUsername }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUsername(user.displayName);
                setError(null);
                alert("Connexion réussie !");
                navigate("/dashboard");
            })
            .catch((error) => {
                setError("Adresse e-mail ou mot de passe incorrect.");
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                setEmail("");
                setPassword("");
            });
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setError(null);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setError(null);
    }

    return (
        <Container>
            <Wrapper>
                <div>
                    <h1>Ha, te revoilà !</h1>
                    <h3>Nous sommes si heureux de te revoir !</h3>
                </div>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email" aria-required>
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <label htmlFor="password" aria-required>
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}


                    <button type="submit" >Connexion</button>
                </form>
                <br />
                <Link to="register">S'enregistrer</Link>
            </Wrapper>
        </Container>
    );
}
