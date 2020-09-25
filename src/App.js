import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDn811S9uqqCqmt7nPF2c2OR0s-W-X1eGY',
  authDomain: 'chat-app-6d56e.firebaseapp.com',
  databaseURL: 'https://chat-app-6d56e.firebaseio.com/',
  projectId: 'chat-app-6d56e',
  storageBucket: 'chat-app-6d56e.appspot.com',
  messagingSenderId: '775190416241',
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
