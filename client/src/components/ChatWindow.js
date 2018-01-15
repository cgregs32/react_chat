import React from 'react'
import {connect} from 'react-redux'
import {setFlash} from '../actions/flash'
import {Segment, Header, Form, TextArea, Button} from 'semantic-ui-react'
import ChatMessage from './ChatMessage'
import {addMessage, fetchMessages} from '../actions/messages'
import axios from 'axios'
import '../styles/ChatWindow.css'

class ChatWindow extends React.Component{
  state = { newMessage: '', loaded: false }

  componentDidMount() {
    //todo scroll the user to the bottom of the div on mount
    //scroll user to bottom of the div on new message
    window.MessageBus.start();
    const { dispatch } = this.props
    dispatch(fetchMessages());
    dispatch(setFlash('Welcome To React Chat!', 'green'))

    window.MessageBus.subscribe('/chat_channel', (data) => {
      dispatch(addMessage(data))
    })
  }

  componentWillUnmount(){
    window.MessageBus.unsubscribe('/chat_channel')
  }

  handleChange = e => this.setState({ newMessage: e.target.value});

  addMessage = (e) => {
    e.preventDefault()
    const { dispatch, user: { email } } = this.props;

    axios.post('/api/messages', { message: { email, body: this.state.newMessage } })
      .then( res => {
        this.setState({ newMessage: '' });
        dispatch({ headers: res.headers})
      })
      .catch( err => {
        dispatch(setFlash('Error Chatting. Try Again!', 'red'))
      })

  }

  displayMessages = () => {
    const {messages} = this.props

    if(messages.length)
      return messages.map( (message, i) => {
        return( <ChatMessage key={i} message={message} /> );
      });
    else
      return(
        <Segment inverted textAlign='center'>
          <Header as='h1'>No Chat Messages. Start Chatting!</Header>
        </Segment>
      )
  }

  checkSubmit = e => {
    const { shiftKey, keyCode } = e
    if (shiftKey && keyCode === 13)
      this.refs.messageForm.handleSubmit(e);
  }

  render(){
    return(
      <Segment basic>
        <Header as ='h2' textAlign='center' className='underline'>React Chat!</Header>
        <div className='main-window'>
          { this.displayMessages() }
        </div>
        <div className='message-input'>
          <Form ref='messageForm' onSubmit={ this.addMessage}>
            <TextArea
              value={this.state.newMessage}
              onChange={this.handleChange}
              placeholder='Chat Message Here'
              autoFocus
              required
              onKeyUp={this.checkSubmit}
            />
          <Segment basic textAlign='center'>
            <Button type='submit' primary>Send Message</Button>
          </Segment>
          </Form>
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages
  }
}

export default connect(mapStateToProps)(ChatWindow);
