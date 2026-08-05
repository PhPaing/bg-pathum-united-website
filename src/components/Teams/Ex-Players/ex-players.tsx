import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Home/Header';
import Footer from '../../Home/Footer';
import exPlayersData from '../../../data/ex-players.json';
import './ex-players.css';

interface Player {
  id: number;
  name: string;
  nationality: string;
  nationalityFlag: string;
  playerImage: string;
  duration: string;
  season: number;
  seasonId: number;
}

interface Season {
  value: string;
  label: string;
  year: number;
}

interface ExPlayersData {
  players: Player[];
  seasons: Season[];
}

const ExPlayers: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('0'); // '0' for all seasons
  const { players, seasons } = exPlayersData as ExPlayersData;

  // Filter players based on selected season
  const filteredPlayers = selectedSeason === '0' 
    ? players 
    : players.filter(player => {
        // Find the selected season
        const selectedSeasonData = seasons.find(s => s.value === selectedSeason);
        if (!selectedSeasonData) return true;
        
        // Map season value to actual year for filtering
        const seasonMap: { [key: string]: number } = {
          '101': 2009,
          '102': 2010,
          '103': 2011,
          '104': 2012,
          '105': 2013,
          '106': 2014,
          '107': 2015,
          '1': 2016,
          '2': 2017,
          '3': 2018,
          '4': 2019,
          '108': 2020,
          '109': 2021,
          '110': 2022,
          '111': 2023
        };
        
        const selectedYear = seasonMap[selectedSeason] || 0;

        const playerStartYear = parseInt(player.duration.split('-')[0]);
        
        return playerStartYear === selectedYear;
      });

  const handlePlayerClick = (id: number) => {
    console.log(`Clicked ex-player: ${id}`);
    // Implement player detail navigation
    // Example: navigate(`/player/${id}`);
  };

  // Get selected season label for display
  const selectedSeasonLabel = seasons.find(s => s.value === selectedSeason)?.label || 'All Seasons';

  return (
    <div className="exp-container">
      <Header />
      <div className="exp-header-margin"></div>

      {/* Page Title */}
      <div className="exp-title-section">
        <div className="exp-container-inner">
          <div className="exp-title-content">
            <h1 className="exp-title">Ex-Players</h1>
            <Link to="/teams/player-movement" className="exp-ex-link">
              Player Movement <i className="exp-arrow">→</i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="exp-container-inner">
        <div className="exp-content-wrapper">

            <select 
              id="season-select"
              className="exp-season-select"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              aria-label="Select season to filter ex-players"
              title="Select season to filter ex-players"
            >
              {seasons.map((season) => (
                <option key={season.value} value={season.value}>
                  {season.label}
                </option>
              ))}
            </select>


          {/* Players Grid */}
          <div className="exp-players-grid">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <div 
                  key={player.id}
                  className="exp-player-card"
                  onClick={() => handlePlayerClick(player.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePlayerClick(player.id);
                    }
                  }}
                  aria-label={`View details for ${player.name}, played ${player.duration}, nationality: ${player.nationality}`}
                >
                  <div className="exp-player-info">
                    <img
                      src={player.nationalityFlag}
                      alt={`Flag of ${player.nationality}`}
                      className="exp-player-flag"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/flag-placeholder.png';
                      }}
                    />
                    <div className="exp-player-details">
                      <div className="exp-player-name">{player.name.toUpperCase()}</div>
                      <div className="exp-player-duration">{player.duration}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="exp-empty-state">
                <div className="exp-empty-icon" aria-hidden="true">
                  <i className="fas fa-history"></i>
                </div>
                <h3 className="exp-empty-title">No ex-players found</h3>
                <p className="exp-empty-text">
                  {selectedSeason === '0' 
                    ? "There are currently no ex-players in the database." 
                    : `No ex-players found for the ${selectedSeasonLabel} season.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExPlayers;