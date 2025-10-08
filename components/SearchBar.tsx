
import React, { useState } from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos..."
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-2.5 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-white disabled:text-gray-600 transition-colors"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};
