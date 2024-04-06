
# Auto Complete Component

This project demonstrates a simple autocomplete component built using React TypeScript. Users can type in the input field to search for products, and the autocomplete feature suggests matching product titles as the user types.

## Project Structure

```js
autocomplete-component/
│
├── src/
│   ├── components/
│   │   ├── autoComplete.tsx         # Autocomplete 
|   |   ├── autoComplete.module.css  # CSS styles for the AutoComplete Component
│   │   └── useAutoCompleted.tsx     # Custom hook for autocomplete functionality
│   ├── App.tsx                      # Main App component
│   ├── App.css                      # CSS styles for the App component
|   |── useApp.tsx                   # Custom hook for app  functionality
│   └── ErrorBoundary.tsx            # ErrorBoundary component
├── index.tsx                        # Entry point of the application
└── README.md                        # Instructions for running the project

```

## Prerequisites
- Node.js and npm (or yarn) installed on your machine.

## Getting Started
1. Clone the repository:

```js
git clone https://github.com/BathlaNeffi/autoComplete.git
```
2. Navigate To the Project Directory 

```js
cd autoComplete
```
3. Install dependencies: 

```js
npm install
```
## Running the Project

To run the project locally, you can use the following npm scripts:

- **Development Mode:**  Starts the development server.

```js
npm start
```

- **Production Build:** Builds the app for production to the build folder.

```js
npm run build
```


## Usage

Once the development server is running, you can access the autocomplete component in your browser at http://localhost:3000/. Try typing in the input field to see the autocomplete feature in action.

## Conclusion

This README provides a basic overview of the project and instructions for running it locally. For more details on the code implementation, please refer to the source files in the src directory.
