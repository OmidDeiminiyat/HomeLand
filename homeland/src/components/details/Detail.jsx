import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './Detail.module.scss';
import { FaCamera } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Details = () => {
  const { id } = useParams(); // Get ID from URL
  const [house, setHouse] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMapOpen, setisMapOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`https://api.mediehuset.net/homelands/homes/${id}`)
      .then((response) => response.json())
      .then((data) => setHouse(data.item)) // Store house details
      .catch((error) => console.error("Error fetching house details:", error));
  }, [id]);

  if (!house) return <p>Loading...</p>;

  const backgroundImage = house.images[0]?.filename.large;

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "250px",
  };

  console.log(house);

  // Open Gallery
  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  // Close Gallery
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const openMap = () => {
    setisMapOpen(true);
  };

  const closeMap = () => {
    setisMapOpen(false);
  }

  // Navigate Images
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === house.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? house.images.length - 1 : prevIndex - 1
    );
  };

 
  const handleAddFavorite = async (homeId) => {
    setLoading(true);
    setError(null);
    const body = new URLSearchParams();
    body.append("home_id", homeId)
 
    const userDataString = sessionStorage.getItem('user');
    const token = JSON.parse(userDataString);
    
    try {
      const response = await fetch('https://api.mediehuset.net/homelands/favorites', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access_token}`,
        },
       body: body
      });

      if (!response.ok) {
        throw new Error('Failed to add favorite');
      }

      const data = await response.json();
      console.log('Favorite added:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.allOps}>
      <div style={divStyle}> </div>
      <main>
        <section>
          <div>
            <h3>{house.address}</h3>
            <p> {house.zipcode} {house.city}</p>
            <p>{house.type} | {house.floor_space} m | {house.num_rooms}</p>
            <p>Set {house.num_clicks} gange </p>
          </div>
          <div className={style.icons}>
            <span onClick={openGallery} style={{ cursor: "pointer" }}>
              <FaCamera />
            </span> 
            <span onClick={openMap} style={{ cursor: "pointer" }}><MdLocationCity /></span> 
            <span><FaLocationDot /></span> 
            <span onClick={() => handleAddFavorite(house.id)} disabled={loading}><CiHeart /></span>
           
      {error && <p style={{ color: "red" }}>{error}</p>}
            
          </div>
          <div>
            <h3>Kontantpris: {house.price} </h3> 
            <p>Udbetaling: {house.payout} </p>
            <p>Ejerudgift per måned: {house.cost} </p>
          </div>
        </section>

        <section>
          <div>
            <p>Sagsnr: {house.staff_id} </p> 
            <p>Boligareal: {house.floor_space} </p>
            <p>Groundareal: {house.ground_space} </p>
            <p>Antal room: {house.num_rooms} </p>
            <p>Antal plan: {house.num_floors} </p>
          </div>
          <div>
            <p>Kælder: 10 m </p>
            <p>Byggeår: {house.year_construction} </p>
            <p>Ombygget: {house.year_rebuilt} </p>
            <p>Energymærke: {house.energy_label_name} </p>
            <p>Liggetid: {house.date_friendly} </p>
          </div>
          <div>
            <p>Kontantpris: {house.price} </p>
            <p>Udbetaling: {house.payout}</p>
            <p>Brutto ex. ejerudgift: {house.gross} </p>
            <p>Netto ex. ejerudgift: {house.cost}</p>
            <p>Ejerudgift: {house.net}</p>
          </div>
        </section>

        <section>
          <div>
            <p>{house.description}</p>
          </div>
          <div>
            <h3>Kontakt</h3>
            <figure>
              <img src={house.staff.image} alt={house.staff.firstname} />
              <figcaption>
                <h3>{house.staff.firstname} {house.staff.lastname}</h3>
                <p>{house.staff.position}</p>
                <p>Mobile: {house.staff.phone}</p>
                <p>Email: {house.staff.email}</p>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>

      {isGalleryOpen && (
        <div className={style.galleryOverlay} onClick={closeGallery}>
          <div className={style.galleryContent} onClick={(e) => e.stopPropagation()}>
            <button className={style.prev} onClick={prevImage}>
              <IoIosArrowBack />
            </button>
            <img src={house.images[currentImageIndex]?.filename.large} alt="House" />
            <button className={style.next} onClick={nextImage}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}


        {isMapOpen && (
        <div className={style.galleryOverlay} onClick={closeMap}>
          <div className={style.galleryContent} onClick={(e) => e.stopPropagation()}>
            <img src={house.floorplan.replace("https://api.mediehuset.net/images/homelands//plans/", '')} alt="Map" />
          </div>
        </div>
      )}

    </div>
  );
};
