## Questions

1. What is the difference between Component and Pure Component? Give an example where it might break my app.

**Answer:** 
### Component
- A Component in React is a class based component that extends the React.Component class, these have access to lifecycle methods and can mange there state. These will re-render everytime when its parent component or  when its props or state changes.
- These should be used when performing side effects and the output of this component depends on external factors like network request, intraction with DOM.
- These should be used when using deep data structure props such as nested Array or Objects and the changes will be reflected on any level within that structure.
- when we can implement custom logics inside function shouldComponentUpdate()
- These components, specifically functional component can use hooks for state and lifecycle manangement.

### Pure Component
- A Pure Component in React is a class based component that extends the React.PureComponent class just like regualar component these also have access to lifecycle methods and can manage there state, but in pure component implements shouldCompoenetUpdate lifecycle method in such a way that performs shallow coparision between current props and state with the next props and state if there is no chnages found pure compoent will skip the re-render which optimises performance by eliminating unnecessary renders
- These must be implemented when there the output of the component solely depends on props and state and ther is no side effect happening 
- These must be implemented when pros recived have immutable data structure and changes will only reflect on Top level.

The code will break for Pure component when for exaple we have a state 

```js
state={
    data:{
        account:"credit",
        amount:1000
    }
}
```
and if we the age changes and the state is set something like below:

```js
const newData = { ...this.state.data, amount:2000 };
this.setState({ data: newData });
```
Pure Component which performs a shallow comparison of its props. and incorrectly assumes that the props have not changes and it will not reflect the change and  breaking the App functionality



2. Context + ShouldComponentUpdate might be dangerous. Why is that?

**Answer:** 

- When a Component conusmes context using either <context.Consumer> API or  the useContext hook it suscribes to update from context. if the context values changes and the refernce  remains the same shouldComponentUpdate will return false and the component will not render leading to breakdown of the App functionality
- Misusage of shouldComponentUpdate can create performance implications such as when a component relying on context does not update due to incorrect implementation of shouldCompoentUpdate can lead to inconsistency in UI, also vice-versa if component re-renders continously due to incorrect logic in shouldComponentUpdate it will degrade performamce due to unnecessary render and will make app not responding.


3. Describe 3 ways to pass *information* from a component to its PARENT.

**Answer:** 
- By using CallBack Functions
    - the call back function can be passed to the child component from parent as a props.
    - the child compoent can call this callback function with the desired arguments
- By using Context API
    - A parent component can provide a context using React.createContext, and child components can access this context using useContext or Context.Consumer.
    - Child component can update the values in context directly and any component even parent component suscribed to this context can get the updated value
- By using React Hook
    - Parent component can sent the setState function to the child coponent through props where the child component can directly change state of the parent component

4. Give 2 ways to prevent components from re-rendering.

**Answer**

1. By using shouldComponentUpdate in class based component- here if we return false from shouldComponentUpdate then re-render will not happen.
2. By using React.memo() for functional Components This will prevent from re-render if the props passed to it does not change. This helps in optimization for eg.

```js
const myComponent=React.memo(({data}))=>{
    return <>{data}</>
}
```

5. What is a fragment and why do we need it? Give an example where it might break my app.

**Answer**

- React Fragmnets are syntax that allows us to add  multiple element  to a React Component with adding and extra DOM node

below is The example where this might break my app

```js
const myComponent = () => {
    return (
        <React.Fragment className="container">
            <h1>Hello</h1>
            <p>This is a paragraph.</p>
        </React.Fragment>
        <React.Fragment className="sidebar">
            <h2>Sidebar</h2>
            <p>Some sidebar content.</p>
        </React.Fragment>
    );
};
```
This kind of code will give error because we can not have the React Fragment themself can not have multiple sibling element

6. Give 3 examples of the HOC pattern.

**Answer**

HOC: High Order Component is a function that take a component and return a new Component

```js
const enhancedComponent=highOrderComponent(wrappedComponent)
```
- WithPropsValidation HOC:
    - HOC validates the props passed to the wrappedComponent if props pass the  predefined set of rules or schema  then the component is rendered else it will either show warning or thow error
- withLoading HOC:
    - HOC will add a loading spinner to a component while fetching data from external API or any other asynchronous operations, once the loading state becomes false the component is rendered.
- withAuthentication HOC:
    - HOC add authenticon functionality which checks if the user is authinticated if yes then page will render else either we can customise it to send login prompt or redirect to login page.

7. What's the difference in handling exceptions in promises, callbacks and async...await?

**Answer:**

- Promise:
Promise use .then() and .catch() methods to handel exceptions
eg:

```js
promise.then(
  (result) => { 
     console.log(result);
  },
  (error) => { 
     console.log(error);
  }
);
// if used with .catch method

promise.catch(
    (err)=>{
        console.log(err)
    }
)

```
- Callback: In call back the errors are passed in the first argument we need to check if the error passed is truth or not for eg:

```js
function(err,result)=>{
    if(err){
        console.log('Error Occured',err)
    }else{
        // handle success result
    }
}
```

- Async..Await: In Async await is surrounded with try{}catch(err){} blocks to handle exception in asyronous call, this is the most adapted methods because it makes the code more readable and errors can be caught at the nearest try..catch block unlike promises where error propogates down the chain until caught by .catch() handler.
eg:

```js
async function xyz(
    try{
        const res=await fetch(`${url}`)
        // await will pause the execution and wait till the promise if resolved or rejected.
    }catch(err){
        // handle Exceptions here
        console.log(err)
    }
)
```


8. How many arguments does setState take and why is it async.

**Answer:**

setState takes at max 2 argumenst

    1. Partial state update:  this can be object containing the changes we want to make in state
    2. Callback Function(optional): This will be executed only after the state is updated and component has been re-rendered
```js
this.setState({age:this.state.age + 1}, ()=>{
    console.log("The State is Updated")
});
```

This is Async because setState alters the state and cause the  rerendering. This can be expensive operation when called with syncronously might leave the UI unresponive as JS is single threaded language.So these are async and batched for better UI performance.


9. List the steps needed to migrate a Class to Function Component.

**Answer:**

- Use Function rather than class
- Eliminate the Constructor
- remove the render() function and preserve it with return;
- Add const before all the methods
- Delete all the occurance of "this" in the component
- this.state should be converted to useSate hook if applicable
- instead of using this.setstate convert this to the useState settler function as defined.
- useEffect() have to be used instead of componentDidMount and also with componentDidUpdate.

10. List a few ways styles can be used with components.

**Answer**

There are 4 popular ways to style components
- CSS stylesheet: By importing the css style file in side the component and applting className or id for css selector styling
- Inline Styling: for eg:
```js
<h1 style={{backgroundColor: '#f0f0f0' , fontSize:'2.5rem'}}>Hello, World!</h1>
```
- Styles Component: for this we need to install npm pacakge 'styled-component'
- CSS Module: Here we create an  module.css file and import it inside the component This allow us to locally scope css classes.


11. How to render an HTML string coming from the server.

**Answer:**

To render HTML string coming from the server we must use 'DOMPurify' library along with useRef hook we can achive this  below is the example:

```js
const myComponent=({htmlString})=>{
    const divRef=useRef();

    useEffect(()=>{
        if(divRef.current){
            divRef.current.innerHTML=DOMPurify.sanatize(htmlString);
        }
    },[htmlString]);

    return <div ref={divRef}></div>
}
```

In Above example htmlString recived from server is sanatized using DOMPurify.sanatize() before sending it to th innerHTML of the div element. This will prevent XSS attacks.

