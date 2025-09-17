import React, { useState } from 'react';
import { Link2, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface UrlInputProps {
  onShortenUrl: (url: string) => Promise<string>;
  loading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onShortenUrl, loading }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    setError('');
    setSuccess('');
    setShortUrl('');

    try {
      const result = await onShortenUrl(inputUrl.trim());
      setShortUrl(result);
      setSuccess('URL shortened successfully!');
      setInputUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleCopyToClipboard = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        setSuccess('Copied to clipboard!');
        setTimeout(() => setSuccess('URL shortened successfully!'), 2000);
      } catch (err) {
        setError('Failed to copy to clipboard');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url-input" className="block text-sm font-semibold text-gray-700 mb-3">
            Enter your long URL
          </label>
          <div className="relative">
            <input
              id="url-input"
              type="text"
              value={inputUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className={`w-full px-4 py-4 pl-12 text-lg border-2 rounded-xl outline-none transition-all duration-200 ${
                error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              }`}
              disabled={loading}
            />
            <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !inputUrl.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Shortening URL...
            </>
          ) : (
            <>
              <Link2 className="w-5 h-5" />
              Shorten URL
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Success Message with Short URL */}
      {success && shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 font-medium">{success}</p>
          </div>
          
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your shortened URL:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-blue-600 font-mono text-sm"
              />
              <button
                onClick={handleCopyToClipboard}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium whitespace-nowrap"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlInput;