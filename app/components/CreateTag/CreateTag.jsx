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

    const deleteItemSelection = (itemId) => {
        let newItemIdList = newTagItemIds.filter((id) => {
            return id != itemId
        })
        setNewTagItemIds(newItemIdList)
        setSearchTerm("")
        setSuggestions([])
    };


    useEffect( () => {
        if (itemsContext.items.length > 0) {
            if(searchTerm.length < 1) {
                setSuggestions([])
                return
            }
            let newSuggestions = itemsContext.items.filter((item) => {
              return item.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            newTagItemIds.map((idToRemove) => {
                newSuggestions = newSuggestions.filter((suggestion) => {
                    return suggestion.id != idToRemove;
                });
            })
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

    const addItemToTag = (itemId) => {
        setNewTagItemIds([itemId, ...newTagItemIds])
        setSuggestions(suggestions.filter(s => s.id !== itemId))
    }

    // useEffect( () => {
    //     if(suggestions.length == 0) setSearchTerm("")
    // }, [suggestions])

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
                    <>
                        
                            {/* <label>Tag Name </label> */}
                            <div className="inputContainer">
                                <input className="tagNameInput" placeholder="Tag Name" value={newTagName} onChange={(e) => setNewTagName(e.target.value)}/>
                                <div className="selectedItemsContainer">
                                    {
                                        newTagItemIds.map((id, index) => {
                                            return <div key={index} className="selectedItem">
                                                {itemsContext.items.find((item) => item.id == id).name}
                                                <Image
                                                    draggable={false}
                                                    src={plusIcon}
                                                    alt="delete item"
                                                    className={"deleteItemIcon"}
                                                    onClick={() => {
                                                        deleteItemSelection(itemsContext.items.find((item) => item.id == id).id)
                                                    }}
                                                />
                                            </div>
                                        })
                                        // itemsContext.items.map((item,key) => {
                                        //     return  newTagItemIds.includes(item.id) && <div key={key} className="selectedItem">
                                        //         {item.name}
                                        //         <Image
                                        //             draggable={false}
                                        //             src={plusIcon}
                                        //             alt="delete item"
                                        //             className={"deleteItemIcon"}
                                        //             onClick={() => {
                                        //                 deleteItemSelection(item.id)
                                        //             }}
                                        //         />
                                        //     </div>
                                        // })
                                    }
                                </div>
                            </div>
                            {/* <label>Items </label> */}
                            
                            <div className="tagItemsSearchContainer">
                                <div className="inputContainer">
                                    <input placeholder="Serach for Items to Add" className="tagItemsSearchBox" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="tagItemsSearchSuggestions">
                                {
                                    suggestions.map((suggestion,key) => 
                                        {return <p key={key} onClick={() => {addItemToTag(suggestion.id)}}>{suggestion.name}</p>}
                                    )
                                }
                                </div>
                            </div>
                            <div className="saveTag" onClick={() => {
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
                            </div>
                        
                        
                    </>
                }
            </div>
        </div>
        
        </>
    );
};

export default CreateTag;
