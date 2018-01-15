import {setFlash} from './flash'
import axios from 'axios'

export const addMessage = (message) => {
  return { type: 'ADD_MESSAGE', message }
}

export const fetchMessages = () => {
  return dispatch => {
    axios.get('/api/messages')
      .then( res => {
        const {headers, data: messages } = res;
        dispatch({type: 'SET_MESSAGES', messages, headers})
      })
      .catch( err => {
        dispatch(setFlash('Failed to get messages. Try again!', 'red'))
      })
  }
}
