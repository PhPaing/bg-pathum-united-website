import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Slider.css';

interface Slide {
  id: number;
  image: string;
  titleThai: string;
  titleEn: string;
  link: string;
}

const slidesData: Slide[] = [
  {
    id: 1,
    image: '/images/news/2561_บาร์ 9.11.jpg',
    titleThai: 'จบแบบแบ่งแต้ม! ทัพ "เดอะ แรบบิท" เปิดบ้านเสมอ ระยอง เอฟซี 1-1',
    titleEn: 'Draw! "The Rabbit" draws 1-1 with Rayong FC at home',
    link: '?r=news/ReadNews&iID=2561'
  },
  {
    id: 2,
    image: '/images/news/2560_HTH.jpg',
    titleThai: 'บีจีพียู เตรียมเปิดบ้านดวล ระยอง เอฟซี ศึกไทยลีกแมตช์เดย์ที่ 11',
    titleEn: 'BGPU prepares to host Rayong FC in Thai League Matchday 11',
    link: '?r=news/ReadNews&iID=2560'
  },
  {
    id: 3,
    image: '/images/news/2559_ทีมชาติ Nov u23 16.9.jpg',
    titleThai: 'ชนภัช บัวพันธ์ ตัวแทน "เดอะ แรบบิท" ติดทีมชาติไทย U23 ชุดอุ่นเครื่องดวล อินเดีย',
    titleEn: 'Chanapat Buaphan represents "The Rabbit" in Thailand U23 squad for warm-up against India',
    link: '?r=news/ReadNews&iID=2559'
  },
  {
    id: 4,
    image: '/images/news/2558_Bar ข่าว 5.jpg',
    titleThai: 'เก็บชัยต่อเนื่อง! "บีจีพียู" เปิดบ้านเอาชนะ คาย่าฯ จากฟิลิปปินส์ 2-1',
    titleEn: 'Continuing victory! "BGPU" defeats Kaya FC from Philippines 2-1 at home',
    link: '?r=news/ReadNews&iID=2558'
  }
];

export default function Slider() {
  const { language, translate } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Fixed auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Function to get title based on current language
  const getTitle = (slide: Slide) => {
    return language === 'th' ? slide.titleThai : slide.titleEn;
  };

  return (
    <div className="slider_area">
      <div className="slider-container">
        {/* To show only active slide */}
        <div className="slides-wrapper">
          {slidesData.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="background-banner">
                        <div className="slider_text">
                          <h3>{getTitle(slide)}</h3>
                          <a 
                            href={slide.link} 
                            className="boxed-btn3" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {translate('อ่านต่อ', 'Read More')} &gt;
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="slider-arrow slider-arrow-prev" 
          onClick={prevSlide}
          aria-label={translate('สไลด์ก่อนหน้า', 'Previous slide')}
        >
          <span className="arrow-icon">‹</span>
        </button>
        
        <button 
          className="slider-arrow slider-arrow-next" 
          onClick={nextSlide}
          aria-label={translate('สไลด์ถัดไป', 'Next slide')}
        >
          <span className="arrow-icon">›</span>
        </button>

        {/* Indicators */}
        <div className="slider-indicators">
          {slidesData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={translate(`ไปที่สไลด์ ${index + 1}`, `Go to slide ${index + 1}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}