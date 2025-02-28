import { useState, useEffect } from "react";

import style from './Anmeldelser.module.scss';
import { colors } from "@mui/material";
export const Anmel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [favorites, setFavorites] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
  
    useEffect(() => {
  
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user ? user.access_token : null;
  


        fetch('https://api.mediehuset.net/homelands/reviews', {
          method: 'GET',
          headers: {
       
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            return response.json();
          })
          .then(data => {
            setFavorites(data); // Set fetched data to state
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch(err => {
            setError(err.message); // Handle any errors
            setLoading(false); // Set loading to false even if there's an error
          });
      
    }, []); 
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    const toggleDiv = () => {
        setIsOpen(!isOpen);
      };
    
      console.log(favorites);
      const items = favorites.items;
      const isUse = JSON.parse(sessionStorage.getItem('user'));
          
      
    return(
        <>
            <section className={style.anmel}>
                <h3>Det siger kunderne:</h3>
                <main>
                    <div onClick={toggleDiv} className={style.mainDiv}>
                        <article>
                            <header>
                                <h3>{items[0].title} </h3>
                            </header>
                                <p>{items[0].content}</p>
                                <p>{items[0].user.firstname} {items[0].user.lastname} </p>
                        </article>
                    </div>
                    {isOpen && (
                          
                <div className={style.formSection}>
            {isUse ? (   
                    <form action="">
                    
                        <span>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" />
                            </div>
                            <div>
                                <label htmlFor="Anmel">Anmeldelse:</label>
                                <textarea name="Anmel" id="" rows={4}></textarea>
                            </div>
                        </span>
                        <button>Send</button>
                    </form>
               ) : ( <h3 className={style.err} >You are not loggin</h3> ) }
                </div>
                
                 )}
                </main>

                   


            </section>
        </>
    )
}