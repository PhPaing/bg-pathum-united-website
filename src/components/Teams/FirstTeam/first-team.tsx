import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import teamsData from '../../../data/teams-data.json';
import './first-team.css';

interface Player {
  id: number;
  number: string;
  name: string;
  surname: string;
  image: string;
  type: number;
  position?: string;
  nationality?: string;
}

interface Staff {
  id: number;
  code: string;
  name: string;
  surname: string;
  image: string;
  type: number;
  role?: string;
}

interface TeamsData {
  players: Player[];
  staff: Staff[];
}

const FirstTeam: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'players' | 'staff'>('players');
  const { players, staff } = teamsData as TeamsData;

  const handlePlayerClick = (id: number, type: number) => {
    console.log(`Clicked: ${id}, type: ${type}`);
    // Implement navigation logic here
  };

  return (
    <div className="ft-container">
      <Header />
      <div className="ft-header-margin"></div>

      {/* Page Title */}
      <div className="ft-title-section">
        <div className="ft-container-inner">
          <div className="ft-title-content">
            <h1 className="ft-title">First Team</h1>
            <Link to="/teams/ex-players" className="ft-ex-link">
              Ex-Player <i className="ft-arrow">→</i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ft-container-inner">
        <div className="ft-content-wrapper">
          {/* Tab Navigation */}
          <div className="ft-tab-nav">
            <div className="ft-tab-btns">
              <button
                className={`ft-tab-btn ${activeTab === 'players' ? 'ft-active' : ''}`}
                onClick={() => setActiveTab('players')}
              >
                PLAYER
              </button>
              <button
                className={`ft-tab-btn ${activeTab === 'staff' ? 'ft-active' : ''}`}
                onClick={() => setActiveTab('staff')}
              >
                STAFF
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="ft-tab-content">
            {/* Players Grid */}
            {activeTab === 'players' && (
              <div className="ft-grid">
                {players.map((player) => (
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
                ))}
              </div>
            )}

            {/* Staff Grid */}
            {activeTab === 'staff' && (
              <div className="ft-grid">
                {staff.map((staffMember) => (
                  <div
                    key={staffMember.id}
                    className="ft-card"
                    onClick={() => handlePlayerClick(staffMember.id, staffMember.type)}
                  >
                    <div className="ft-img-container">
                      <img
                        src={staffMember.image}
                        alt={`${staffMember.name} ${staffMember.surname}`}
                        className="ft-img"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/staff-placeholder.jpg';
                        }}
                      />
                      <div className="ft-code">{staffMember.code}</div>
                    </div>
                    {/* Combined code, name, surname in one line */}
                    <div className="ft-info-container">
                      <div className="ft-num">{staffMember.code}</div>
                      <div className="ft-name-container">
                        <div className="ft-name">{staffMember.name.toUpperCase()}</div>
                        <div className="ft-surname">{staffMember.surname.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FirstTeam;