import React, { useState } from 'react';
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import './club_management.css';

interface ManagementPerson {
  id: number;
  name: string;
  position: string;
  image: string;
  alt: string;
  type: 'director' | 'committee';
}

const ClubManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directors' | 'committee'>('directors');

  const managementData: ManagementPerson[] = [
    // Directors
    { id: 1, name: "นายปวิณ ภิรมย์ภักดี", position: "ประธานกรรมการ", image: "/images/Board_Organization/Directors/01-k-pavin.jpg", alt: "นายปวิณ ภิรมย์ภักดี", type: 'director' },
    { id: 2, name: "นายปิยศักดิ์ ภูมิจิตร", position: "กรรมการ", image: "/images/Board_Organization/Directors/02-BGPU-Piyasak.png", alt: "นายปิยศักดิ์ ภูมิจิตร", type: 'director' },
    { id: 3, name: "นางสาวเพลินพิศ เทียนสว่าง", position: "กรรมการ", image: "/images/Board_Organization/Directors/03-BGPU-ploenpis.png", alt: "นางสาวเพลินพิศ เทียนสว่าง", type: 'director' },
    { id: 4, name: "นายกิตติศักดิ์ จิรภาสุขสกุล", position: "กรรมการ", image: "/images/Board_Organization/Directors/04-BGPU-kittisak.png", alt: "นายกิตติศักดิ์ จิรภาสุขสกุล", type: 'director' },
    
    // Committee Members
    { id: 5, name: "นางสาวเพลินพิศ เทียนสว่าง", position: "ประธานเจ้าหน้าที่การเงิน", image: "/images/Board_Organization/Committee/05-BGPU-ploenpis.png", alt: "นางสาวเพลินพิศ เทียนสว่าง", type: 'committee' },
    { id: 6, name: "นายพาทิศ ศุภะพงษ์", position: "กรรมการบริหารและผู้อำนวยการกิจการต่างประเทศ", image: "/images/Board_Organization/Committee/05-k-patit.jpg", alt: "นายพาทิศ ศุภะพงษ์", type: 'committee' },
    { id: 7, name: "นายสุรชัย จตุรภัทรพงศ์", position: "ผู้อำนวยการพัฒนาเยาวชน", image: "/images/Board_Organization/Committee/06-BGPU-Surachai.png", alt: "นายสุรชัย จตุรภัทรพงศ์", type: 'committee' },
    { id: 8, name: "นายสมัย สียาโง", position: "ผู้จัดการทั่วไป - Technical", image: "/images/Board_Organization/Committee/10-BGPU-samai.png", alt: "นายสมัย สียาโง", type: 'committee' },
    { id: 9, name: "นายธนากร ปันทวังกูร", position: "เลขาธิการสโมสร", image: "/images/Board_Organization/Committee/07-BGPU-Tanakorn.png", alt: "นายธนากร ปันทวังกูร", type: 'committee' },
    { id: 10, name: "นางสาวนิตยาพร ธาราสุข", position: "ผู้อำนวยการ Commercial", image: "/images/Board_Organization/Committee/09-BGPU-nittayaporn.png", alt: "นางสาวนิตยาพร ธาราสุข", type: 'committee' },
    { id: 11, name: "นายวสันต์ ศานติวิวัฒน์กุล", position: "ผู้จัดการกฎหมาย", image: "/images/Board_Organization/Committee/12-BGPU-Wasan.png", alt: "นายวสันต์ ศานติวิวัฒน์กุล", type: 'committee' },
  ];

  const directors = managementData.filter(person => person.type === 'director');
  const committeeMembers = managementData.filter(person => person.type === 'committee');

  return (
    <div className="club-management-container">
      <Header />
      <div className="club-management-header-margin"></div>

      {/* Page Title */}
      <div className="club-management-title-section">
        <div className="club-management-container-inner">
          <div className="club-management-title-content">
            <h1 className="club-management-title">Board and Organization Structure</h1>
            <a href="/club/history" className="club-management-ex-link">
              Key Milestones <i className="club-management-arrow">→</i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="club-management-container-inner">
        <div className="club-management-content-wrapper">
          <section id="Board" className="Board">
            <div className="container">
              {/* Board Tabs */}
              <div className="board-tabs">
                <div className="nav-container" role="tablist" aria-label="Club Management Tabs">
                  <div className="nav-buttons">
                    <button 
                      className={`nav-button ${activeTab === 'directors' ? 'active' : ''}`}
                      onClick={() => setActiveTab('directors')}
                      role="tab"
                      aria-selected={activeTab === 'directors'}
                      aria-controls="directors-panel"
                      id="directors-tab"
                    >
                      คณะกรรมการ
                    </button>
                    <button 
                      className={`nav-button ${activeTab === 'committee' ? 'active' : ''}`}
                      onClick={() => setActiveTab('committee')}
                      role="tab"
                      aria-selected={activeTab === 'committee'}
                      aria-controls="committee-panel"
                      id="committee-tab"
                    >
                      คณะกรรมการบริหาร
                    </button>
                  </div>
                </div>
                
                <div className="board-tab-content">
                  {/* Directors Tab Panel */}
                  <div 
                    id="directors-panel"
                    role="tabpanel"
                    aria-labelledby="directors-tab"
                    hidden={activeTab !== 'directors'}
                    className={activeTab === 'directors' ? 'tab-pane active' : 'tab-pane'}
                  >
                    <div className="title-board-organization">
                      <h3>คณะกรรมการ</h3>
                    </div>
                    <div className="row">
                      {directors.map((director) => (
                        <div className="col-lg-3 col-md-6" key={director.id}>
                          <div className="post-box">
                            <div className="post-img">
                              <span className="organization-image-shade"></span>
                              <img 
                                src={director.image} 
                                alt={director.alt}
                                className="img-fluid"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/placeholder-person.png';
                                }}
                              />
                              <h5 className="person-name">{director.name}</h5>
                            </div>
                            <p className="post-title">{director.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Committee Tab Panel */}
                  <div 
                    id="committee-panel"
                    role="tabpanel"
                    aria-labelledby="committee-tab"
                    hidden={activeTab !== 'committee'}
                    className={activeTab === 'committee' ? 'tab-pane active' : 'tab-pane'}
                  >
                    <div className="title-board-organization">
                      <h3>คณะกรรมการบริหาร</h3>
                    </div>
                    <div className="row">
                      {committeeMembers.map((member) => (
                        <div className="col-lg-3 col-md-6" key={member.id}>
                          <div className="post-box">
                            <div className="post-img">
                              <span className="organization-image-shade"></span>
                              <img 
                                src={member.image} 
                                alt={member.alt}
                                className="img-fluid"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/placeholder-person.png';
                                }}
                              />
                              <h5 className="person-name">{member.name}</h5>
                            </div>
                            <p className="post-title">{member.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClubManagement;