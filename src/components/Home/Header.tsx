import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Header.css';

type DropdownType = 'teams' | 'matches' | 'club' | 'ticket' | null;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const { language, setLanguage, translate } = useLanguage();

  const toggleDropdown = (dropdown: DropdownType) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLanguageChange = (lang: 'th' | 'en') => {
    setLanguage(lang);
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-top">
        <div className="header-container">
          <div></div>

          <div className="header-top-right">
            <div className="social-icons">
              {/* Social icons */}
              <a href="https://www.facebook.com/BGPATHUMUNITED/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="social-icon facebook" />
              </a>
              <a href="https://www.youtube.com/user/BGFCtv" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="social-icon youtube" />
              </a>
              <a href="https://twitter.com/bgpuofficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="social-icon twitter" />
              </a>
              <a href="https://instagram.com/bgpu_official?igshid=163urgu1uv4u6" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon instagram" />
              </a>
              <a href="https://www.tiktok.com/@bgpu_official" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok className="social-icon tiktok" />
              </a>
            </div>

            {/* Language Switcher */}
            <div className="language-switcher">
              <button 
                className={`language-btn ${language === 'th' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('th')}
                aria-label="Switch to Thai language"
                aria-pressed={language === 'th'}
              >
                TH
              </button>
              <button 
                className={`language-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
                aria-label="Switch to English language"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="header-main">
        {/* Logo */}
        <Link to="/" aria-label="Home page" className="logo-link">
          <img
            src="/images/logo/BG-Official-Site.png"
            alt="BG Pathum United Logo"
            className="logo"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">{translate('หน้าแรก', 'HOME')}</Link>
          <Link to="/news" className="nav-link">{translate('ข่าวสาร', 'NEWS')}</Link>

          {/* TEAMS Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">
              {translate('ทีมงาน', 'TEAMS')} <span className="dropdown-arrow">▾</span>
            </button>
            <div className="dropdown-menu">
              <Link to="/teams/first-team" className="dropdown-link">
                {translate('ทีมหลัก', 'First Team')}
              </Link>
              <Link to="/teams/u23" className="dropdown-link">
                {translate('ทีมเยาวชน U23', 'U23')}
              </Link>
              <Link to="/teams/ex-players" className="dropdown-link">
                {translate('อดีตนักเตะ', 'Ex-Players')}
              </Link>
              <Link to="/teams/player-movement" className="dropdown-link">
                {translate('การเคลื่อนย้ายนักเตะ', 'Player Movement')}
              </Link>
            </div>
          </div>

          {/* MATCHES Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">
              {translate('การแข่งขัน', 'MATCHES')} <span className="dropdown-arrow">▾</span>
            </button>
            <div className="dropdown-menu">
              <a href="/matches/fixtures" className="dropdown-link">
                {translate('ตารางการแข่งขัน', 'Fixtures')}
              </a>
              <a href="/matches/results" className="dropdown-link">
                {translate('ผลการแข่งขัน', 'Results')}
              </a>
              <a href="/matches/league-table" className="dropdown-link">
                {translate('ตารางคะแนน', 'League Table')}
              </a>
            </div>
          </div>

          {/* CLUB Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">
              {translate('สโมสร', 'CLUB')} <span className="dropdown-arrow">▾</span>
            </button>
            <div className="dropdown-menu club-dropdown">
              <a href="/club/history" className="dropdown-link">
                {translate('ประวัติสโมสร', 'Club History')}
              </a>
              <a href="/club/management" className="dropdown-link">
                {translate('ผู้บริหารสโมสร', 'Club Management')}
              </a>
              <a href="/club/milestones" className="dropdown-link">
                {translate('ความสำเร็จที่สำคัญ', 'Key Milestones')}
              </a>
              <a href="/club/facilities" className="dropdown-link">
                {translate('สิ่งอำนวยความสะดวก', 'Facilities')}
              </a>
              <a href="https://bgstadium360.bgputd.com/tour/bg-stadium" target="_blank" rel="noopener noreferrer" className="dropdown-link">
                {translate('สนาม BG 360 องศา', 'Virtual 360 BG STADIUM')}
              </a>
              <a href="/club/partners" className="dropdown-link">
                {translate('พันธมิตรทางการ', 'Official Partners')}
              </a>
              <a href="/club/contact" className="dropdown-link">
                {translate('ติดต่อเรา', 'Contact Us')}
              </a>
            </div>
          </div>

          <a href="http://www.bgpuonlineshop.com/shop/?r=Site/Index" target="_blank" rel="noopener noreferrer" className="nav-link">
            {translate('ร้านค้า', 'SHOP')}
          </a>
          
          {/* TICKET Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">
              {translate('ตั๋ว', 'TICKET')} <span className="dropdown-arrow">▾</span>
            </button>
            <div className="dropdown-menu">
              <a href="https://www.bgpuonlineshop.com/ticket/?r=Ticket" target="_blank" rel="noopener noreferrer" className="dropdown-link">
                {translate('ซื้อตั๋ว', 'Buy Ticket')}
              </a>
              <a href="https://home.bgonlineapp.com/?r=Lounge/hospitality" target="_blank" rel="noopener noreferrer" className="dropdown-link">
                {translate('ต้อนรับ', 'Hospitality')}
              </a>
              <a href="https://www.bgpuonlineshop.com/away" target="_blank" rel="noopener noreferrer" className="dropdown-link">
                {translate('การเดินทางเยือน', 'Away Trip')}
              </a>
              <a href="https://www.bgpuonlineshop.com/ticket/index.php?r=Renew" target="_blank" rel="noopener noreferrer" className="dropdown-link">
                {translate('ตั๋วฤดูกาล', 'Season Ticket')}
              </a>
              <Link to="/tickets" className="dropdown-link" style={{borderTop: '1px solid #e5e7eb', marginTop: '4px', paddingTop: '8px'}}>
                {translate('ระบบตั๋ว API', 'API Ticket System')}
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
          <nav className="mobile-nav">
            <div className="mobile-nav-content">
              <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
                {translate('หน้าแรก', 'HOME')}
              </Link>
              <Link to="/news" className="mobile-nav-link" onClick={closeMobileMenu}>
                {translate('ข่าวสาร', 'NEWS')}
              </Link>

              {/* TEAMS Dropdown */}
              <div className="mobile-dropdown">
                <button 
                  className="mobile-dropdown-btn"
                  onClick={() => toggleDropdown('teams')}
                >
                  <span>{translate('ทีมงาน', 'TEAMS')}</span>
                  <span className={`mobile-dropdown-arrow ${activeDropdown === 'teams' ? 'mobile-dropdown-arrow-open' : ''}`}>▾</span>
                </button>
                {activeDropdown === 'teams' && (
                  <div className="mobile-dropdown-content">
                    <Link to="/teams/first-team" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ทีมหลัก', 'First Team')}
                    </Link>
                    <Link to="/teams/u23" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ทีมเยาวชน U23', 'U23')}
                    </Link>
                    <Link to="/teams/ex-players" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('อดีตนักเตะ', 'Ex-Players')}
                    </Link>
                    <Link to="/teams/player-movement" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('การเคลื่อนย้ายนักเตะ', 'Player Movement')}
                    </Link>
                  </div>
                )}
              </div>

              {/* MATCHES Dropdown */}
              <div className="mobile-dropdown">
                <button 
                  className="mobile-dropdown-btn"
                  onClick={() => toggleDropdown('matches')}
                >
                  <span>{translate('การแข่งขัน', 'MATCHES')}</span>
                  <span className={`mobile-dropdown-arrow ${activeDropdown === 'matches' ? 'mobile-dropdown-arrow-open' : ''}`}>▾</span>
                </button>
                {activeDropdown === 'matches' && (
                  <div className="mobile-dropdown-content">
                    <a href="/matches/fixtures" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ตารางการแข่งขัน', 'Fixtures')}
                    </a>
                    <a href="/matches/results" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ผลการแข่งขัน', 'Results')}
                    </a>
                    <a href="/matches/league-table" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ตารางคะแนน', 'League Table')}
                    </a>
                  </div>
                )}
              </div>

              {/* CLUB Dropdown */}
              <div className="mobile-dropdown">
                <button 
                  className="mobile-dropdown-btn"
                  onClick={() => toggleDropdown('club')}
                >
                  <span>{translate('สโมสร', 'CLUB')}</span>
                  <span className={`mobile-dropdown-arrow ${activeDropdown === 'club' ? 'mobile-dropdown-arrow-open' : ''}`}>▾</span>
                </button>
                {activeDropdown === 'club' && (
                  <div className="mobile-dropdown-content">
                    <a href="/club/history" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ประวัติสโมสร', 'Club History')}
                    </a>
                    <a href="/club/management" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ผู้บริหารสโมสร', 'Club Management')}
                    </a>
                    <a href="/club/milestones" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ความสำเร็จที่สำคัญ', 'Key Milestones')}
                    </a>
                    <a href="/club/facilities" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('สิ่งอำนวยความสะดวก', 'Facilities')}
                    </a>
                    <a href="https://bgstadium360.bgputd.com/tour/bg-stadium" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('สนาม BG 360 องศา', 'Virtual 360 BG STADIUM')}
                    </a>
                    <a href="/club/partners" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('พันธมิตรทางการ', 'Official Partners')}
                    </a>
                    <a href="/club/contact" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ติดต่อเรา', 'Contact Us')}
                    </a>
                  </div>
                )}
              </div>

              <a href="http://www.bgpuonlineshop.com/shop/?r=Site/Index" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMobileMenu}>
                {translate('ร้านค้า', 'SHOP')}
              </a>

              {/* TICKET Dropdown */}
              <div className="mobile-dropdown">
                <button 
                  className="mobile-dropdown-btn"
                  onClick={() => toggleDropdown('ticket')}
                >
                  <span>{translate('ตั๋ว', 'TICKET')}</span>
                  <span className={`mobile-dropdown-arrow ${activeDropdown === 'ticket' ? 'mobile-dropdown-arrow-open' : ''}`}>▾</span>
                </button>
                {activeDropdown === 'ticket' && (
                  <div className="mobile-dropdown-content">
                    <a href="https://www.bgpuonlineshop.com/ticket/?r=Ticket" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ซื้อตั๋ว', 'Buy Ticket')}
                    </a>
                    <a href="https://home.bgonlineapp.com/?r=Lounge/hospitality" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ต้อนรับ', 'Hospitality')}
                    </a>
                    <a href="https://www.bgpuonlineshop.com/away" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('การเดินทางเยือน', 'Away Trip')}
                    </a>
                    <a href="https://www.bgpuonlineshop.com/ticket/index.php?r=Renew" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                      {translate('ตั๋วฤดูกาล', 'Season Ticket')}
                    </a>
                    <Link to="/tickets" className="mobile-dropdown-link" onClick={closeMobileMenu} style={{borderTop: '1px solid #e5e7eb', marginTop: '4px', paddingTop: '8px'}}>
                      {translate('ระบบตั๋ว API', 'API Ticket System')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}