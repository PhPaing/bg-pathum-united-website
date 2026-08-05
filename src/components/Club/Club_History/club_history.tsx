import React, { useState } from 'react';
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import './club_history.css';

interface GalleryImage {
  id: number;
  year: string;
  image: string;
  alt: string;
}

const ClubHistory: React.FC = () => {
  // Gallery images data
  const galleryImages: GalleryImage[] = [
    { id: 1, year: "2565", image: "/images/History/2565.png", alt: "Club History 2565" },
    { id: 2, year: "2564", image: "/images/History/2564.png", alt: "Club History 2564" },
    { id: 3, year: "2563", image: "/images/History/2563.png", alt: "Club History 2563" },
    { id: 4, year: "2562", image: "/images/History/2562.png", alt: "Club History 2562" },
    { id: 5, year: "2561", image: "/images/History/2561.png", alt: "Club History 2561" },
    { id: 6, year: "2559", image: "/images/History/2559.png", alt: "Club History 2559" },
    { id: 7, year: "2558", image: "/images/History/2558.png", alt: "Club History 2558" },
    { id: 8, year: "2557", image: "/images/History/2557.png", alt: "Club History 2557" },
  ];

  // State for gallery modal
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open gallery at specific index
  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
    // Prevent body scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  };

  // Close gallery
  const closeGallery = () => {
    setIsGalleryOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen]);

  // Get current image
  const currentImage = galleryImages[currentImageIndex];

  return (
    <div className="club-history-container">
      <Header />
      <div className="club-history-header-margin"></div>

      {/* Page Title */}
      <div className="club-history-title-section">
        <div className="club-history-container-inner">
          <div className="club-history-title-content">
            <h1 className="club-history-title">Club History</h1>
            <a href="/club/management" className="club-history-ex-link">
              Management <i className="club-history-arrow">→</i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="club-history-content-section">
        <div className="club-history-container-inner">
          <div className="club-history-content-wrapper">
            <div className="club-history-text-content">
              <h2>ประวัติความเป็นมา</h2>
              <p>
                บีจีเอฟซี (BGFC) หรือ สโมสรฟุตบอลบางกอกกล๊าส คือหนึ่งในสโมสรระดับแนวหน้าในไทยพรีเมียร์ลีก ลีกสูงสุดของประเทศ 
                เป็นที่รู้จักในฉายา เดอะแรบบิท (The Rabbits) ก่อตั้งในปี พ.ศ. 2522 และก้าวสู่ความสำเร็จจากการคว้าแชมป์จากการแข่งขันฟุตบอลหลากหลายรายการ 
                อาทิ แชมป์รายการควีนคัพ 2010 แชมป์รายการสิงคโปร์คัพ 2010 และแชมป์รายการมูลนิธิไทยคม เอฟเอคัพ 2014 เป็นต้น 
                โดยใช้สนามลีโอ สเตเดี้ยม เป็นสนามแข่งขันสำหรับเกมเหย้า ตั้งอยู่ในบริเวณ บีจีซี ปทุมธานีกล๊าส อำเภอธัญบุรี จังหวัดปทุมธานี
              </p>
              <p>
                ในปี 2562 บีจีเอฟซี ได้วางเป้าหมายให้สโมสรฟุตบอลเป็นทีมของชาวจังหวัดปทุมธานี 
                สร้างความเป็นหนึ่งในการร่วมสนับสนุนทีมฟุตบอลของท้องถิ่น ซึ่งมีฐานแฟนบอลอยู่เป็นจำนวนมาก 
                จึงได้เปลี่ยนแปลงชื่อสโมสรใหม่เป็น บีจี ปทุม ยูไนเต็ด หรือ บีจีพียู (BGPU) โดยเริ่มการใช้ชื่อสโมสรใหม่สู่สาธารณะอย่างเป็นทางการในฤดูกาล ปี 2562
              </p>
              <p>
                ต่อมาในปี 2565 สนามลีโอ สเตเดียม ได้รับการอนุมัติให้เปลี่ยนชื่ออย่างเป็นทางการเป็น บีจี สเตเดี้ยม 
                และในปี 2568 ได้ปรับชื่ออีกครั้งเป็น ทรู บีจี สเตเดี้ยม จากความร่วมมือเชิงกลยุทธ์กับพันธมิตรรายใหญ่ 
                บริษัท ทรู คอร์ปอเรชั่น จำกัด (มหาชน) ซึ่งนับเป็นอีกก้าวสำคัญของสโมสรในการสร้างเครือข่ายพันธมิตรที่แข็งแกร่ง
              </p>
              <p>
                ด้วยปณิธานและความมุ่งมั่นที่มีอย่างเต็มเปี่ยม บีจีพียูพร้อมเดินหน้าพัฒนาและส่งเสริมศักยภาพของนักฟุตบอลในทุกระดับอย่างไม่หยุดยั้ง 
                ควบคู่กับการเฟ้นหานักฟุตบอลทั้งไทยและต่างประเทศ บริหารโดยทีมผู้ฝึกสอนมืออาชีพ 
                เพื่อสร้างรูปแบบการเล่นที่เป็นแบบฉบับของ เดอะ แรบบิท มุ่งหวังยกระดับสโมสรสู่ระดับสากล
              </p>
            </div>

            {/* Gallery Section */}
            <div className="club-history-gallery-section">
              <div className="club-history-gallery-grid">
                {galleryImages.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="club-history-gallery-item"
                    onClick={() => openGallery(index)}
                  >
                    <div className="club-history-image-container">
                      <img 
                        src={item.image} 
                        alt={item.alt}
                        className="club-history-image"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder-history.png';
                        }}
                      />
                      <div className="club-history-image-overlay">
                        <span className="club-history-year">{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Gallery Modal/Slider */}
      {isGalleryOpen && (
        <div className="club-history-gallery-modal">
          <div className="club-history-gallery-modal-overlay" onClick={closeGallery}></div>
          
          <div className="club-history-gallery-modal-content">
            {/* Close button */}
            <button 
              className="club-history-gallery-close"
              onClick={closeGallery}
              aria-label="Close gallery"
            >
              <i className="club-history-gallery-close-icon">×</i>
            </button>

            {/* Navigation buttons */}
            <button 
              className="club-history-gallery-nav club-history-gallery-prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <i className="club-history-gallery-nav-icon">←</i>
            </button>

            <button 
              className="club-history-gallery-nav club-history-gallery-next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <i className="club-history-gallery-nav-icon">→</i>
            </button>

            {/* Main image */}
            <div className="club-history-gallery-main-image">
              <img 
                src={currentImage.image} 
                alt={currentImage.alt}
                className="club-history-gallery-modal-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-history.png';
                }}
              />
              <div className="club-history-gallery-image-info">
                <span className="club-history-gallery-image-year">{currentImage.year}</span>
                <span className="club-history-gallery-image-counter">
                  {currentImageIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="club-history-gallery-thumbnails">
              {galleryImages.map((item, index) => (
                <div 
                  key={item.id}
                  className={`club-history-gallery-thumbnail ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className="club-history-gallery-thumbnail-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder-history.png';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubHistory;