import React, { useState, useEffect } from 'react';
import { ticketService, Ticket, TicketStats } from '../../api/ticket_service';

const TicketDashboard: React.FC = () => {
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [upcoming, setUpcoming] = useState<Ticket[]>([]);
  const [recentPurchases, setRecentPurchases] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [statsData, upcomingData, purchasedData] = await Promise.all([
        ticketService.getStats(),
        ticketService.getUpcoming(3),
        ticketService.getPurchased()
      ]);
      
    console.log('Upcoming matches:', upcomingData);
    console.log('Recent purchases:', purchasedData);
    console.log('Stats:', statsData);

      setStats(statsData);
      setUpcoming(upcomingData);
      setRecentPurchases(purchasedData.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <span className="text-blue-600 text-2xl">🎫</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalTickets || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <span className="text-green-600 text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats?.totalRevenue || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <span className="text-purple-600 text-2xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sold</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.soldTickets || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg mr-4">
              <span className="text-orange-600 text-2xl">🛒</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.availableTickets || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button
            onClick={() => window.open('https://localhost:7193/swagger/index.html#/Tickets/Tickets_CreateTicket', '_blank')}
            className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            + Add New Ticket
          </button>
          <button
            onClick={() => window.open('https://localhost:7193/swagger/index.html#/Tickets/Tickets_PurchaseTicket', '_blank')}
            className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            🛒 Purchase Ticket
          </button>
          <button
            onClick={() => window.open('https://localhost:7193/api/tickets/available', '_blank')}
            className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            👀 View Available
          </button>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Upcoming Matches</h3>
          <button
            onClick={() => window.open('https://localhost:7193/swagger/index.html#/Tickets/Tickets_GetUpcoming', '_blank')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{ticket.matchName}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(ticket.matchDate).toLocaleDateString()} • Seat: {ticket.seat}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">{formatCurrency(ticket.price)}</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Available
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming matches available
            </div>
          )}
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Purchases</h3>
        <div className="space-y-4">
          {recentPurchases.length > 0 ? (
            recentPurchases.map(ticket => (
              <div key={ticket.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{ticket.matchName}</h4>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                    Sold
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Seat: {ticket.seat}</p>
                  <p>Price: {formatCurrency(ticket.price)}</p>
                  <p>Buyer: {ticket.buyerName || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">
                    Purchased: {ticket.soldDate ? new Date(ticket.soldDate).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No purchases yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;