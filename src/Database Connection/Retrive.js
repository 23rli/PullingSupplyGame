import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import register from '../ReduxStore/authSlice'
import axios from 'axios';

function register() {

  const[test, setTest] = React.useState('')
  const[comment, setComment] = React.useState('')
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/signup', {test: test, comment: comment}).then((data) => {
      console.log(data)
      setTest('');
      setComment('');
    })
  }

  return (
    <div>
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
    </div>
  )
}

export default register;