import React, { useState } from 'react';
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ConnectionTest from "./ConnectionTest";
import TicketManager from "./TicketManager";
import TicketDashboard from "./TicketDashboard";

const TicketsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage' | 'api'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎫 BGPU Ticket Management System</h1>
          <p className="text-gray-600">Professional ticketing system powered by ASP.NET Core & React</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-medium text-lg ${activeTab === 'dashboard' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 font-medium text-lg ${activeTab === 'manage' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            🎟️ Ticket Management
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-6 py-3 font-medium text-lg ${activeTab === 'api' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            🔌 API Connection
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && <TicketDashboard />}
        {activeTab === 'manage' && <TicketManager />}
        {activeTab === 'api' && <ConnectionTest />}

        {/* Quick API Links */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">API Endpoints Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded mr-3">GET</span>
                <h4 className="font-bold text-gray-900">Health Check</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">/api/tickets/health</p>
              <button
                onClick={() => window.open('https://localhost:7193/api/tickets/health', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Test Endpoint →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded mr-3">GET</span>
                <h4 className="font-bold text-gray-900">Available Tickets</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">/api/tickets/available</p>
              <button
                onClick={() => window.open('https://localhost:7193/api/tickets/available', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Available →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded mr-3">POST</span>
                <h4 className="font-bold text-gray-900">Purchase Ticket</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">/api/tickets/purchase</p>
              <button
                onClick={() => window.open('https://localhost:7193/swagger/index.html#/Tickets/Tickets_PurchaseTicket', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Purchase Now →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded mr-3">GET</span>
                <h4 className="font-bold text-gray-900">Statistics</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">/api/tickets/stats</p>
              <button
                onClick={() => window.open('https://localhost:7193/api/tickets/stats', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Stats →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded mr-3">GET</span>
                <h4 className="font-bold text-gray-900">Upcoming Matches</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">/api/tickets/upcoming</p>
              <button
                onClick={() => window.open('https://localhost:7193/api/tickets/upcoming', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Upcoming →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded mr-3">GET</span>
                <h4 className="font-bold text-gray-900">Purchased Tickets</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">/api/tickets/purchased</p>
              <button
                onClick={() => window.open('https://localhost:7193/api/tickets/purchased', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Purchased →
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketsPage;