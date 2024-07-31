import React from 'react';
import ReactDOM from 'react-dom/client';
import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import axios from 'axios';

function App() {

  const[test, setTest] = React.useState('')
  const[comment, setComment] = React.useState('')


  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/register', {test: test, comment: comment}).then((data) => {
      console.log(data)
      setTest('');
      setComment('');
    })
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Example />
          <form onSubmit={submitHandler}>
            <label htmlFor='test'>test</label> 
            <input id = 'test' type = 'text' value = {test} onChange = {(e) => setTest(e.target.value)}/>
            <label htmlFor='comment'>comment</label> 
            <input id = 'comment' type = 'text' value = {comment} onChange = {(e) => setComment(e.target.value)}/>
            <div>
              <button type = 'button'>Cancel</button>
              <button type = 'submit'>Submit</button>
            </div>
          </form>
      </DndProvider>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
