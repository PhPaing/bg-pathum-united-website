import React, { useState } from 'react';
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import { FaMapMarkerAlt } from 'react-icons/fa';
import './contact_us.css';

const ContactUs: React.FC = () => {
  const contactLocations = [
    {
      id: 1,
      title: "สโมสรฟุตบอล บีจี ปทุม ยูไนเต็ด",
      subtitle: "สนามบีจี สเตเดี้ยม",
      addressLine1: "47/1 หมู่ 2 ถนนรังสิต-นครนายก กม.7 ตำบลบึงยี่โถ",
      addressLine2: "อำเภอธัญบุรี จังหวัดปทุมธานี 12130",
      phone: "+66 (0) 2834 7000",
      googleMapsUrl: "https://goo.gl/maps/bTNnxQ5LSqt",
      mapLink: "View Map"
    },
    {
      id: 2,
      title: "บีจีพียู เทรนนิ่ง เซ็นเตอร์",
      subtitle: "บีจีพียู เทรนนิ่ง เซ็นเตอร์",
      addressLine1: "47/1 หมู่ 2 ถนนรังสิต-นครนายก กม.7 ตำบลบึงยี่โถ",
      addressLine2: "อำเภอธัญบุรี จังหวัดปทุมธานี 12130",
      googleMapsUrl: "https://goo.gl/maps/cba4Yos4NnJUd2Pd8",
      mapLink: "View Map"
    },
    {
      id: 3,
      title: "ยามาโอกะ ฮานาซากะ อะคาเดมี่ เทรนนิ่ง เซ็นเตอร์",
      subtitle: "ยามาโอกะ ฮานาซากะ อะคาเดมี่ เทรนนิ่ง เซ็นเตอร์",
      addressLine1: "72/1 หมู่ 4 ซอยรังสิต-นครนายก 83 ถนนรังสิต-นครนายก ตำบลบึงยี่โถ",
      addressLine2: "อำเภอธัญบุรี จังหวัดปทุมธานี 12130",
      googleMapsUrl: "https://goo.gl/maps/ZDBcBintc1MDPbga6",
      mapLink: "View Map"
    },
    {
      id: 4,
      title: "แคมป์ฝึกซ้อม วิชชิ่งทรี ขอนแก่น",
      subtitle: "แคมป์ฝึกซ้อม วิชชิ่งทรี ขอนแก่น",
      addressLine1: "114/1 หมู่ 5 ตำบลท่าพระ",
      addressLine2: "อำเภอเมืองขอนแก่น จังหวัดขอนแก่น 40260",
      googleMapsUrl: "https://goo.gl/maps/rzbQ5x7zaiqBHYJD9",
      mapLink: "View Map"
    }
  ];

  const socialLinks = [
    { 
      name: "facebook", 
      url: "https://www.facebook.com/BGPATHUMUNITED/", 
      icon: "fab fa-facebook-f",
      color: "#1877F2"
    },
    { 
      name: "youtube", 
      url: "https://www.youtube.com/user/BGFCtv", 
      icon: "fab fa-youtube",
      color: "#FF0000"
    },
    { 
      name: "twitter", 
      url: "https://twitter.com/bgpuofficial", 
      icon: "fab fa-twitter",
      color: "#1DA1F2"
    },
    { 
      name: "instagram", 
      url: "https://instagram.com/bgpu_official?igshid=163urgu1uv4u6", 
      icon: "fab fa-instagram",
      color: "#E4405F"
    },
    { 
      name: "tiktok", 
      url: "https://www.tiktok.com/@bgpu_official", 
      icon: "bi bi-tiktok",
      color: "#000000"
    }
  ];

  const handleMapClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  return (
    <div className="contact-container">
      <Header />
    <img 
          src="/images/Map/map-2022.png" 
          alt="BG Pathum United Stadium Map"
          className="contact-map-image"
    />

      {/* Page Title */}
      <div className="contact-title-section">
        <div className="contact-container-inner">
          <div className="contact-title-content">
            <h1 className="contact-title">Contact Us</h1>
            <a href="/club/history" className="contact-ex-link">
              Club History <i className="contact-arrow">→</i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-container-inner">
        <div className="contact-content-wrapper">

          {/* Contact Information Grid */}
          <div className="contact-info-grid">
            {contactLocations.map((location) => (
              <div key={location.id} className="contact-info-card">
                <div className="contact-card-header">
                  <div className="contact-card-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h3 className="contact-location-title">{location.title}</h3>
                  <div className="contact-location-subtitle">{location.subtitle}</div>
                </div>
                
                <div className="contact-address-section">
                  <div className="contact-address-line">
                    <i className="fas fa-home contact-address-icon"></i>
                    <span>{location.addressLine1}</span>
                  </div>
                  <div className="contact-address-line">
                    <i className="fas fa-city contact-address-icon"></i>
                    <span>{location.addressLine2}</span>
                  </div>
                  
                  {location.phone && (
                    <div className="contact-phone">
                      <i className="fas fa-phone contact-phone-icon"></i>
                      <strong>โทรศัพท์ : </strong>
                      <button 
                        className="contact-phone-link"
                        onClick={() => handlePhoneClick(location.phone!)}
                      >
                        {location.phone}
                      </button>
                    </div>
                  )}
                </div>

                <div className="contact-map-section">
                  <button
                    className="contact-map-btn"
                    onClick={() => handleMapClick(location.googleMapsUrl)}
                  >
                    <i className="fas fa-map-marker-alt"></i>
                    <FaMapMarkerAlt style={{ color: '#034FC9', fontSize: '1rem' }} />
                    <span className="contact-map-text">{location.mapLink}</span>
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;