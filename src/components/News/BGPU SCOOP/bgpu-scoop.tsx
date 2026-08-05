import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../Home/Header';
import Footer from '../../Home/Footer';
import './bgpu-scoop.css';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  link: string;
}

const scoopNewsData: NewsItem[] = [
  {
    id: 2565,
    title: 'ทัพ “เดอะ แรบบิท” เตรียมเคลื่อนพลบุกเยือน ราชบุรี เอฟซี',
    category: 'Head to Head',
    date: '22 พ.ย 2568',
    image: '/images/news/2565_HTH 16.9_0.jpg',
    link: '/news/read/2565'
  },
  {
    id: 2560,
    title: 'ทบีจีพียู เตรียมเปิดบ้านดวล ระยอง เอฟซี ศึกไทยลีกแมตช์เดย์ที่ 11',
    category: 'Head to Head',
    date: '9 พ.ย 2568',
    image: '/images/news/2560_HTH.jpg',
    link: '/news/read/2560'
  },
  {
    id: 2554,
    title: 'ทัพ “เดอะ แรบบิท” ขาด “ชนาธิป” บุกเยือน ชลบุรี เอฟซี ศึกไทยลีด แมตช์เดย์ 10',
    category: 'Head to Head',
    date: '2 พ.ย 2568',
    image: '/images/news/2554_HTH 16.9.jpg',
    link: '/news/read/2554'
  },
  {
    id: 2547,
    title: '“บีจีพียู” ยกพลบุกถ้ำค้างค้าวดวล สุโขทัย เอฟซี',
    category: 'Head to Head',
    date: '26 ต.ค 2568',
    image: '/images/news/2547_HTH 16.9.2.jpg',
    link: '/news/read/2547'
  },
  {
    id: 2542,
    title: 'สทัพ “เดอะ แรบบิท” เตรียมรับมือน้องใหม่เปิดบ้านดวล อยุธยา ยูไนเต็ด',
    category: 'Head to Head',
    date: '17 ต.ค 2568',
    image: '/images/news/2542_HTH 16.9.jpg',
    link: '/news/read/2542'
  },
  {
    id: 2538,
    title: 'ทศึกใหญ่ห้ามพลาด! “บีจีพียู” ยกทัพบุกแดนอีสานใต้ดวล บุรีรัมย์ ยูไนเต็ด',
    category: 'Head to Head',
    date: '5 ต.ค 2568',
    image: '/images/news/2538_HTH 16.9.jpg',
    link: '/news/read/2538'
  },
  {
    id: 2531,
    title: 'ทศึกใหญ่ห้ามพลาด! “บีจีพียู” ยกทัพบุกแดนอีสานใต้ดวล บุรีรัมย์ ยูไนเต็ด',
    category: 'Head to Head',
    date: '5 ต.ค 2568',
    image: '/images/news/2531_HTH 16.9_0.jpg',
    link: '/news/read/2531'
  },
  {
    id: 2526,
    title: 'ทศึกใหญ่ห้ามพลาด! “บีจีพียู” ยกทัพบุกแดนอีสานใต้ดวล บุรีรัมย์ ยูไนเต็ด',
    category: 'Head to Head',
    date: '5 ต.ค 2568',
    image: '/images/news/2526_HTH 1_0.jpg',
    link: '/news/read/2526'
  },
  {
    id: 2522,
    title: 'ทศึกใหญ่ห้ามพลาด! “บีจีพียู” ยกทัพบุกแดนอีสานใต้ดวล บุรีรัมย์ ยูไนเต็ด',
    category: 'Head to Head',
    date: '5 ต.ค 2568',
    image: '/images/news/2522_HTH 16.9_0.jpg',
    link: '/news/read/2522'
  },
];
const tabs = [
  { id: 'bgpu-news', label: 'BGPU NEWS', href: '/news' },
  { id: 'bgpu-scoop', label: 'BGPU SCOOP', href: '/news/bgpu-scoop' },
  { id: 'bg-channel', label: 'BG CHANNEL', href: '/news/bg-channel' }
];

export default function BGPUScoopPage() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const getActiveTab = () => {
    if (location.pathname === '/news/bgpu-scoop') return 'bgpu-scoop';
    if (location.pathname === '/news/bg-channel') return 'bg-channel';
    return 'bgpu-news';
  };

  const activeTab = getActiveTab();

  const totalPages = Math.ceil(scoopNewsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = scoopNewsData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

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

      <div className="news-tabs-container">
        <div className="container">
          <div className="news-tabs-wrapper">
            <div className="news-tabs">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.href}
                  className={`news-tab ${activeTab === tab.id ? 'news-tab-active' : ''}`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="news-main">
        <div className="container">
          <div className="section-title">
            <h3>BGPU SCOOP</h3>
          </div>

          <div className="news-grid">
            {currentNews.map((news) => (
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
                    <Link to={news.link} className="news-title-link">
                      {news.title}
                    </Link>
                  </div>
                </div>
                
                <div className="news-readmore">
                  <Link to={news.link} className="readmore-link">
                    อ่านต่อ &gt;
                  </Link>
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