import Parser from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';

const Autocomplete = ({handleOnChange, searchResults, inputValue}) => {
    const [focus, setFocus] = useState(null);
    const inputRef = useRef();
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, searchResults.length);
     }, [searchResults]);

    const renderHighlighted = (text) => {
        const index = text.toLowerCase().indexOf(inputValue.toLowerCase());
        if(index > -1) {
            const result = text.substring(0, index)+'<b>'+text.substring(index, index+inputValue.length)+'</b>'+text.substring(index+inputValue.length);
            return result;
        }
        return text;
    };

    const handleKeyDown = (e) => {
        if(e.keyCode === 40) {
            if(e.target.type === "text") {
                    itemsRef.current[0].focus();
                    setFocus(0);
                
            } else {
                if(focus < searchResults.length-1) {
                    setFocus(focus+1);
                    itemsRef.current[focus+1].focus();
                }
                
            }
            
        } else if(e.keyCode === 38) {
            if(focus === 0) {
                inputRef.current.focus();
                setFocus(null);
            } else if(focus !== null) {
                setFocus(focus-1);
                itemsRef.current[focus-1].focus();
            }
        } else if (e.keyCode === 27) {
            inputRef.current.focus();
            setFocus(null);
        } else if (e.keyCode === 13) {
            handleOnChange({target: {value: searchResults[focus].name}});
            inputRef.current.focus();
            setFocus(null);
        }
    }

    const handleMouseOver = (i) => {
        itemsRef.current[i].focus();
        setFocus(i);
    }

    return (
    <div className="search-box">
        <input type="text"
        ref={inputRef}
        onChange={handleOnChange} 
        className="search-input" 
        placeholder="Search users by id, address, name, pincode"
        onKeyDown={handleKeyDown}
        value={inputValue || ''}
        />

        <div className="options" >
            {inputValue && (searchResults.length ?
            
                ( searchResults.map((result, i) => {
                    return (
                        <div tabIndex={i}
                            onMouseOver={()=>{handleMouseOver(i)}}
                            ref={el => itemsRef.current[i] = el} 
                            value={i}
                            onKeyDown={handleKeyDown} 
                            className="option-item" key={i}
                            onClick={()=>handleOnChange({target: {value: searchResults[i].name}})}
                        >
                            
                            <strong>{result.id}</strong>
                           
                            <i>{Parser(renderHighlighted(result.name))}</i>
                            
                            <p className="address"><span>{Parser(renderHighlighted(result.address))}</span>, <span>{Parser(renderHighlighted(result.pincode))}</span></p>
                        </div>
                    )
                }) )
             : (
             
                <div className="option-item">
                    <p>No user found</p>
                </div>
            
             ))
             }
            
        </div>
    </div>);
}


export default Autocomplete;