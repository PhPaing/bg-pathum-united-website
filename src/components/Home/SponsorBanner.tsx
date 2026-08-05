import { useState, useEffect } from 'react';
import './SponsorBanner.css';

interface Banner {
  id: number;
  image: string;
  alt: string;
  link?: string;
}

interface SponsorBannerProps {
  banners: Banner[];
  interval?: number;
}

export default function SponsorBanner({ banners, interval = 3000 }: SponsorBannerProps) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [banners.length, interval]);

  if (banners.length === 0) return null;

  return (
    <div className="sponsor-banner-area">
      <div className="sponsor-banner-container">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`sponsor-banner ${index === currentBanner ? 'active' : ''}`}
          >
            {banner.link ? (
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                <img 
                  src={banner.image} 
                  alt={banner.alt}
                  className="sponsor-banner-image"
                />
              </a>
            ) : (
              <img 
                src={banner.image} 
                alt={banner.alt}
                className="sponsor-banner-image"
              />
            )}
          </div>
        ))}
        {banners.length > 1 && (
          <div className="banner-indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`banner-indicator ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}