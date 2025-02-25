import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import style from "./Boliger.module.scss";
import Slider from "@mui/material/Slider";
import SelectSmall from "../option/Option";

export const Allolig = () => {
  const [randomHus, setRandomHuse] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // Store selected option
  const navigate = useNavigate(); // Hook to navigate to another page

  useEffect(() => {
    fetch("https://api.mediehuset.net/homelands/homes")
      .then((response) => response.json())
      .then((data) => {
        const shuffledImages = shuffleArray(data.items);
        setRandomHuse(shuffledImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  // Filter by selected type
  const filteredHus = selectedType
    ? randomHus.filter((item) => item.type === selectedType)
    : randomHus;

  // Navigate to details page when an item is clicked
  const handleClick = (id) => {
    navigate(`/details/${id}`); // Navigate to the details page with ID
  };

  return (
    <>
      <div className={style.sorts}>
        <h3>Bolig til salg</h3>
        <span>
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </span>
        <span>
          <SelectSmall selectedType={selectedType} setSelectedType={setSelectedType} />
        </span>
      </div>
      <section className={style.randoms}>
        {filteredHus.map((items) => (
          <figure key={items.id} onClick={() => handleClick(items.id)} style={{ cursor: "pointer" }}>
            <img src={items.images[0].filename.medium} alt="" />
            <figcaption>
              <h3>{items.address}</h3>
              <p>
                {items.city} <br />
                {items.type}
              </p>
              <div>
                <p
                  className={style.label}
                  style={{
                    backgroundColor:
                      items.energy_label_name === "A"
                        ? "green"
                        : items.energy_label_name === "B"
                        ? "Orange"
                        : items.energy_label_name === "C"
                        ? "Yellow"
                        : "red",
                  }}
                >
                  {items.energy_label_name}
                </p>
                <p>
                  {items.num_rooms} Værlser, {items.floor_space} m{" "}
                </p>
                <p>{items.price} DK</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
};
