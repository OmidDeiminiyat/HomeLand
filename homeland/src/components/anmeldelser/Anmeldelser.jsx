import { useState } from "react";

import style from './Anmeldelser.module.scss';
export const Anmel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDiv = () => {
        setIsOpen(!isOpen);
      };
    
    return(
        <>
            <section className={style.anmel}>
                <h3>Det siger kunderne:</h3>
                <main>
                    <div onClick={toggleDiv} className={style.mainDiv}>
                        <article>
                            <header>
                                <h3>fandt vjvgj </h3>
                            </header>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptates animi sapiente velit neque, iste voluptate, laboriosam maxime reprehenderit possimus ad in assumenda, quis fugit cupiditate esse illum facere nulla!</p>
                                <p>Omid</p>
                        </article>
                    </div>
                    {isOpen && (
                <div className={style.formSection}>
                    <form action="">
                        <span>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title"  />
                            </div>
                            <div>
                                <label htmlFor="Anmel">Anmeldelse:</label>
                                <textarea name="Anmel" id="" rows={4}></textarea>
                            </div>
                        </span>
                        <button>Send</button>
                    </form>
                </div>
                
                 )}
                </main>

                   


            </section>
        </>
    )
}