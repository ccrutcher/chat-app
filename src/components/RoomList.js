import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoom: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', (snapshot) => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
    this.roomsRef.on('child_removed', (snapshot) => {
      this.setState({
        rooms: this.state.rooms.filter((room) => room.key !== snapshot.key),
      });
    });
  }

  deleteRoom(activeRoom) {
    this.roomsRef.child(activeRoom.key).remove();
    this.props.setActiveRoom(null);
  }

  createRoom(e) {
    if (this.state.newRoom !== '') {
      e.preventDefault();
      this.setState({ newRoom: '' });
      this.roomsRef.push({
        name: this.state.newRoom,
      });
    } else {
      alert('please enter a valid room name');
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newRoom: e.target.value });
  }

  render() {
    return (
      <div className='room-container'>
        <div className='current-room'>
          Current Room:{' '}
          {this.props.activeRoom ? this.props.activeRoom.name : 'Select a Room'}
        </div>
        <div className='room-list'>
          {this.state.rooms.map((room) => (
            <div className='individual-rooms' key={room.key}>
              <button
                className='room'
                id={room.name}
                onClick={() => this.props.setActiveRoom(room)}
              >
                {room.name}
              </button>
            </div>
          ))}
        </div>
        <div className='create-room'>
          <form onSubmit={(e) => this.createRoom(e)}>
            <input
              className='create-room-input'
              type='text'
              value={this.state.newRoom}
              placeholder='New Room Name'
              onChange={this.handleChange.bind(this)}
            />
            <button id='create-btn' className='create-room-btn' type='submit'>
              Create
            </button>
          </form>
        </div>
        <div className='delete-wrapper'>
          <div className='delete-room'>
            {this.props.user !== null ? (
              <button
                id='delete-btn'
                type='submit'
                onClick={() => this.deleteRoom(this.props.activeRoom)}
              >
                Delete Current Room
              </button>
            ) : (
              <div className='no-delete' />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RoomList;
