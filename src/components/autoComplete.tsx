// import Necessary Modules
import React, { useRef } from "react";
import styles from "./autoComplete.module.css";
// Import Product Interface
import { Product } from "../App";
// Impot custom hook
import { useAutoComplete } from "./useAutoCompleted";
// Define Props interface for AutoComplete Component 
interface Props{
    options:Product[];
    handleInputQuery:(query:string)=>void
}
// AutoComplete Component that is of type React functional component accepting props as defined
const  AutoComplete:React.FC<Props>=({options, handleInputQuery}:Props)=>{
    // Destructure the values from useAutoComplete custom Hook
    const [input, inputChangeHandler, handleKeyDown, setInput, showOptions, setShowOptions, selectedOptionIndex, setSelectedOptionIndex, useOutsideClick] =useAutoComplete(options,handleInputQuery);
    // function to handle options selection
    const handleSelectOption=(opt:string)=>{
        setInput(opt)
        setShowOptions(false);
    }
    //referce for the form element
    const formRef=useRef<HTMLDivElement>(null);
    // Custom hook to detect click outside the form
    useOutsideClick(formRef, () => setShowOptions(false));
    // render the autoComplete Component
    return<>
    <div className={styles.input__container} id="autoCompleteDiv"  ref={formRef}>
    <form>
        <input type="text"  
                id="inputField" 
                value={input} 
                onChange={(e)=>{inputChangeHandler(e)}}  
                onFocus={()=>{setShowOptions(true)}} 
                className={styles.form__input} 
                onKeyDown={handleKeyDown}
                />
        <label htmlFor="inputField" className={input?styles.active__input:styles.input__label}>Type Here To List Products...</label>
        {input?<button className={styles.form__clearInput} 
        onClick={()=>{setInput("");
         setSelectedOptionIndex(-1);
         handleInputQuery("")}}
         >X</button>:undefined}
    </form>
    
    <ol className={showOptions?styles.suggestion:""}>
        {showOptions && options.map((item:Product,index:number)=>

        {
                let beforeMatch=item.title;
                let match="";
                let afterMatch=""
            if(selectedOptionIndex<0){
            const ind:number=item.title.toLowerCase().indexOf(input.toLowerCase());
             beforeMatch=item.title.slice(0,ind);
             match=item.title.slice(ind,ind+input.length);
             afterMatch=item.title.slice(ind+input.length,item.title.length)
            }
            return(
        <li
          className={selectedOptionIndex===index? styles.selected:""}
        onClick={()=>{handleSelectOption(item.title); }}
        onMouseEnter={(()=> {setInput(item.title); setSelectedOptionIndex(index)})}
        key={item.id}
        >
        {beforeMatch}
        <strong>{match}</strong>
        {afterMatch}
        </li>)
        }
        )}
    </ol>
    </div>
    </>
}
// Export autoComplete Component
export default AutoComplete;