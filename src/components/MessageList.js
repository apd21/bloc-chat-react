import React, { Component } from 'react';

export class MessageList extends Component {
constructor(props){
  super(props);
    this.state = {username: "", content: "", sentAt: "", roomId: "", messages: []}
    this.messagesRef = this.props.firebase.database().ref("messages");
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);

}

handleChange(e) {
    e.preventDefault();
    this.setState({
      username: "user",
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
}

createMessage(e) {
  e.preventDefault();
  this.messagesRef.push({
    username: this.props.user,
    content: this.state.content,
    sentAt: this.sentAt(),
    roomId: this.state.roomId
  });
  this.setState({ username: "", content: "", sentAt: "", roomId: ""});
}

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
  });
}



sentAt(){

 var d = new Date();
 var timestamp = d.getTime()

 var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
   yyyy = d.getFullYear(),
   mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
   dd = ('0' + d.getDate()).slice(-2),     // Add leading 0.
   hh = d.getHours(),
   h = hh,
   min = ('0' + d.getMinutes()).slice(-2),   // Add leading 0.
   ampm = 'AM',
   time;

 if (hh > 12) {
   h = hh - 12;
   ampm = 'PM';
 } else if (hh === 12) {
   h = 12;
   ampm = 'PM';
 } else if (hh == 0) {
   h = 12;
 }


 time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

 return time;

}



render() {



  const activeRoom = this.props.activeRoom;

  const messageBar = (
    <form onSubmit = {this.createMessage}>
      <input type = "text" value={this.state.content} placeholder = "Enter Message" onChange = {this.handleChange}/>
      <input type = "submit" value = "Send" />
    </form>
  );

  const messageList = (
    this.state.messages.filter((message)=>{
      return message.roomId == activeRoom;
    })
    .map((message) => {

        return <li key = {message.key}>{message.username}: {message.content}: {message.sentAt}</li>

    })
  );

  return(
    <div>
      <div>{messageBar}</div>
      <ul>{messageList}</ul>

    </div>
  );
}
}

export default MessageList
