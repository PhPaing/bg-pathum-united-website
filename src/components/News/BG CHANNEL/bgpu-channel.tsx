import { Link } from "react-router-dom";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import "./bgpu-channel.css";

interface VideoItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  videoUrl: string;
}

const bgChannelVideos: VideoItem[] = [
  {
    id: 1,
    title: "HIGHLIGHTS : RATCHABURI FC 0-0 BG PATHUM UNITED",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "22 พ.ย 2568",
    image: "/images/bg_channel/475_20251122_215630.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dHeZ1O1TrWY"
  },
  {
    id: 2,
    title: "HIGHLIGHTS : BG PATHUM UNITED 1-1 RAYONG FC",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "09 พ.ย 2568",
    image: "/images/bg_channel/474_20251109_202132.jpg",
    videoUrl: "https://www.youtube.com/watch?v=siTlkn3uJ8s"
  },
  {
    id: 3,
    title: "HIGHLIGHTS : CHONBURI FC 1-2 BG PATHUM UNITED",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "02 พ.ย 2568",
    image: "/images/bg_channel/473_20251102_215740.jpg",
    videoUrl: "https://www.youtube.com/watch?v=XqZac8nwKSk"
  },
  {
    id: 4,
    title: "HIGHLIGHTS : BG PATHUM UNITED 4-0 KAMPHAENGPHET FC | CHANG FA CUP 2025/26 (ROUND 64)",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "29 ต.ค 2568",
    image: "/images/bg_channel/472_20251029_210000.jpg",
    videoUrl: "https://www.youtube.com/watch?v=CbuiPPOwSzU"
  },
  {
    id: 5,
    title: "HIGHLIGHTS : SUKHOTHAI FC 3-1 BG PATHUM UNITED | BYD SEALION 6 LEAGUE 1 2025/26 (MW9)",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "26 ต.ค 2568",
    image: "/images/bg_channel/471_20251026_214215.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Mmmo-Ipy8Gs"
  },
  {
    id: 6,
    title: "HIGHLIGHTS : BG PATHUM UNITED 1-0 AYUTTAYA UNITED | BYD SEALION 6 LEAGUE 1 2025/26 (MW8)",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "18 ต.ค 2568",
    image: "/images/bg_channel/470_20251018_214721.jpg",
    videoUrl: "https://www.youtube.com/watch?v=irLn149Bl_Q"
  },
  {
    id: 7,
    title: "HIGHLIGHTS : BURIRAM UNITED 2-2 BG PATHUM UNITED | BYD SEALION 6 LEAGUE 1 2025/26 (MW7)",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "18 ต.ค 2568",
    image: "/images/bg_channel/469_20251018_214641.jpg",
    videoUrl: "https://www.youtube.com/watch?v=2jdZDIQ7N98"
  },
  {
    id: 8,
    title: "HIGHLIGHTS :Tampines Rovers FC 2-1 BG Pathum United | ACL TWO 2025/26 (MW2)",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "18 ต.ค 2568",
    image: "/images/bg_channel/468_20251018_214445.jpg",
    videoUrl: "https://www.youtube.com/watch?v=F8qfL1dGCQs"
  },
  {
    id: 9,
    title: "HIGHLIGHTS :BG PATHUM UNITED 2-0 PORT FC| BYD SEALION 6 LEAGUE1 2025/26 (MW6)",
    category: 'BG GOAL(HIGHLIGHT)',
    date: "18 ต.ค 2568",
    image: "/images/bg_channel/467_20251018_214224.jpg",
    videoUrl: "https://www.youtube.com/@BGCHANNELOFFICIAL/videos"
  }
];

export default function BGChannelPage() {
  return (
    <div className="bg-channel-page">
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
              <Link to="/news" className="news-tab">
                BGPU NEWS
              </Link>
              <Link to="/news/bgpu-scoop" className="news-tab">
                BGPU SCOOP
              </Link>
              <Link to="/news/bg-channel" className="news-tab news-tab-active">
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
            <h3>BG CHANNEL</h3>
          </div>

          <div className="video-grid">
            {bgChannelVideos.map((video) => (
              <div key={video.id} className="video-card">
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                  <div className="video-thumb">
                    <img src={video.image} alt={video.title} />
                    <div className="play-icon">
                      ▶
                    </div>
                  </div>
                </a>

                <div className="video-info">
                  <span className="news-category">{video.category}</span>
                  <p className="video-date">{video.date}</p>
                  <h3 className="video-title">{video.title}</h3>
                </div>

                <div className="video-readmore">
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
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