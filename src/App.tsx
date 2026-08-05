import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from "./components/Home/Header";
import Slider from "./components/Home/Slider";
import NewsList from "./components/Home/NewsList";
import Videos from "./components/Home/Videos";
import Matches from "./components/Home/Matches";
import Players from "./components/Home/Players";
import VirtualTour from "./components/Home/VirtualTour";
import SponsorBanner from "./components/Home/SponsorBanner";
import Footer from "./components/Home/Footer";
import NewsPage from "./components/News/BGPU NEWS/NewsPage";
import BGChannelPage from './components/News/BG CHANNEL/bgpu-channel';
import BGPUScoopPage from './components/News/BGPU SCOOP/bgpu-scoop';
import ContactUs from './components/Club/Contact_Us/contact_us';
import OfficialPartners from './components/Club/Official_Partners/official_partners';
import ClubHistory from './components/Club/Club_History/club_history';
import ClubManagement from './components/Club/Club_Management/club_management';
import TicketsPage from './components/Ticket/TicketPage';

// Team Pages
import FirstTeam from './components/Teams/FirstTeam/first-team';
import U23Team from './components/Teams/U23/U23-team';
import ExPlayers from './components/Teams/Ex-Players/ex-players';
import PlayerMovement from './components/Teams/PlayerMovement/player-movement';

// Import Chatbox
import Chatbox from './components/Home/chatbot';

// Sponsor banner data
const sponsorBanners = [
  {
    id: 1,
    image: "/images/sponsors/sponsor-2025/sponsors_banner_01_2023.jpg",
    alt: "Sponsors Banner 2023",
  },
  {
    id: 2,
    image: "/images/sponsors/sponsor-2025/BG-Sports-Banner.jpg", 
    alt: "BG Sports Banner 2025",
  }
];

// Chatbox Wrapper Component
const ChatboxWrapper = () => <Chatbox />;

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ChatboxWrapper />
        
        <Routes>
          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4">
                  <Slider />
                  <NewsList />
                  <Videos />
                  <VirtualTour />
                  <Matches />
                  <Players />
                  <SponsorBanner banners={sponsorBanners} interval={5000} />
                </main>
                <Footer />
              </div>
            } 
          />
          
          {/* News Routes */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/News" element={<NewsPage />} />
          <Route path="/news/bg-channel" element={<BGChannelPage />} />
          <Route path="/news/bgpu-scoop" element={<BGPUScoopPage />} />
          
          {/* Team Routes */}
          <Route path="/teams/first-team" element={<FirstTeam />} />
          <Route path="/teams/u23" element={<U23Team />} />
          <Route path="/teams/ex-players" element={<ExPlayers />} />
          <Route path="/teams/player-movement" element={<PlayerMovement />} />
          
          {/* Club Routes */}
          <Route path="/club/contact" element={<ContactUs />} />
          <Route path="/club/partners" element={<OfficialPartners />} />
          <Route path="/club/history" element={<ClubHistory />} />
          <Route path="/club/management" element={<ClubManagement />} />

          {/* Ticket Page Route */}
          <Route path="/tickets" element={<TicketsPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}