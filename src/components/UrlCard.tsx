import React, { useState } from 'react';
import { ExternalLink, Copy, Trash2, CheckCircle, Calendar } from 'lucide-react';
import { UrlEntry, formatDate } from '../utils/urlUtils';

interface UrlCardProps {
  url: UrlEntry;
  onDelete: () => void;
}

const UrlCard: React.FC<UrlCardProps> = ({ url, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenUrl = (urlToOpen: string) => {
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="flex flex-col space-y-4">
        {/* Header with date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {formatDate(url.createdAt)}
          </div>
          
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete URL"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* URLs */}
        <div className="space-y-3">
          {/* Original URL */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Original URL
            </label>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
              <p className="flex-1 text-sm text-gray-700 break-all font-mono">
                {url.longUrl}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => handleCopy(url.longUrl)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                  title="Copy original URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenUrl(url.longUrl)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                  title="Open original URL"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Shortened URL */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Shortened URL
            </label>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="flex-1 text-sm text-blue-700 font-mono font-medium">
                {url.shortUrl}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => handleCopy(url.shortUrl)}
                  className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                  title="Copy shortened URL"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleOpenUrl(url.longUrl)}
                  className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                  title="Open URL"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Success Message */}
        {copied && (
          <div className="text-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              <CheckCircle className="w-3 h-3" />
              Copied to clipboard!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlCard;