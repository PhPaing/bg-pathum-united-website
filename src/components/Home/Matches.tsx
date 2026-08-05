import { useLanguage } from '../../contexts/LanguageContext';
import './Matches.css';

export default function Matches() {
  const { translate } = useLanguage();

  return (
    <section className="service_area">
      <div className="container">
        <div className="matches-row">
          
          {/* NEXT MATCH */}
          <div className="match-card">
            <div className="card">
              <div className="card-header next-match-header">
                <span>{translate('นักเตะไป', 'Next Match')}</span>
                <img 
                  src="/images/tournament/2025-08-14_02-59-18_byd-thaileague-1.png" 
                  alt="BYD League" 
                  className="tournament-img"
                />
              </div>

              <div className="card-body">
                <div className="match-info">
                  <div className="match-date">
                    <strong>Sat 22 Nov</strong>
                    <strong>19:30</strong>
                  </div>
                  <div className="stadium-name">
                    <strong>{translate('Ratchaburi Stadium', 'Ratchaburi Stadium')}</strong>
                  </div>
                </div>

                <div className="teams-container">
                  <div className="team home-team">
                    <img 
                      src="/images/club/2023-08-22_12-09-10_8.RATCHABURI FC_ราชบุรี เอฟซี.png" 
                      alt={translate('ราชบุรี เอฟซี', 'Ratchaburi FC')}
                      className="team-logo"
                    />
                    <div className="team-name">{translate('ราชบุรี เอฟซี', 'Ratchaburi FC')}</div>
                  </div>
                  
                  <div className="vs-circle">{translate('V', 'V')}</div>
                  
                  <div className="team away-team">
                    <img 
                      src="/images/club/2023-10-24_08-49-16_2023-10-24_08-09-02_bgpu_logo_2023_new.png" 
                      alt={translate('บีจี ปทุม ยูไนเต็ด', 'BG Pathum United')}
                      className="team-logo"
                    />
                    <div className="team-name">{translate('บีจี ปทุม ยูไนเต็ด', 'BG Pathum United')}</div>
                  </div> 
                </div>
              </div>
              <div className="card-footer">
                <a href="https://home.bgonlineapp.com/?r=Ticket" target="_blank" rel="noopener noreferrer">
                  <button className="view-all-btn">{translate('TICKET', 'TICKET')} &gt;</button>
                </a>
              </div>
            </div>
          </div>

          {/* LEAGUE TABLE */}
          <div className="match-card">
            <div className="card">
              <div className="card-header">
                <span>{translate('ตารางคะแนน', 'League Table')}</span>
              </div>

              <div className="card-body">
                <table className="league-table">
                  <thead>
                    <tr>
                      <th>{translate('Pos', 'Pos')}</th>
                      <th>{translate('Team', 'Team')}</th>
                      <th>{translate('Pts', 'Pts')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="team-cell">
                        <img 
                          src="/images/club/2023-08-22_12-06-08_1.BURIRAM UNITED_บุรีรัมย์ ยูไนเต็ด.png" 
                          alt="Buriram United"
                          className="team-icon"
                        />
                        {translate('Buriram United', 'Buriram United')}
                      </td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="team-cell">
                        <img 
                          src="/images/club/2023-08-22_12-09-10_8.RATCHABURI FC_ราชบุรี เอฟซี.png" 
                          alt="Ratchaburi FC"
                          className="team-icon"
                        />
                        {translate('Ratchaburi FC', 'Ratchaburi FC')}
                      </td>
                      <td>22</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="team-cell">
                        <img 
                          src="/images/club/2023-08-22_12-39-08_2.TRUE BANGKOK UNITED_ทรู แบงค็อก ยูไนเต็ด.png" 
                          alt="True Bangkok United"
                          className="team-icon"
                        />
                        {translate('True Bangkok United', 'True Bangkok United')}
                      </td>
                      <td>21</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="team-cell">
                        <img 
                          src="/images/club/2023-08-22_12-21-01_3.PORT FC_การท่าเรือ เอฟซี.png" 
                          alt="Port FC"
                          className="team-icon"
                        />
                        {translate('Port FC', 'Port FC')}
                      </td>
                      <td>20</td>
                    </tr>
                    <tr className="bgpu-row">
                      <td>5</td>
                      <td className="team-cell">
                        <img 
                          src="/images/club/2023-10-24_08-49-16_2023-10-24_08-09-02_bgpu_logo_2023_new.png" 
                          alt="BG Pathum United"
                          className="team-icon"
                        />
                        {translate('BG Pathum United', 'BG Pathum United')}
                      </td>
                      <td>18</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="card-footer">
                <button className="view-all-btn">{translate('ดูทั้งหมด', 'View All')} &gt;</button>
              </div>
            </div>
          </div>

          {/* ONLINE SHOP */}
          <div className="match-card">
            <div className="card">
              <div className="card-header">
                <span>{translate('ตัวแทน', 'Agents')}</span>
              </div>

              <div className="card-body">
                <div className="shop-section">
                  <div className="shop-title">{translate('สินค้าออนไลน์', 'Online Products')}</div>
                  <div className="shop-item">{translate('สินค้าที่ตอบมา', 'Recommended Products')}</div>
                </div>
              </div>

              <div className="card-footer">
                <a href="https://www.bgpushop.com/" target="_blank" rel="noopener noreferrer">
                  <button className="view-all-btn">{translate('สินค้าทั้งหมด', 'All Products')} &gt;</button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}