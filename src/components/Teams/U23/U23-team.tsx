import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Home/Header';
import Footer from '../../Home/Footer';
import teamsData from '../../../data/U23.json';
import './U23-team.css';

interface Player {  id: number;
  number: string;
  name: string;
  surname: string;
  image: string;
  type: number;
  Height?: string;
  nationality?: string;
  position?: string;
  Dominantfoot?: string;
}

interface TeamsData {
  players: Player[];
}

const U23Team: React.FC = () => {

  const { players } = teamsData as TeamsData;
  
  const u23Players = players.filter(player => {
    return true; 
  });

  const handlePlayerClick = (id: number, type: number) => {
    console.log(`Clicked U23 player: ${id}, type: ${type}`);

  };

  return (
    <div className="ft-container">
      <Header />
      <div className="ft-header-margin"></div>

      {/* Page Title */}
      <div className="ft-title-section">
        <div className="ft-container-inner">
          <div className="ft-title-content">
            <h1 className="ft-title">U23 Team</h1>
            <Link to="/teams/first-team" className="ft-ex-link">
              First Team <i className="ft-arrow">→</i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ft-container-inner">
        <div className="ft-content-wrapper">
          {/* Players Grid */}
          <div className="ft-grid">
            {u23Players.length > 0 ? (
              u23Players.map((player) => (
                <div
                  key={player.id}
                  className="ft-card"
                  onClick={() => handlePlayerClick(player.id, player.type)}
                >
                  <div className="ft-img-container">
                    <img
                      src={player.image}
                      alt={`${player.name} ${player.surname}`}
                      className="ft-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/player-placeholder.jpg';
                      }}
                    />
                  </div>
                  {/* Combined number, name, surname in one line */}
                  <div className="ft-info-container">
                    <div className="ft-num">{player.number}</div>
                    <div className="ft-name-container">
                      <div className="ft-name">{player.name.toUpperCase()}</div>
                      <div className="ft-surname">{player.surname.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No U23 players available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default U23Team;