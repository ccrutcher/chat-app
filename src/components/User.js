import React, { Component } from 'react';

class User extends Component {
  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      this.props.setUser(user);
    });
  }

  render() {
    return (
      <div className='sign-in-container'>
        <div className=''>
          <p>
            Signed in as:{' '}
            {this.props.user ? this.props.user.displayName : 'Guest'}
          </p>
        </div>
        <div className=''>
          <button onClick={() => this.signIn()}>Sign in!</button>
          <button onClick={() => this.signOut()}>Sign out!</button>
        </div>
      </div>
    );
  }
}

export default User;
