import { ItemsContext } from "@/app/page";
import { useContext, useEffect, useState } from "react";
import plusIcon from "@/assets/plus.svg";
import Image from "next/image";
import "./SearchSuggestions.css";

const SearchSuggestions = ({ searchText, createItem, checkItem }) => {
  const itemsContext = useContext(ItemsContext);
  const [suggestions, setSuggestions] = useState([]);
  const [exactMatchAvailable, setExactMatchAvailable] = useState(false);

  useEffect(() => {
    if (itemsContext.items.length > 0) {
      setExactMatchAvailable(false);
      let newSuggestions = itemsContext.items.filter((item) => {
        if (item.name.toLowerCase() == searchText.toLowerCase())
          setExactMatchAvailable(true);
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setSuggestions(newSuggestions);
    }
  }, [searchText]);

  return (
    <div className="searchSuggestionsContainer">
      {/* Add item button */}
      {searchText.length > 1 && !exactMatchAvailable && (
        <div
          className="createNewItemContainer"
          onMouseDown={() => {
            createItem(searchText);
          }}
        >
          <Image
            draggable={false}
            src={plusIcon}
            alt="add item"
            className="addItemIcon"
          />
          <div className="createItemLabel">
            <p>Add</p>
          </div>
          <p className="newItemNamePrompt">{searchText}</p>
        </div>
      )}

      {/* Suggestions list */}
      {suggestions.map((suggestion, index) => {
        return (
          <div
            className="suggestionItem"
            key={index}
            onMouseDown={() => {
              checkItem(suggestion);
            }}
          >
            <p>{suggestion.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSuggestions;
