import style from './Login.module.scss';
import { useState } from "react";

export function LoginComp() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const credentials = {
        username: email,
        password: password,
      };
  
      try {
        const response = await fetch("https://api.mediehuset.net/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          alert("Login successful!");
          window.location.href = "/admin"; 
        } else {
          setError(data.message || "Invalid credentials");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      }
    };
    
    return(
        <>
            <main className={style.loginComp}>
                <h3>Login</h3>
                <p>Indsat dit brugenavn og adgangskode for at logge ind</p>
                <form onSubmit={handleSubmit}>
                {error && <p className={style.Err}>{error}</p>}
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Brugnavn" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  placeholder="Adgangskode"/>
                    <div className={style.butts}>
                        <button type='submit'>Login</button>
                        <button>Annuller</button>
                    </div>
                    
                </form>
            </main>
        </>
    )
}