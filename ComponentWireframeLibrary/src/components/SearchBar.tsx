import {ChangeEventHandler, React, useState} from 'react';
import "./SearchBar.css";
import {FaSearch} from 'react-icons/fa';
import {api} from '../config/api';

export default function SearchBar() {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const fetchSearchResults = async (value: string) => {
        // Fetch data from the API
        const response = await api.get('/search/?keyword=' + value);

        if (response.status === 200) {
            setSearchResults(response.data || []); // Set results if found
            console.log(response.data);
        }
        else if(response.status === 404 || response.status === 400) {   
            setSearchResults([]); // Reset to empty array if no results
            console.log(response.data);
        }

        console.log(searchResults);
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        setSearch(value); // Update input value

        if (value.trim()) {
            fetchSearchResults(value); // Fetch search results if input is not empty
        } else {
            setSearchResults([]); // Reset results if the input is empty
        }
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Type to Search..." value={search} onChange={handleChange}/>
        </div>
    )
}
