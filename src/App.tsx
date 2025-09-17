import React, { useState, useEffect } from 'react';
import { Link, Copy, ExternalLink, Search, Trash2, Calendar } from 'lucide-react';
import UrlInput from './components/UrlInput';
import UrlHistory from './components/UrlHistory';
import { UrlEntry, validateUrl, generateShortUrl } from './utils/urlUtils';

function App() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Load URLs from localStorage on component mount
  useEffect(() => {
    const savedUrls = localStorage.getItem('shortened-urls');
    if (savedUrls) {
      try {
        setUrls(JSON.parse(savedUrls));
      } catch (error) {
        console.error('Error loading URLs from localStorage:', error);
      }
    }
  }, []);

  // Save URLs to localStorage whenever urls state changes
  useEffect(() => {
    localStorage.setItem('shortened-urls', JSON.stringify(urls));
  }, [urls]);

  const handleShortenUrl = async (longUrl: string): Promise<string> => {
    if (!validateUrl(longUrl)) {
      throw new Error('Please enter a valid URL');
    }

    // Check if URL already exists
    const existingUrl = urls.find(url => url.longUrl === longUrl);
    if (existingUrl) {
      throw new Error('This URL has already been shortened');
    }

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const shortUrl = generateShortUrl();
    const newUrlEntry: UrlEntry = {
      id: Date.now().toString(),
      longUrl,
      shortUrl,
      createdAt: new Date(),
      clickCount: 0
    };

    setUrls(prev => [newUrlEntry, ...prev]);
    setLoading(false);
    
    return shortUrl;
  };

  const handleDeleteUrl = (id: string) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all URL history?')) {
      setUrls([]);
    }
  };

  const filteredUrls = urls.filter(url =>
    url.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Link className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            URL Shortener
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long URLs into short, shareable links. Keep track of all your shortened URLs in one place.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <UrlInput onShortenUrl={handleShortenUrl} loading={loading} />
        </div>

        {/* URL History Section */}
        {urls.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                URL History ({urls.length})
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search URLs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 min-w-[200px]"
                  />
                </div>
                
                {/* Clear History Button */}
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>

            <UrlHistory 
              urls={filteredUrls} 
              onDeleteUrl={handleDeleteUrl}
              searchTerm={searchTerm}
            />
          </div>
        )}

        {urls.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Link className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">
              No URLs shortened yet. Start by entering a URL above!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;