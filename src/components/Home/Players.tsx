import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import playersData from '../../data/players.json';
import './Players.css';

interface Player {
  number: string;
  nameThai: string;
  nameEn: string;
  image: string;
  id: string;
}

export default function Players() {
  const { language } = useLanguage();
  const players: Player[] = playersData.players;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Responsive players per view
  const getPlayersPerView = () => {
    if (window.innerWidth < 576) return 1; // Mobile
    if (window.innerWidth < 992) return 2; // Tablet
    return 4; // Desktop
  };

  const [playersPerView, setPlayersPerView] = useState(getPlayersPerView());

  useEffect(() => {
    const handleResize = () => {
      setPlayersPerView(getPlayersPerView());
      // Reset current index to avoid empty spaces
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + playersPerView >= players.length ? 0 : prev + playersPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - playersPerView < 0 ? 
      players.length - playersPerView : 
      prev - playersPerView
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index * playersPerView);
  };

  // Function to get player name
  const getName = (player: Player) => {
    return language === 'th' ? player.nameThai : player.nameEn;
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, playersPerView]);

  const visiblePlayers = players.slice(currentIndex, currentIndex + playersPerView);
  const totalSlides = Math.ceil(players.length / playersPerView);
  const currentSlide = Math.floor(currentIndex / playersPerView);

  return (
    <section className="expert_doctors_area">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="doctors_title mb-55 players-mb">
              <h3>{language === 'th' ? 'นักเตะ' : 'Players'}</h3>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-xl-12">
            <div className="expert_active">
              {/* Navigation Arrows */}
              <button 
                className="carousel-arrow carousel-arrow-left"
                onClick={prevSlide}
                aria-label={language === 'th' ? 'นักเตะก่อนหน้า' : 'Previous players'}
              >
                ‹
              </button>

              <button 
                className="carousel-arrow carousel-arrow-right"
                onClick={nextSlide}
                aria-label={language === 'th' ? 'นักเตะถัดไป' : 'Next players'}
              >
                ›
              </button>

              {/* Players Grid */}
              <div className="players-grid">
                {visiblePlayers.map((player) => (
                  <div key={player.id} className="single_expert">
                    <div className="expert_thumb">
                      <a className="LinkPlayerDetail" data-type="1" data-id={player.id}>
                        <img 
                          src={player.image} 
                          alt={getName(player)}
                          className="player-image"
                        />
                      </a>
                    </div>
                    
                    {/* Player Info Box */}
                    <div className="player-info-box">
                      <div className="player-number">
                        {player.number}
                      </div>
                      <div className="player-name">
                        {getName(player)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}