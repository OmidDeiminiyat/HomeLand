import React, { useEffect, useState } from "react";
import style from './Staff.module.scss';
export const Staff = () => {
    const [Staff, setStaff] = useState([]);

    useEffect(() => {
      fetch("https://api.mediehuset.net/homelands/staff")
        .then((response) => response.json())
        .then((data) => setStaff(data.items)) 
        .catch((error) => console.error("Error fetching images:", error));
    }, []);
    
    console.log(Staff);
    
    return(
        <>
            <section className={style.staff}>
                <h3>Mæd vores ansatte</h3>
                <div>
                {Staff.map((items) => (
                    <figure>
                        <img src={items.image} alt={items.name} />
                        <hr />
                        <figcaption>
                            <h3>{items.firstnam} {items.lastname}</h3>
                            <p>{items.position}</p>
                        </figcaption>
                    </figure>
                    ))}
                </div>
            </section>
        </>
    )
}