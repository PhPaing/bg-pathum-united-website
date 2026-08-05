import React, { useState } from 'react';
import { ticketService } from '../../api/ticket_service';

const ConnectionTest: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testDirectConnection = async () => {
    setTesting(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://localhost:7193/api/tickets', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      
      setResult({
        type: 'Direct Connection',
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        cors: response.headers.get('access-control-allow-origin')
      });
    } catch (err: any) {
      setError(`Direct connection failed: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  const testApiCall = async () => {
    setTesting(true);
    setError('');
    
    try {
      const tickets = await ticketService.getAll();
      setResult({
        type: 'API Call',
        success: true,
        count: tickets.length,
        sample: tickets.slice(0, 2),
      });
    } catch (err: any) {
      setError(`API call failed: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  const openSwagger = () => {
    window.open('https://localhost:7193/swagger/index.html', '_blank', 'noopener,noreferrer');
  };

  const openApiDirect = () => {
    window.open('https://localhost:7193/api/tickets', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">API Connection Test</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={testDirectConnection}
            disabled={testing}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Test Connection
          </button>
          
          <button
            onClick={testApiCall}
            disabled={testing}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Get Tickets
          </button>
          
          <button
            onClick={openSwagger}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Open Swagger
          </button>
        </div>

        {testing && (
          <div className="flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>Testing connection...</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h4 className="font-semibold text-red-700 mb-2">Connection Error</h4>
            <p className="text-red-600 mb-3">{error}</p>
            
            <div className="mt-3 pt-3 border-t border-red-200">
              <h5 className="font-medium text-red-700 mb-2">Quick Fixes:</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-red-600 font-bold">1</span>
                  </div>
                  <span className="text-red-600">Run Visual Studio API first (press F5)</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-red-600 font-bold">2</span>
                  </div>
                  <span className="text-red-600">Check if <code className="bg-red-100 px-1 rounded">https://localhost:7193</code> is accessible</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-red-600 font-bold">3</span>
                  </div>
                  <button
                    onClick={openSwagger}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Click here to open Swagger in new tab
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && !error && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className="font-semibold text-green-700">Connected Successfully!</h4>
            </div>
            <div className="mt-2">
              <pre className="text-sm bg-white p-3 rounded border border-green-300 overflow-auto max-h-60">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Quick Links:</h4>
            <button
              onClick={openApiDirect}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Test API Directly →
            </button>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-600">Swagger UI</p>
              <p className="text-gray-500 mt-1">Interactive API documentation</p>
              <p className="mt-2">
                <button
                  onClick={openSwagger}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Open in new window
                </button>
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-600">Tickets API</p>
              <p className="text-gray-500 mt-1">Raw JSON endpoint</p>
              <p className="mt-2">
                <button
                  onClick={openApiDirect}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Open in new window
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;