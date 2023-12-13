import { useState, useContext } from "react";
import Select from 'react-select';

import "./CreateTag.css";
import Image from "next/image";
import plusIcon from "@/assets/plus.svg";
import { ItemsContext } from "@/app/page";


const CreateTag = () => {
    const [isTagCreatorExpanded, setIsTagCreatorExpanded] = useState(false);

    const itemsContext = useContext(ItemsContext);

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
                        <form>
                            <label>Tag Name </label>
                            <div className="inputContainer">
                                <input></input>
                            </div>
                            <label>Items </label>
                            <div className="inputContainer">
                                <Select
                                    isMulti
                                    className="customSelect"
                                    name="items"
                                    // menuIsOpen ={true}
                                    options={itemsContext.items.map((item)=>{
                                        console.log({value: item.id, label: item.name})
                                        return {value: item.id, label: item.name}})}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: 'white',
                                        }),
                                          }}
                                />
                            </div>
                            {/* <label>Items </label>
                            <div className="inputContainer">
                                <input></input>
                            </div> */}
                            <button>Save Tag</button>
                        </form>
                        
                    </div>
                }
            </div>
        </div>
        
        </>
    );
};

export default CreateTag;
