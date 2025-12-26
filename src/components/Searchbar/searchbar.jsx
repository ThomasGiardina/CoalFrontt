import { useState, useId } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
    const uniqueId = useId();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className="flex items-center border border-primary rounded-lg px-4 py-2 bg-neutral">
            <i className="fas fa-magnifying-glass text-primary mr-2"></i>
            <input
                type="text"
                id={`search-${uniqueId}`}
                name={`search-${uniqueId}`}
                autoComplete="off"
                placeholder={placeholder || 'Buscar por título o plataforma...'}
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-neutral text-text focus:outline-none focus:border-none w-full"
            />
        </div>
    );
};

export default SearchBar;
