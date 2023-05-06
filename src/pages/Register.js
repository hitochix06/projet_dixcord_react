import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import background from "../images/background.png";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile,fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import PasswordStrengthBar from 'react-password-strength-bar';



const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: url(${background});
    background-size: contain;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: 33vw;
    padding: 2rem;
    background-color: var(--background-primary);
    box-shadow: var(--elevation-low);
    border-radius: 5px;
    text-align: center;
    color: var(--primary);
    @media screen and (max-width: 600px) {
      width: 100vw;
      height: 100vh;
    }
    h1 {
        font-size: 24px;
        font-weight: 600;
    }

    h3 {
        font-size: 14px;
        font-weight: 400;
        color: var(--subtitle);
    }

    form {
        display: grid;
        gap: 20px;
        label {
            display: block;
            font-size: 12px;
            color: var(--subtitle);
            font-weight: 700;
            text-transform: uppercase;
            text-align: left;
            &[aria-required]::after {
                content: "*";
                color: red;
                margin-left: 0.5rem;
            }
        }
        input, button {
            color: var(--text)
            padding: 10px;
            padding: 10px;
            max-height: 40px;
            border-radius: 3px;
        }
        input {
            background-color: var(--background-sidebar-server);
        }
        button {
            background-color: var(--blue);
            cursor: pointer;
            transition: background-color 0.1s linear;
            font-size: 1rem;
            &:hover {
                background-color: var(--dark-blue)
            }
        }
    }
    a {
        color: var(--primary);
    }
`;


export default function ({ setUser }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false); // nouvelle variable d'état pour gérer l'erreur de mot de passe
    const [emailError, setEmailError] = useState(false); // nouvelle variable d'état pour gérer l'erreur d'email
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");


// Fonction pour gérer si le mail existe déjà
    function handleRegister(email, username, password) {
        fetchSignInMethodsForEmail(auth, email)
          .then((signInMethods) => {
            if (signInMethods.length > 0) {
                setEmailError(true);
                setInputValue(""); // Effacer la valeur du champ d'e-mail
              return;
            }

     // Vérifie la force du mot de passe
     if (password.length < 8) {
        setPasswordError(true);
        return;
      }

    // code pour créer un compte
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: username,
                }).then(
                    function () {
                        // Profile updated successfully!
                        setUser(username)
                        navigate("/dashboard");
                    },
                    function (error) {
                        // An error happened.
                        alert("Une erreur est survenue lors de la création du compte");
                    }
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                setEmailError("");
            });
    });
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setEmailError(false); // Réinitialise l'erreur d'e-mail
    }

 
    function handleInputValueChange(e) {
        setInputValue(e.target.value);
    }
    
    return (
        <Login>
            <Container>
                <div>
                    <h1>Créer un compte</h1>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister(email, username, password);
                    }}
                >
                    <label htmlFor="email" aria-required>
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={inputValue}
                        onChange={(e) => {
                            handleEmailChange(e);
                            handleInputValueChange(e);
                        }}
                    ></input>
                    <label htmlFor="username" aria-required>
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <label htmlFor="password" aria-required>
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {passwordError && ( // Utilise une expression conditionnelle pour afficher le message d'erreur
                        <p style={{ color: "red" }}>Le mot de passe doit contenir au moins 8 caractères</p>
                    )}
                             {emailError && ( // Affiche un message si l'e-mail existe déjà dans la base de données
            <p style={{ color: "red" }}>Un compte existe déjà avec cette adresse e-mail.</p>
          )}
                    <PasswordStrengthBar password={password} // Ajoute la barre de force du mot de passe
                        shortScoreWord="très faible"// Modifie le mot affiché
                        scoreWords={['faible', 'faible', 'moyen', 'fort', 'très fort', 'Extra fort']}

                    />

                    <button type="submit">S'enregistrer</button>
                </form>
                <br></br>
                <Link to="/">Déjà un compte ? Se connecter</Link>
            </Container>
        </Login>
    );
}
