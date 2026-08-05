import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Home/Header';
import Footer from '../../Home/Footer';
import './player-movement.css';

interface PlayerMovement {
  id: number;
  type: 'loan-in' | 'loan-out';
  playerName: string;
  playerImage: string;
  playerPosition: string;
  fromClub: string;
  fromClubLogo: string;
  toClub: string;
  toClubLogo: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
}

const PlayerMovement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'loan-in' | 'loan-out'>('loan-in');

  // Mock data - replace with real data from your API/JSON
  const movements: PlayerMovement[] = [
    
  ];

  const filteredMovements = movements.filter(movement => movement.type === activeTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return `${months} month${months !== 1 ? 's' : ''}`;
  };

  return (
    <div className="pm-container">
      <Header />
      <div className="pm-header-margin"></div>

      {/* Page Title */}
      <div className="pm-title-section">
        <div className="pm-container-inner">
          <div className="pm-title-content">
            <h1 className="pm-title">Player Movement</h1>
            <Link to="/teams/first-team" className="pm-ex-link">
              First Team <i className="pm-arrow">→</i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pm-container-inner">
        <div className="pm-content-wrapper">
          {/* Tab Navigation */}
          <div className="pm-tab-nav">
            <div className="pm-tab-btns">
              <button
                className={`pm-tab-btn ${activeTab === 'loan-in' ? 'pm-active' : ''}`}
                onClick={() => setActiveTab('loan-in')}
              >
                LOAN IN
              </button>
              <button
                className={`pm-tab-btn ${activeTab === 'loan-out' ? 'pm-active' : ''}`}
                onClick={() => setActiveTab('loan-out')}
              >
                LOAN OUT
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="pm-content">
            {filteredMovements.length > 0 ? (
              <div className="pm-list">
                {filteredMovements.map((movement) => (
                  <div key={movement.id} className={`pm-movement-card ${movement.type}`}>
                    <div className="pm-player-info">
                      <img
                        src={movement.playerImage}
                        alt={movement.playerName}
                        className="pm-player-img"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/player-placeholder.jpg';
                        }}
                      />
                      <div className="pm-player-details">
                        <div className="pm-player-name">{movement.playerName}</div>
                        <div className="pm-player-position">{movement.playerPosition}</div>
                      </div>
                    </div>

                    <div className="pm-movement-details">
                      <div className="pm-from-to">
                        <div className="pm-club-info">
                          <img
                            src={movement.fromClubLogo}
                            alt={movement.fromClub}
                            className="pm-club-logo"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/club-placeholder.png';
                            }}
                          />
                          <div className="pm-club-name">{movement.fromClub}</div>
                        </div>
                        
                        <div className="pm-arrow-container">
                          <i className="pm-arrow-icon">→</i>
                        </div>
                        
                        <div className="pm-club-info">
                          <img
                            src={movement.toClubLogo}
                            alt={movement.toClub}
                            className="pm-club-logo"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/club-placeholder.png';
                            }}
                          />
                          <div className="pm-club-name">{movement.toClub}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pm-date-info">
                      <div className="pm-date">
                        {formatDate(movement.startDate)} - {formatDate(movement.endDate)}
                      </div>
                      <div className="pm-duration">
                        {getDuration(movement.startDate, movement.endDate)}
                      </div>
                    </div>

                    <div className="pm-status">
                      <span className={`pm-status-badge pm-status-${movement.status}`}>
                        {movement.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pm-empty-state">
                <div className="pm-empty-icon">
                  <i className="fas fa-exchange-alt"></i>
                </div>
                <h3 className="pm-empty-title">No {activeTab.replace('-', ' ')} movements</h3>
                <p className="pm-empty-text">
                  There are currently no {activeTab.replace('-', ' ')} player movements for this season.
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

export default PlayerMovement;