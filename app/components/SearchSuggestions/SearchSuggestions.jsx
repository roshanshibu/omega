import { ItemsContext } from "@/app/page";
import { useContext, useEffect, useState } from "react";
import plusIcon from "@/assets/plus.svg";
import Image from "next/image";
import "./SearchSuggestions.css";

const SearchSuggestions = ({ searchText, createNewItem }) => {
  const itemsContext = useContext(ItemsContext);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (itemsContext.items.length > 0) {
      let newSuggestions = itemsContext.items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(newSuggestions);
    }
  }, [searchText]);

  return (
    <div className="searchSuggestionsContainer">
      {suggestions.length > 0
        ? suggestions.map((suggestion, index) => {
            return (
              <div key={index}>
                <p>{suggestion.name}</p>
              </div>
            );
          })
        : searchText.length > 1 && (
            <div
              className="createNewItemContainer"
              onMouseDown={() => {
                createNewItem(searchText);
              }}
            >
              <Image
                draggable={false}
                src={plusIcon}
                alt="add item"
                className="addItemIcon"
              />
              <div className="createItemLabel">
                <p>Create</p>
                <p>Item</p>
              </div>
              <p className="newItemNamePrompt">{searchText}</p>
            </div>
          )}
    </div>
  );
};

export default SearchSuggestions;
