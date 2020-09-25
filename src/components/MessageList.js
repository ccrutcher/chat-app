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
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
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
          <div className='messages-list'>
            <h1>{this.props.activeRoom.name}</h1>
            {this.state.messages
              .filter((message) => this.props.activeRoom.key === message.roomId)
              .map((message) => (
                <div className='' key={message.key}>
                  <div className=''>{message.content}</div>
                  <div className=''>
                    <div className=''>{message.username}</div>
                    <div className=''>{time(message)}</div>
                  </div>
                </div>
              ))}
          </div>
          <form id='create-message' onSubmit={this.createMessage}>
            <input
              type='text'
              value={this.state.newMessage}
              placeholder='Send a message!'
              onChange={this.handleChange}
            />
            <input type='submit' value='Send' />
          </form>
        </main>
      );
    } else {
      return (
        <main>
          <div className=''>Welcome! Select a room to join!</div>
        </main>
      );
    }
  }
}

export default MessageList;
