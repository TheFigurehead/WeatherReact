import React, {createRef, useState} from 'react';

import SearchItem from './SearchItem.jsx';

const Search = (props) => {

    const input = createRef();
    const [list, setList] = useState('');

    let timeout = false;

    const sendRequest = (query) => {

        let url = new URL('https://api.openweathermap.org/data/2.5/weather');

        url.searchParams.append( 'q', query );
        url.searchParams.append( 'units', 'metric' );
        url.searchParams.append( 'appid', 'a913900e0d98f5e2a59336d802de9594' );
        
        fetch(url.href)
        .then( response => response.json() )
        .then( data => { 
            setList(data);
        })
        .catch(()=>{
            console.log('wrong request');
        });

    }

    const onChange = () => {
        // wait 500 ms before send the request, to be sure the user stoped typing
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => { 
            sendRequest(input.current.value); 
        }, 500);
    };

    return (
        <div className="search">
            <div>Search: <input type="text" ref={input} onChange={onChange} /></div>
            <div>
                <SearchItem city={list} />
            </div>
        </div>
    );
}

export default Search;