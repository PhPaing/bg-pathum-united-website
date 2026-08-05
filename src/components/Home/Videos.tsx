import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import videosData from '../../data/videos.json';
import './Videos.css';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  dateThai: string;
  dateEn: string;
  youtubeUrl: string;
}

export default function Videos() {
  const { translate } = useLanguage();
  const videos: Video[] = videosData.videos;
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  // Function to get date
  const getDate = (video: Video) => {
    return translate(video.dateThai, video.dateEn);
  };

  return (
    <section className="our_department_area">
      <div className="container">
        <div className="header-section">
          <div className="header-title">
            <div className="section_title">
              <h3>{translate('วีดีโอแนะนำ', 'Featured Videos')}</h3>
            </div>
          </div>
          <div className="header-button">
            <div className="section_title">
              <a 
                href="?r=news/BGPUtv" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="boxed-btn3-white-2"
                title={translate('ดูวีดีโอทั้งหมด', 'View all videos')}
              >
                {translate('วีดีโอทั้งหมด', 'All Videos')} &ensp;&gt;
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          {videos.slice(0, 3).map((video) => (
            <div key={video.id} className="col-xl-4 col-md-6 col-lg-4">
              <div className="single_department">
                <div className="department_thumb">
                  <button 
                    className="video-thumbnail"
                    onClick={() => handleVideoClick(video)}
                    title={translate(`เล่นวีดีโอ: ${video.title}`, `Play video: ${video.title}`)}
                    aria-label={translate(`เล่นวีดีโอ: ${video.title}`, `Play video: ${video.title}`)}
                  >
                    <i className="fas fa-play-circle icon_center" aria-hidden="true"></i>
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-overlay"></div>
                  </button>
                </div>
                <div className="department_content">
                  <div className="row">
                    <div className="col-7 pr-0">
                      <p className="post-author headline">{video.category}</p>
                    </div>
                    <div className="col-5 pl-0">
                      <p className="post-date text-right headline">
                        {getDate(video)}
                      </p>
                    </div>
                  </div>
                  <h3>
                    <button 
                      className="video-title-button"
                      onClick={() => handleVideoClick(video)}
                      title={translate(`เล่นวีดีโอ: ${video.title}`, `Play video: ${video.title}`)}
                      aria-label={translate(`เล่นวีดีโอ: ${video.title}`, `Play video: ${video.title}`)}
                    >
                      {video.title}
                    </button>
                  </h3>
                  <p className="text-right readmore">
                    <button 
                      className="learn_more"
                      onClick={() => handleVideoClick(video)}
                      title={translate(`อ่านต่อ: ${video.title}`, `Read More: ${video.title}`)}
                      aria-label={translate(`อ่านต่อ: ${video.title}`, `Read More: ${video.title}`)}
                    >
                      {translate('อ่านต่อ', 'Read More')} &gt;<i className='fas fa-angle-right' aria-hidden="true"></i>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {showModal && selectedVideo && (
          <div className="video-modal">
            <div 
              className="modal-overlay" 
              onClick={closeModal}
              role="button"
              tabIndex={0}
              aria-label={translate('ปิดวิดีโอ', 'Close video modal')}
              onKeyDown={(e) => e.key === 'Enter' && closeModal()}
            ></div>
            <div className="modal-content">
              <button 
                className="modal-close" 
                onClick={closeModal}
                title={translate('ปิดวิดีโอ', 'Close video')}
                aria-label={translate('ปิดวิดีโอ', 'Close video')}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
              <div className="video-container">
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.youtubeUrl)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  aria-label={translate(`ตัวเล่นวิดีโอ YouTube สำหรับ ${selectedVideo.title}`, `YouTube video player for ${selectedVideo.title}`)}
                ></iframe>
              </div>
              <div className="video-info">
                <h4>{selectedVideo.title}</h4>
                <div className="video-meta">
                  <span className="video-category">{selectedVideo.category}</span>
                  <span className="video-date">{getDate(selectedVideo)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}