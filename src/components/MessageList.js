import React, { Component } from 'react';
import moment from 'moment';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          username: '',
          content: '',
          sentAt: '',
        },
      ],

      newMessage: '',
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  createMessage(e) {
    e.preventDefault();

    this.messagesRef.push({
      content: this.state.newMessage,
      username: this.props.user ? this.props.user.displayName : 'Guest',
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({ newMessage: '' });
    setTimeout(function() {
      let objDiv = document.getElementById('messages-list');
      objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
    }, 5);
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  updateScroll() {
    let objDiv = document.getElementById('messages-list');
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
  }

  render() {
    let time = function(message) {
      let timeStamp;
      try {
        timeStamp = moment(message.sentAt).format('LTS');
      } catch (e) {
        timeStamp = 0;
      }
      return timeStamp;
    };
    if (this.props.activeRoom !== null && this.props.activeRoom.name) {
      return (
        <main>
          <div className='message-container'>
            <div className='current-room-name-wrapper'>
              <div className='current-room-name'>
                <h1>{this.props.activeRoom.name}</h1>
              </div>
            </div>
            <div className='messages-list-wrapper'>
              <div className='messages-list' id='messages-list'>
                {this.state.messages
                  .filter(
                    (message) => this.props.activeRoom.key === message.roomId
                  )
                  .map((message) => (
                    <div className='one' key={message.key}>
                      <div className='name-above'>
                        <div className='four'>{message.username}:</div>
                      </div>
                      <div className='content-below'>
                        <div className='two'>{message.content}</div>
                        <div className='three'>
                          <div className='five'>{time(message)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className='input-container'>
              <form className='create-message' onSubmit={this.createMessage}>
                <input
                  className='message-input'
                  type='text'
                  value={this.state.newMessage}
                  placeholder='Send a message!'
                  onChange={this.handleChange}
                />
                <input id='send-btn' type='submit' value='Send' />
              </form>
            </div>
          </div>
        </main>
      );
    } else {
      return (
        <main>
          <div className='welcome-message'>Welcome! Select a room to join!</div>
        </main>
      );
    }
  }
}

export default MessageList;
