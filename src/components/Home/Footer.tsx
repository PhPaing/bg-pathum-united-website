import { useState, useEffect } from 'react';
import './Footer.css';

interface Sponsor {
  name: string;
  logo: string;
  hoverLogo: string;
  url: string;
  alt: string;
}

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const mainSponsors: Sponsor[] = [
    {
      name: "LEO",
      logo: "/images/partners/sponsor-2024/Leo-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/Leo-2024.jpg",
      url: "https://www.facebook.com/LEOTH/",
      alt: "LEO"
    },
    {
      name: "BG Sports",
      logo: "/images/partners/sponsor-2025/BG-sports-WH.png",
      hoverLogo: "/images/partners/sponsor-2025/BG-sports.png",
      url: "https://www.youtube.com/@bgsports-official",
      alt: "BGF"
    }
  ];

  const supSponsors: Sponsor[] = [
    {
      name: "BGC",
      logo: "/images/partners/sponsor-2024/bgc-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/bgc-2024.jpg",
      url: "https://www.bgc.co.th/official/?r=Site/Index",
      alt: "BGC"
    },
    {
      name: "NIKE",
      logo: "/images/partners/sponsor-2024/NIke-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/NIke-2024.jpg",
      url: "https://www.nike.com/th/",
      alt: "NIKE"
    },
    {
      name: "GOMUC",
      logo: "/images/partners/sponsor-2025/gomuc-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/gomuc-2025.jpg",
      url: "https://www.facebook.com/GoMucTH/",
      alt: "GOMUC"
    },
    {
      name: "STIEBEL ELTRON",
      logo: "/images/partners/sponsor-2024/StiebelEltron-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/StiebelEltron-2024.jpg",
      url: "https://www.stiebel-eltron.co.th/th/home.html",
      alt: "STIEBEL ELTRON"
    },
    {
      name: "ASSETWISE",
      logo: "/images/partners/sponsor-2024/AssetWise-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/AssetWise-2024.jpg",
      url: "https://assetwise.co.th/",
      alt: "ASSETWISE"
    },
    {
      name: "TRUE",
      logo: "/images/partners/sponsor-2025/true-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/true-2025.jpg",
      url: "https://www.true.th/home",
      alt: "true"
    },
    {
      name: "MUANGTHAI",
      logo: "/images/partners/sponsor-2025/muangthai-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/muangthai-2025.jpg",
      url: "https://www.muangthaiinsurance.com/th/home",
      alt: "muangthai"
    }
  ];

  const coSponsors: Sponsor[] = [
    {
      name: "DAIKIN",
      logo: "/images/partners/sponsor-2025/daikin-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/daikin-2025.jpg",
      url: "https://www.daikin.co.th/",
      alt: "daikin"
    },
    {
      name: "REPARIL",
      logo: "/images/partners/sponsor-2025/reparil-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/reparil-2025.jpg",
      url: "https://www.reparil.co.th/th-th",
      alt: "reparil"
    },
    {
      name: "YANMAR",
      logo: "/images/partners/sponsor-2024/Yanmar-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/Yanmar-2024.jpg",
      url: "https://www.yanmar.com/th/",
      alt: "YANMAR"
    },
    {
      name: "BKI",
      logo: "/images/partners/sponsor-2024/BKI-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/BKI-2024.jpg",
      url: "https://www.bangkokinsurance.com/",
      alt: "BKI"
    },
    {
      name: "EURO CAKE",
      logo: "/images/partners/sponsor-2024/EuroCake-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/EuroCake-2024.jpg",
      url: "https://eurofood.co.th/",
      alt: "EURO CAKE"
    },
    {
      name: "BANGKOK HOSPITAL",
      logo: "/images/partners/sponsor-2025/bangkokhospital-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/bangkokhospital-2025.jpg",
      url: "https://www.bangkokhospital.com/",
      alt: "bangkokhospital"
    },
    {
      name: "ICE",
      logo: "/images/partners/sponsor-2025/ice-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/ice-2025.jpg",
      url: "https://www.facebook.com/ICELED",
      alt: "ice"
    }
  ];

  const additionalSponsors: Sponsor[] = [
    {
      name: "NOVOTEL",
      logo: "/images/partners/sponsor-2024/Novotel-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/Novotel-2024.jpg",
      url: "https://novotelbangkokfutureparkrangsit.com/th/",
      alt: "NOVOTEL"
    },
    {
      name: "WAIWAI",
      logo: "/images/partners/sponsor-2025/waiwai-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/waiwai-2025.jpg",
      url: "https://waiwai.co.th/th",
      alt: "waiwai"
    },
    {
      name: "COKE",
      logo: "/images/partners/sponsor-2025/Coke-W-2025.png",
      hoverLogo: "/images/partners/sponsor-2025/Coke-2025.jpg",
      url: "https://www.facebook.com/cocacolaTH",
      alt: "COKE"
    },
    {
      name: "POCARI",
      logo: "/images/partners/sponsor-2024/Pocari-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/Pocari-2024.jpg",
      url: "https://pocarisweat.co.th/th/",
      alt: "POCARI"
    },
    {
      name: "KINCHO",
      logo: "/images/partners/sponsor-2024/Kincho-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/Kincho-2024.jpg",
      url: "https://www.facebook.com/kinchothailand",
      alt: "KINCHO"
    },
    {
      name: "NIKON",
      logo: "/images/partners/sponsor-2024/Nikon-W-2024.png",
      hoverLogo: "/images/partners/sponsor-2024/Nikon-2024.jpg",
      url: "https://www.nikon.co.th/",
      alt: "NIKON"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SponsorLogo = ({ sponsor }: { sponsor: Sponsor }) => (
    <div className="logo-sponsor">
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
        <img 
          src={sponsor.logo} 
          alt={sponsor.alt}
          className="sponsor-logo"
          onMouseOver={(e) => {
            e.currentTarget.src = sponsor.hoverLogo;
          }}
          onMouseOut={(e) => {
            e.currentTarget.src = sponsor.logo;
          }}
        />
      </a>
    </div>
  );

  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="footer__body wrap-input1">
          <div className="container">
            {/* Scroll to Top Button */}
           {showScrollTop && (
  <button 
    id="return-to-top"
    onClick={(e) => {
      e.preventDefault();
      scrollToTop();
    }}
    aria-label="Scroll to top of page"
    title="Scroll to top"
    className="scroll-top-btn"
  >
    ^
  </button>
)}

            {/* Desktop Sponsors */}
            <div className="d-none d-xl-block">
              <div className="sponsors-wrap official-partners">
                <div className="container">
                  <div className="partners-control">
                    {/* Main Brands */}
                    <div className="main-brand">
                      {mainSponsors.map((sponsor, index) => (
                        <SponsorLogo key={index} sponsor={sponsor} />
                      ))}
                    </div>

                    {/* Sup Sponsors */}
                    <div className="sup__sponsors">
                      {supSponsors.map((sponsor, index) => (
                        <SponsorLogo key={index} sponsor={sponsor} />
                      ))}
                    </div>

                    {/* Additional Sup Sponsors */}
                    <div className="sup__sponsors">
                      {coSponsors.map((sponsor, index) => (
                        <SponsorLogo key={index} sponsor={sponsor} />
                      ))}
                    </div>

                    {/* Co Sponsors */}
                    <div className="co__sponsors">
                      {additionalSponsors.map((sponsor, index) => (
                        <SponsorLogo key={index} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sponsors */}
            <div className="d-block d-xl-none">
              <div className="sponsors-wrap official-partners">
                <div className="container">
                  <div className="partners-control">
                    {/* Main Brands */}
                    <div className="main-brand">
                      {mainSponsors.map((sponsor, index) => (
                        <SponsorLogo key={index} sponsor={sponsor} />
                      ))}
                    </div>

                    {/* All Other Sponsors in one grid for mobile */}
                    <div className="sup__sponsors">
                      {[...supSponsors, ...coSponsors, ...additionalSponsors].map((sponsor, index) => (
                        <SponsorLogo key={index} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}