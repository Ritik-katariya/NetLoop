import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchQuery } from '../../redux/api/searchApi';
import { MdVerified } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { useInView } from 'react-intersection-observer';

const SearchItem = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [page, setPage] = useState(1);
  const searchRef = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref: infiniteRef, inView } = useInView();

  const { data: searchResults, isFetching, fetchMore } = useSearchQuery(
    { query: debouncedSearch, page },
    { skip: !debouncedSearch || debouncedSearch.length < 1 }
  );
console.log(searchResults?.members,"search");
  // Handle infinite scroll
  useEffect(() => {
    if (inView && !isFetching && searchResults?.data?.hasMore) {
      setPage(prev => prev + 1);
      fetchMore();
    }
  }, [inView, isFetching, searchResults?.data?.hasMore]);

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);

    // Click outside handler
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addToHistory = (item) => {
    const newHistory = [
      { text: item.name, type: item.type, id: item.id },
      ...searchHistory.filter(h => h.text !== item.name).slice(0, 4)
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleItemClick = (item, type) => {
    addToHistory({ name: item.name, type, id: item.id });
    if (type === 'member') {
      navigate(`/${item.name}/${item.id}`);
    } else {
      navigate(`/network/${item.id}`);
    }
    setShowResults(false);
    setSearchTerm('');
  };

  // Get the members and networks safely
  const members = searchResults?.members || [];
  const networks = searchResults?.networks || [];



  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
            setPage(1); // Reset page when search term changes
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search..."
          className="w-[100%] px-4 py-2 rounded-lg bg-gray-100 text-primary-textd focus:outline-none focus:ring-2 focus:ring-primary pl-10"
        />
        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {showResults && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {searchTerm ? (
            isFetching && page === 1 ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : (
              <div>
                {members && members.length > 0 && (
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 px-3 py-1">Members</h3>
                    {members.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => handleItemClick(member, 'member')}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={member.profile?.img || '/default-avatar.png'}
                          alt={member.name}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                          onError={(e) => {
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                        <div className="flex items-center">
                          <span className="font-medium">{member?.name}</span>
                          {member.verified?.verified && (
                            <MdVerified className="ml-2 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {networks && networks.length > 0 && (
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 px-3 py-1">Networks</h3>
                    {networks.map((network) => (
                      <div
                        key={network.id}
                        onClick={() => handleItemClick(network, 'network')}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={network.logo || '/default-network.png'}
                          alt={network.name}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                          onError={(e) => {
                            e.target.src = '/default-network.png';
                          }}
                        />
                        <div className="flex items-center">
                          <span className="font-medium">{network.name}</span>
                          {network.verified && (
                            <MdVerified className="ml-2 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(!members?.length && !networks?.length) && (
                  <div className="p-4 text-center text-gray-500">No results found</div>
                )}

                {/* Infinite scroll trigger */}
                {(members?.length > 0 || networks?.length > 0) && (
                  <div ref={infiniteRef} className="h-4">
                    {isFetching && page > 1 && (
                      <div className="text-center text-sm text-gray-500 py-2">
                        Loading more...
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          ) : (
            searchHistory.length > 0 && (
              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-500 px-3 py-1">Recent Searches</h3>
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick(item, item.type)}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <IoTimeOutline className="mr-3 text-gray-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItem; 