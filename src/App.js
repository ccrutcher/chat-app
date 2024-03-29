import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

var config = {
  apiKey: 'AIzaSyDn811S9uqqCqmt7nPF2c2OR0s-W-X1eGY',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: 'https://chat-app-6d56e.firebaseio.com/',
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      user: '',
      roomToDelete: '',
    };
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className='App-container'>
        <div className='left-container'>
          <div className='user-component'>
            <User
              firebase={firebase}
              user={this.state.user}
              setUser={this.setUser.bind(this)}
            />
          </div>

          <div className='room-component'>
            <RoomList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              setActiveRoom={this.setActiveRoom.bind(this)}
            />
          </div>
        </div>
        <div className='message-component'>
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            user={this.state.user}
          />
        </div>
      </div>
    );
  }
}

export default App;
