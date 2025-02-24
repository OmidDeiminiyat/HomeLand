import React, { useEffect, useState } from "react";

export const Staff = () => {
    const [Staff, setStaff] = useState([]);

    useEffect(() => {
      fetch("https://api.mediehuset.net/homelands/staff")
        .then((response) => response.json())
        .then((data) => setStaff(data.items)) 
        .catch((error) => console.error("Error fetching images:", error));
    }, []);
    
    return(
        <>
            <section>
                <h3>Mæd vores ansatte</h3>
                <div>
                    <figure>
                        <img src="" alt="" />
                        <figcaption>
                            <h3>test</h3>
                            <p>ooopd te st fn ufjfjfjf</p>
                        </figcaption>
                    </figure>
                </div>
            </section>
        </>
    )
}