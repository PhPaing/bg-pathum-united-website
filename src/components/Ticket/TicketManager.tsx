import React, { useState, useEffect } from 'react';
import { ticketService, Ticket } from '../../api/ticket_service';
import TicketSearch from './TicketSearch';
import PurchaseModal from './PurchaseModal';

const TicketManager: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState<{
    isOpen: boolean;
    ticket: Ticket | null;
  }>({
    isOpen: false,
    ticket: null
  });

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketService.getAll();
      setTickets(data);
      setFilteredTickets(data); 
      setError('');
      setIsSearching(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleSearch = async (criteria: any) => {
    try {
      setSearchLoading(true);
      setIsSearching(true);
      
      const results = await ticketService.search(criteria);
      setFilteredTickets(results);
      setError('');
    } catch (err: any) {
      console.log('API search failed, falling back to local filtering:', err.message);
      
      const filtered = tickets.filter(ticket => {
        if (criteria.matchName && 
            !ticket.matchName.toLowerCase().includes(criteria.matchName.toLowerCase())) {
          return false;
        }
        if (criteria.seat && 
            !ticket.seat.toLowerCase().includes(criteria.seat.toLowerCase())) {
          return false;
        }
        if (criteria.minPrice !== undefined && 
            ticket.price < criteria.minPrice) {
          return false;
        }
        if (criteria.maxPrice !== undefined && 
            ticket.price > criteria.maxPrice) {
          return false;
        }
        return true;
      });
      
      setFilteredTickets(filtered);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setFilteredTickets(tickets);
    setIsSearching(false);
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading tickets from database...</p>
        <p className="text-sm text-gray-500 mt-2">Please make sure your ASP.NET API is running</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Component */}
      <TicketSearch 
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isLoading={searchLoading}
      />
      
      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Ticket Database</h3>
              <p className="text-sm text-gray-600 mt-1">
                Connected to SQL Server via Entity Framework
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  isSearching 
                    ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {isSearching ? (
                    <>
                      <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mr-2 animate-pulse"></span>
                      {filteredTickets.length} filtered tickets
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {tickets.length} total tickets
                    </>
                  )}
                </span>
                {isSearching && (
                  <button
                    onClick={handleClearSearch}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Show All
                  </button>
                )}
              </div>
              <button
                onClick={loadTickets}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {error ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Tickets</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadTickets}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isSearching ? 'No Matching Tickets Found' : 'No Tickets Found'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {isSearching 
                ? 'Try adjusting your search criteria or clear the filters to see all tickets.'
                : 'The database is empty. Create tickets using Swagger or your API.'}
            </p>
            <div className="flex justify-center gap-3">
              {isSearching ? (
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear Search Filters
                </button>
              ) : (
                <button
                  onClick={() => window.open('https://localhost:7193/swagger/index.html', '_blank', 'noopener,noreferrer')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Create Tickets with Swagger
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Seat
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map(ticket => (
                  <tr 
                    key={ticket.id} 
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">#{ticket.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{ticket.matchName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        {ticket.seat}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-700">
                        ฿{ticket.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {formatDate(ticket.matchDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                        ticket.isSold
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        {ticket.isSold ? 'Sold' : 'Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setPurchaseModal({ isOpen: true, ticket })}
                        disabled={ticket.isSold}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          ticket.isSold
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {ticket.isSold ? 'Sold' : 'Purchase'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  Showing <span className="font-semibold">{filteredTickets.length}</span> of{' '}
                  <span className="font-semibold">{tickets.length}</span> tickets
                  {isSearching && ' (filtered)'}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Database:</span>
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs font-medium">
                    MSSQL LocalDB
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Info */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          How to Use the Search System
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">Search Tickets</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Fill any combination of fields: Match name, Seat number, or Price range
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">Apply Filters</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Use the search button to filter tickets based on your criteria
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">View All Data</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Click "Clear All" to return to viewing all tickets
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">Backend Connection</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Searches are performed via ASP.NET API with SQL Server
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {purchaseModal.ticket && (
        <PurchaseModal
          ticket={purchaseModal.ticket}
          isOpen={purchaseModal.isOpen}
          onClose={() => setPurchaseModal({ isOpen: false, ticket: null })}
          onSuccess={loadTickets}
        />
      )}
    </div>
  );
};

export default TicketManager;