import React from 'react';
import './VirtualTour.css';

export default function VirtualTour() {
  const handleVirtualTourClick = () => {
    console.log('Virtual tour clicked');
  };

  return (
    <section className="our_department_area virtual-tour-section">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="section_title text-left">
              <h3>TRUE BG STADIUM - Virtual Tour</h3>
            </div>
          </div>
        </div>

        <div className="virtual-tour-home">
          <a 
            href="https://bgstadium360.bgputd.com/tour/bg-stadium" 
            target="_blank" 
            rel="noopener noreferrer">
            <img 
              src="/images/VirtualTour/VirtualTour_Banner_2.jpg" 
              alt="TRUE BG STADIUM Virtual Tour - Experience our stadium in 360 degrees"
              className="virtual-tour-image" sizes="100vw"
            />
            <div className="virtual-tour-overlay">
              <div className="virtual-tour-content">
                <div className="tour-icon">
                  <i className="fas fa-vr-cardboard" aria-hidden="true"></i>
                </div>
               </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}