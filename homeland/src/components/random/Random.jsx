import React, { useEffect, useState } from "react";
import style from './Random.module.scss';
export const Random = () => {

    const [randomHus, setRandomHuse] = useState([]);

  useEffect(() => {
    fetch("https://api.mediehuset.net/homelands/homes")
      .then((response) => response.json())
      .then((data) =>{
        const shuffledImages = shuffleArray(data.items);
        setRandomHuse(shuffledImages)
      }) 
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

console.log(randomHus);
  
    return(
        <>
        <section className={style.randoms}>
        {randomHus.slice(0, 3).map((items) => (
           <figure key={items.id} >
           <img src={items.images[0].filename.medium} alt="" />
           <figcaption>
               <h3>{items.address}</h3>
               <p>{items.city} <br />{items.type} </p>
               <div>
               <p className={style.label} style={{ backgroundColor: items.energy_label_name === "A" ? "green" 
                  : items.energy_label_name === "B" ? "Orange" : items.energy_label_name === "C" ? "Yellow" : "red" }}>
                    {items.energy_label_name}
                </p>
                   <p> {items.num_rooms} Værlser, {items.floor_space} m </p>
                   <p>{items.price} DK</p>
               </div>
           </figcaption>
       </figure>
        ))}
           
        </section>
        
        </>
    )
}