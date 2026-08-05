import { Link } from "react-router-dom";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import "./NewsPage.css";

const newsItems = [
  {
    id: 2566,
    title: 'จบเจ๊า! บีจีพียู บุกเสมอ ราชบุรี 0-0 ศึกไทยลีก แมตช์เดย์ 12',
    category: 'BG UPDATE',
    date: '22 พ.ย 2568',
    image: '/images/news/2566_Bar ข่าว.jpg',
    link: '/news/read/2566'
  },
  {
    id: 2564,
    title: '3 ตัวแทนทัพ "เดอะ แรบบิท" ติดทีมชาติไทย ลุยศึกซีเกมส์ ครั้งที่ 33',
    category: 'BG OFFICIAL',
    date: '22 พ.ย 2568',
    image: '/images/news/2564_u23.jpg',
    link: '/news/read/2564'
  },
  {
    id: 2563,
    title: 'ทัพ "เดอะ แรบบิท" ดวล อุบลคิดส์ ซิตี้ ทีมจากเซมิโปร ลีก ศึกเอฟเอคัพ รอบ 32 ทีม',
    category: 'BG OFFICIAL',
    date: '20 พ.ย 2568',
    image: '/images/news/2563_ช้าง 32.1.jpg',
    link: '/news/read/2563'
  },
  {
    id: 2562,
    title: 'ทีมชาติไทย เรียกตัว วาริส ชูทอง เสริมทัพนัดบุกดวล ศรีลังกา',
    category: 'BG UPDATE',
    date: '14 พ.ย 2568',
    image: '/images/news/2562_ทีมชาติ waris.jpg',
    link: '/news/read/2562'
  },
  {
    id: 2561,
    title: 'จบแบบแบ่งแต้ม! ทัพ "เดอะ แรบบิท" เปิดบ้านเสมอ ระยอง เอฟซี 1-1',
    category: 'BG UPDATE',
    date: '9 พ.ย 2568',
    image: '/images/news/2561_บาร์ 9.11.jpg',
    link: '/news/read/2561'
  },
  {
    id: 2559,
    title: 'ชนภัช บัวพันธ์ ตัวแทน "เดอะ แรบบิท" ติดทีมชาติไทย U23 ชุดอุ่นเครื่องดวล อินเดีย',
    category: 'BG UPDATE',
    date: '7 พ.ย 2568',
    image: '/images/news/2559_ทีมชาติ Nov u23 16.9.jpg',
    link: '/news/read/2559'
  },
  {
    id: 2558,
    title: 'เก็บชัยต่อเนื่อง! "บีจีพียู" เปิดบ้านเอาชนะ คาย่าฯ จากฟิลิปปินส์ 2-1',
    category: 'BG UPDATE',
    date: '6 พ.ย 2568',
    image: '/images/news/2558_Bar ข่าว 5.jpg',
    link: '/news/read/2558'
  },
  {
    id: 2557,
    title: '3 แข้ง "เดอะ แรบบิท" มีชื่อติดทีมชาติไทยดวล สิงคโปร์ และ ศรีลังกา',
    category: 'BG UPDATE',
    date: '6 พ.ย 2568',
    image: '/images/news/2557_ทีมชาติ Nov 16.9_0.jpg',
    link: '/news/read/2557'
  },
  {
    id: 2556,
    title: 'อิชิอิ พร้อมเต็มที่พา บีจีฯ ดวล คาย่า - กฤษดา ย้ำต้องชนะเพื่อโอกาสเข้ารอบต่อไป',
    category: 'BG UPDATE',
    date: '5 พ.ย 2568',
    image: '/images/news/2556_BGPU-7.jpg',
    link: '/news/read/2556'
  }
];

export default function NewsPage() {
  return (
    <div className="news-page">
      <Header />

      {/* Page Title */}
      <div className="page-title-section">
        <div className="container">
          <div className="page-title-content">
            <h1>All News</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="news-tabs-container">
        <div className="container">
          <div className="news-tabs-wrapper">
            <div className="news-tabs">
              <Link to="/news" className="news-tab news-tab-active">
                BGPU NEWS
              </Link>
              <Link to="/news/bgpu-scoop" className="news-tab">
                BGPU SCOOP
              </Link>
              <Link to="/news/bg-channel" className="news-tab">
                BG CHANNEL
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="news-main">
        <div className="container">
          <div className="section-title">
            <h3>BGPU NEWS</h3>
          </div>

          {/* News Grid */}
          <div className="news-grid">
            {newsItems.map((news) => (
              <div key={news.id} className="news-card">
                <div className="news-image-container">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="news-image"
                  />
                </div>
                
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-category">{news.category}</span>
                    <span className="news-date">{news.date}</span>
                  </div>
                  
                  <div className="news-title">
                    <a href={news.link} className="news-title-link">
                      {news.title}
                    </a>
                  </div>
                </div>
                
                <div className="news-readmore">
                  <a href={news.link} className="readmore-link">
                    อ่านต่อ &gt;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination">
              <button className="pagination-button pagination-disabled" disabled>
                ← Previous
              </button>
              <button className="pagination-button pagination-active">1</button>
              <button className="pagination-button">2</button>
              <button className="pagination-button">3</button>
              <button className="pagination-button">4</button>
              <button className="pagination-button">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}