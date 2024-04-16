import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import './homestayDetail.css'

import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'


const HomestayDetail = () => {
  const { id } = useParams();
  const [homestayData, setHomestayData] = useState(null);
  const location = useLocation()
  // const id = location.pathname.split('/')[2]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [slideNumber , setSlideNumber] = useState(0)

  const [open , setOpen] = useState(false)
  const photos = [
    {
      src:'https://a0.muscache.com/im/pictures/miso/Hosting-814355236310428415/original/724afd24-d291-4478-8312-0d32bee21f1d.jpeg?im_w=1200'
    },
    {
      src : 'https://a0.muscache.com/im/pictures/miso/Hosting-814355236310428415/original/1e122645-4f0a-4b1f-bd03-fe9b97ae435d.jpeg?im_w=720'
    },
    {
      src : 'https://a0.muscache.com/im/pictures/miso/Hosting-814355236310428415/original/60ad953d-abc8-4465-a8cd-10cf1a12bb51.jpeg?im_w=720'
    },
    {
      src : 'https://a0.muscache.com/im/pictures/miso/Hosting-814355236310428415/original/8f5a3685-3246-4c0f-b583-b8e9de839b14.jpeg?im_w=1200'
    },
    {
      src : 'https://a0.muscache.com/im/pictures/miso/Hosting-814355236310428415/original/6f798f49-b59a-4259-aeb9-34010793af5d.jpeg?im_w=720'
    },
    {
      src : 'https://a0.muscache.com/im/pictures/miso/Hosting-814355236310428415/original/ea1b1f11-4b29-4aed-8593-509b969ada42.jpeg?im_w=720'
    }
  ]
  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }
  const handleMove = (direction) => {
    let newSlideNumber
    if(direction === 'p') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/homestays/homestay/${id}`);
        setHomestayData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHomestay();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className='homestayContainer'>
        {open && <div className='slider'>
          <FontAwesomeIcon icon={faCircleXmark} className='close'onClick={() => setOpen(false)}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove('p')}/>
          <div className='sliderWrapper'>
            <img src={photos[slideNumber].src} alt='' className='sliderImg'/>
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove('n')}/>
          </div>}

    <div className='homestayDetails'>
        {homestayData !== null ? (
                <div className='homestayWrapper'>
                <button className='bookNow' onClick={()=> navigate('/all-rooms')}>Reserve or Book Now!</button>
                <h1 className='homestayTitle'>{homestayData.homestayName}</h1>
                <div className='homestayAddress'>
                  <FontAwesomeIcon icon={faLocationDot}/>
                  <span>{homestayData.homestayAddress}</span>
        
                </div>
                <span className='homestayDistance'>Near Flower Market - 4.1km from center</span>
                  <span className='homestayPriceHighlight'>
                    Book a stay over $99 and get free taxi from airport
                    </span>
                    <div className='homestayImages'>
                        {photos.map((photo,i) => (
                          <div className='homestayImgWrapper'>
                            <img 
                            onClick={() => handleOpen(i)}
                            src={photo.src} 
                            alt='' 
                            className='homestayImg'/>
                          </div>
                        ))}
                    </div>
                    <div className='homestayDetails'>
                      <div className='homestayDetailsTexts'>
                        <h1 className='homestayTitle'>Stay in the heart of West lake</h1>
                        <p className='homestayDesc'>
                        {homestayData.description}
                        </p>
                      </div>
                    
                      <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
                    </div>
              </div>
                ) : (
                    <p>Loading homestay information...</p>
                )}
              </div>
              <MailList/>
      <Footer/>
      </div>
      
    </div>
  );
};

export default HomestayDetail;
