// import necessary modules
import React, { useEffect, useState } from "react";
// import product interface 
import { Product } from "../App";
// Define a custom hook named useAutoComplete which handles autocomplete functionality
export const useAutoComplete = (options: Product[], handleInputQuery: (query: string) => void): [string, React.ChangeEventHandler<HTMLInputElement>, React.KeyboardEventHandler<HTMLInputElement>, React.Dispatch<React.SetStateAction<string>>, boolean, React.Dispatch<React.SetStateAction<boolean>>, number , React.Dispatch<React.SetStateAction<number>>, (ref: React.RefObject<HTMLDivElement>, callback: () => void) => void] => {
    // Define state variables using the useState hook
    const [input, setInput] = useState<string>("");
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    // Event handler for input change
    const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const inputValue = e.target.value;
      setInput(inputValue);
      setShowOptions(true);
      setSelectedOptionIndex(-1);
    //   call the handleInputQuery with input value
      handleInputQuery(inputValue);
    };
//   event handler for keybord actions
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "ArrowUp") {
        // decreasing the selection index by one and keeping the track it is never less than zero 
        setSelectedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        // Set input value to the title of the selected option
        if (selectedOptionIndex !== -1 && options.length > selectedOptionIndex) {
          setInput(options[selectedOptionIndex].title);
        }
      } else if (e.key === "ArrowDown") {
        // increasing the selection index by one and keeping the track it is never grater than or equal to options array length
        setSelectedOptionIndex((prevIndex) => Math.min(prevIndex + 1, options.length - 1));
        // Set input value to the title of the selected option
        if (selectedOptionIndex !== -1 && options.length > selectedOptionIndex) {
          setInput(options[selectedOptionIndex].title);
        }
      } else if (e.key === "Enter") {
        // Prevent default behavior of enter key
        e.preventDefault();
        // If an option is selected, set input value to its title, hide options, and reset selectedOptionIndex
        if (selectedOptionIndex >= 0) {
          setInput(options[selectedOptionIndex].title);
          setShowOptions(false);
          setSelectedOptionIndex(-1);
        }
      }
    };
    // Function to handle click outside the input field
    const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void): void => {
        useEffect(() => {
          const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
              callback();
            }
          };
          // Add event listener for clicks outside the specified ref
          document.addEventListener("click", handleClick);
          return () => {
        // Remove event listener for clicks after component unmounts
            document.removeEventListener("click", handleClick);
          };
        }, [ref, callback]);
      };
    // Return the state variables and event handler as an array
    return [input, inputChangeHandler, handleKeyDown, setInput, showOptions, setShowOptions, selectedOptionIndex, setSelectedOptionIndex, useOutsideClick];
  };



