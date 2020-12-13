import { useState } from 'react';
import './App.css';
import SearchBox from './SearchBox.js';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setValue] = useState();

  const search = (e) => {
    setValue(e.target.value);
    let results = [];
    fetch('https://www.mocky.io/v2/5ba8efb23100007200c2750c')
    .then(response => response.json())
    .then(data =>{

      for(var i=0; i<data.length; i++) {
        let found=0;
        for(const key in data[i]) {
          if(found===1) {
            continue;
          }
          let text = data[i][key];
          if(typeof(text) === 'object') {
            if(text.indexOf(e.target.value.toLowerCase())!==-1) {
              results.push(data[i]);
              found=1;
            }
          } else {
            if(text.toLowerCase().indexOf(e.target.value.toLowerCase())!==-1) {
              results.push(data[i]);
              found=1;
            }
          }
          
        }
      }
      setSearchResults(results);
    });
  };

  return (
    <div className="App">
      <SearchBox 
      handleOnChange={search} 
      searchResults={searchResults} 
      inputValue={inputValue}/>
    </div>
  );
}

export default App;
