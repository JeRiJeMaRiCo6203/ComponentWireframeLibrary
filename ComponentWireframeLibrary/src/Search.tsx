import {React, Children, useClient, useState, useEffect, ReactNode, PropsWithChildren, ChangeEventHandler} from 'react';
import SearchBarr  from './components/SearchBar';
// import { SearchResults } from './components/SearchResults';

export default function Search() {

    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBarr/>
                {/* <SearchResults /> */}
            </div>
        </div>
    )
}