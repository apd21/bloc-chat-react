import React, { Component } from 'react';
import './App.css';
import { RoomList } from './components/RoomList';
import { MessageList } from './components/MessageList';
import { User } from './components/User';
import * as firebase from 'firebase';

var config = {
   apiKey: "AIzaSyCy7ub1WZaqgERGUaqtYBBnk5ZiVGaZe2U",
   authDomain: "apd-bloc-chat.firebaseapp.com",
   databaseURL: "https://apd-bloc-chat.firebaseio.com",
   projectId: "apd-bloc-chat",
   storageBucket: "apd-bloc-chat.appspot.com",
   messagingSenderId: "637820644336"
 };
 firebase.initializeApp(config);

 class App extends Component {
   constructor(props) {
     super (props);
     this.state = {activeRoom: "", user: "Guest"};
     this.setActiveRoom = this.setActiveRoom.bind(this);
     this.setUser = this.setUser.bind(this);
   }

  setActiveRoom(room) {
    this.setState({ activeRoom: room})
  }

  setUser(user) {
    console.log(user)
    if(user){
      this.setState({
        user:user.displayName
      })
    }else{
      this.setState({
        user:"Guest"
      })
    }

  }

  render() {
    const showMessages = this.state.setActiveRoom;

    return (
      <div>

        <h1>{this.state.activeRoom.name || "Select a room"}</h1>
        <RoomList firebase = {firebase} setActiveRoom = {this.setActiveRoom} />
        <User firebase = {firebase} setUser = {this.setUser} user = {this.state.user} />
        <MessageList firebase = {firebase} activeRoom = {this.state.activeRoom.key} user = {this.state.user} />

      </div>
    );
  }
}

export default App;
