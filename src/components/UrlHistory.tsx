import React from 'react';
import { UrlEntry } from '../utils/urlUtils';
import UrlCard from './UrlCard';

interface UrlHistoryProps {
  urls: UrlEntry[];
  onDeleteUrl: (id: string) => void;
  searchTerm: string;
}

const UrlHistory: React.FC<UrlHistoryProps> = ({ urls, onDeleteUrl, searchTerm }) => {
  if (urls.length === 0 && searchTerm) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No URLs found matching "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {urls.map((url) => (
        <UrlCard
          key={url.id}
          url={url}
          onDelete={() => onDeleteUrl(url.id)}
        />
      ))}
    </div>
  );
};

export default UrlHistory;