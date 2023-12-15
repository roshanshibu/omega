import { useState, useContext, useEffect } from "react";

import "./CreateTag.css";
import Image from "next/image";
import plusIcon from "@/assets/plus.svg";
import { ItemsContext } from "@/app/page";


const CreateTag = ({createTag}) => {
    const itemsContext = useContext(ItemsContext);


    const [isTagCreatorExpanded, setIsTagCreatorExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);  
    const [newTagName, setNewTagName] = useState("");
    const [newTagItemIds, setNewTagItemIds] = useState([]);


    useEffect( () => {
        if (itemsContext.items.length > 0) {
            if(searchTerm.length < 1) {
                setSuggestions([])
                return
            }
            let newSuggestions = itemsContext.items.filter((item) => {
              return item.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSuggestions(newSuggestions);
          }
    }, [searchTerm])

    useEffect( () => {
        if (isTagCreatorExpanded === false) {
            setSearchTerm("")
            setNewTagName("")
            setNewTagItemIds([])
            return
          }
    }, [isTagCreatorExpanded])

    useEffect( () => {
        newTagItemIds.map((idToRemove) => {
            let newSuggestions = suggestions.filter((suggestion) => {
                return suggestion.id != idToRemove;
            });
            setSuggestions(newSuggestions);
            return
        })
    }, [newTagItemIds])

    return (
        <>
        <div className= {isTagCreatorExpanded ? "createTagContainer " + "createTagMax" : "createTagContainer"}>
            <div className="createTagHeader">
                <Image
                    draggable={false}
                    src={plusIcon}
                    alt="add tag"
                    className={isTagCreatorExpanded? "addTagIcon " + "iconOnExpand" : "addTagIcon"}
                    onClick={() => {
                        setIsTagCreatorExpanded((previous) => {
                        return !previous;
                        });
                    }}
                />
                <div className={isTagCreatorExpanded? "addTagLabel " + "labelOnExpand" : "addTagLabel"}>
                    <p>New Tag</p>
                </div>
            </div>
            <div className="createTagBody">
                {isTagCreatorExpanded &&
                    <div>
                        
                            <label>Tag Name </label>
                            <div className="inputContainer">
                                <input value={newTagName} onChange={(e) => setNewTagName(e.target.value)}/>
                            </div>
                            <label>Items </label>
                            <div className="selectedItemsContainer">
                                {
                                    itemsContext.items.map((item,key) => {
                                        return  newTagItemIds.includes(item.id) && <div key={key} className="selectedItem">{item.name}</div>
                                    })
                                }
                            </div>
                            <div className="tagItemsSearchContainer">
                                <input className="tagItemsSearchBox" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <div className="tagItemsSearchSuggestions">
                                {
                                    suggestions.map((suggestion,key) => 
                                        {return <p key={key} onClick={() => {setNewTagItemIds([...newTagItemIds, suggestion.id])}}>{suggestion.name}</p>}
                                    )
                                }
                                </div>
                            </div>
                            <button onClick={() => {
                                    if(newTagName!="" && newTagItemIds.length != 0){
                                        let tag = {
                                            name: newTagName,
                                            itemIds: newTagItemIds,
                                        }
                                        createTag(tag);
                                        setIsTagCreatorExpanded((previous) => {
                                            return !previous;
                                        });
                                    }
                                    return
                                }}>
                                Save Tag
                            </button>
                        
                        
                    </div>
                }
            </div>
        </div>
        
        </>
    );
};

export default CreateTag;
