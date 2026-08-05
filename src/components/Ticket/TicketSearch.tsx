import React, { useState } from 'react';
import { TicketSearchCriteria } from '../../api/ticket_service';

interface TicketSearchProps {
  onSearch: (criteria: TicketSearchCriteria) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const TicketSearch: React.FC<TicketSearchProps> = ({ onSearch, onClear, isLoading = false }) => {
  const [criteria, setCriteria] = useState<TicketSearchCriteria>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? undefined : Number(value);
    
    if (name.includes('Price') && numValue !== undefined && numValue < 0) {
      return;
    }
    
    setCriteria(prev => ({
      ...prev,
      [name]: numValue
    }));
  };

  const handleSearch = () => {
    onSearch(criteria);
  };

  const handleClear = () => {
    setCriteria({});
    onClear();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          🔍 Search & Filter Tickets
        </h2>
        <span className="text-sm text-gray-500">
          Fill any combination of fields
        </span>
      </div>
      
      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="matchName" className="block text-sm font-semibold text-gray-700">
            Match Name
          </label>
          <input
            id="matchName"
            type="text"
            name="matchName"
            value={criteria.matchName || ''}
            onChange={handleInputChange}
            placeholder="e.g., BGPU vs Manchester United"
            aria-label="Match name to search for"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500">
            Partial matches will be shown
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="seat" className="block text-sm font-semibold text-gray-700">
            Seat Number/Area
          </label>
          <input
            id="seat"
            type="text"
            name="seat"
            value={criteria.seat || ''}
            onChange={handleInputChange}
            placeholder="e.g., A12, VIP Section, North Stand"
            aria-label="Seat number or section to search for"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500">
            Enter seat number or section
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range (฿)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="minPrice" className="sr-only">Minimum price</label>
              <input
                id="minPrice"
                type="number"
                name="minPrice"
                value={criteria.minPrice || ''}
                onChange={handleNumberChange}
                placeholder="Min"
                min="0"
                step="100"
                aria-label="Minimum ticket price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="sr-only">Maximum price</label>
              <input
                id="maxPrice"
                type="number"
                name="maxPrice"
                value={criteria.maxPrice || ''}
                onChange={handleNumberChange}
                placeholder="Max"
                min="0"
                step="100"
                aria-label="Maximum ticket price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Leave empty for no limit
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSearch}
          disabled={isLoading}
          title="Search for tickets with current criteria"
          aria-label="Search for tickets"
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
              <span aria-live="polite" aria-busy="true">Searching...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Tickets
            </>
          )}
        </button>
        
        <button
          onClick={handleClear}
          disabled={isLoading}
          title="Clear all search filters"
          aria-label="Clear search filters"
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default TicketSearch;