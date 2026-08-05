import React from 'react';
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import './official_partners.css';

interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  website: string;
}

const OfficialPartners: React.FC = () => {
  const partners: Partner[] = [
    // Main Brand Partners
    { id: 1, name: "LEO", logo: "/images/partners/sponsor-2024/Leo-2024.jpg", alt: "LEO", website: "https://www.facebook.com/LEOTH/" },
    { id: 2, name: "BG | sports", logo: "/images/partners/sponsor-2025/BG-sports.png", alt: "BG Sports", website: "https://www.youtube.com/@bgsports-official" },
   
    // Top Row Partners
    { id: 3, name: "BGC", logo: "/images/partners/sponsor-2024/bgc-2024.jpg", alt: "BGC", website: "https://www.bgc.co.th/official/?r=Site/Index" },
    { id: 4, name: "NIKE", logo: "/images/partners/sponsor-2024/NIke-2024.jpg", alt: "NIKE", website: "https://www.nike.com/th/" },
    { id: 5, name: "GOMUC", logo: "/images/partners/sponsor-2025/gomuc-2025.jpg", alt: "GOMUC", website: "https://www.facebook.com/GoMucTH/" },
    { id: 6, name: "STIEBEL ELTRON", logo: "/images/partners/sponsor-2024/StiebelEltron-2024.jpg", alt: "STIEBEL ELTRON", website: "https://www.stiebel-eltron.co.th/th/home.html" },
    { id: 7, name: "ASSET WISE", logo: "/images/partners/sponsor-2024/AssetWise-2024.jpg", alt: "ASSETWISE", website: "https://assetwise.co.th/" },
   
    // Second Row Partners
    { id: 8, name: "true together", logo: "/images/partners/sponsor-2025/true-2025.jpg", alt: "TRUE", website: "https://www.true.th/home" },
    { id: 9, name: "MUANGTHAI", logo: "/images/partners/sponsor-2025/muangthai-2025.jpg", alt: "MUANGTHAI", website: "https://www.muangthaiinsurance.com/th/home" },
    { id: 10, name: "DAIKIN", logo: "/images/partners/sponsor-2025/daikin-2025.jpg", alt: "DAIKIN", website: "https://www.daikin.co.th/" },
    { id: 11, name: "Roparil Ice-Spray", logo: "/images/partners/sponsor-2025/reparil-2025.jpg", alt: "REPARIL", website: "https://www.reparil.co.th/th-th" },
    { id: 12, name: "YANMAR", logo: "/images/partners/sponsor-2024/Yanmar-2024.jpg", alt: "YANMAR", website: "https://www.yanmar.com/th/" },
    { id: 13, name: "Bangkok Insurance", logo: "/images/partners/sponsor-2024/BKI-2024.jpg", alt: "BKI", website: "https://www.bangkokinsurance.com/" },
    { id: 14, name: "EURO CAKE", logo: "/images/partners/sponsor-2024/EuroCake-2024.jpg", alt: "EURO CAKE", website: "https://eurofood.co.th/" },
    { id: 15, name: "BANGKOK HOSPITAL", logo: "/images/partners/sponsor-2025/bangkokhospital-2025.jpg", alt: "BANGKOK HOSPITAL", website: "https://www.bangkokhospital.com/" },
    { id: 16, name: "ICE LED", logo: "/images/partners/sponsor-2025/ice-2025.jpg", alt: "ICE LED", website: "https://www.facebook.com/ICELED" },
    
    // Third Row Partners
    { id: 17, name: "NOVOTEL", logo: "/images/partners/sponsor-2024/Novotel-2024.jpg", alt: "NOVOTEL", website: "https://novotelbangkokfutureparkrangsit.com/th/" },
    { id: 18, name: "WAIWAI", logo: "/images/partners/sponsor-2025/waiwai-2025.png", alt: "WAIWAI", website: "https://waiwai.co.th/th" },
    { id: 19, name: "Coca-Cola", logo: "/images/partners/sponsor-2025/Coke-2025.jpg", alt: "COKE", website: "https://www.facebook.com/cocacolaTH" },
    { id: 20, name: "POCARI SWEAT", logo: "/images/partners/sponsor-2024/Pocari-2024.jpg", alt: "POCARI", website: "https://pocarisweat.co.th/th/" },
    { id: 21, name: "KINCHO", logo: "/images/partners/sponsor-2024/Kincho-2024.jpg", alt: "KINCHO", website: "https://www.facebook.com/kinchothailand" },
    { id: 22, name: "Nikon", logo: "/images/partners/sponsor-2024/Nikon-2024.jpg", alt: "NIKON", website: "https://www.nikon.co.th/" },
  ];

  const handleLogoClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="partners-container">
      <Header />
      <div className="partners-header-margin"></div>

      {/* Page Title */}
      <div className="partners-title-section">
        <div className="partners-container-inner">
          <div className="partners-title-content">
            <h1 className="partners-title">Official Partner</h1>
            <a href="/club/contact" className="partners-ex-link">
              Contact Us <i className="partners-arrow">→</i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="partners-container-inner">
        <div className="partners-content-wrapper">
          {/* All Partners in Clean Grid Layout */}
          <div className="partners-grid-layout">
            
            {/* Main Brand Row (2 logos) */}
            <div className="partners-row main-brand-row">
              {partners.slice(0, 2).map((partner) => (
                <div 
                  key={partner.id} 
                  className="partner-logo-item main-brand-item"
                  onClick={() => handleLogoClick(partner.website)}
                >
                  <div className="partner-logo-wrapper">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-logo.png';
                      }}
                    />
                    <div className="partner-hover-overlay">
                      <div className="partner-hover-content">
                        <span className="partner-name">{partner.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Row (7 logos) */}
            <div className="partners-row top-partners-row">
              {partners.slice(2, 9).map((partner) => (
                <div 
                  key={partner.id} 
                  className="partner-logo-item top-partner-item"
                  onClick={() => handleLogoClick(partner.website)}
                >
                  <div className="partner-logo-wrapper">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-logo.png';
                      }}
                    />
                    <div className="partner-hover-overlay">
                      <div className="partner-hover-content">
                        <span className="partner-name">{partner.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Row (8 logos) */}
            <div className="partners-row middle-partners-row">
              {partners.slice(9, 16).map((partner) => (
                <div 
                  key={partner.id} 
                  className="partner-logo-item middle-partner-item"
                  onClick={() => handleLogoClick(partner.website)}
                >
                  <div className="partner-logo-wrapper">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-logo.png';
                      }}
                    />
                    <div className="partner-hover-overlay">
                      <div className="partner-hover-content">
                        <span className="partner-name">{partner.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row (6 logos) */}
            <div className="partners-row bottom-partners-row">
              {partners.slice(16).map((partner) => (
                <div 
                  key={partner.id} 
                  className="partner-logo-item bottom-partner-item"
                  onClick={() => handleLogoClick(partner.website)}
                >
                  <div className="partner-logo-wrapper">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-logo.png';
                      }}
                    />
                    <div className="partner-hover-overlay">
                      <div className="partner-hover-content">
                        <span className="partner-name">{partner.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfficialPartners;