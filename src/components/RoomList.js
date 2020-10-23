import React, {Component} from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ''
    };

  this.roomsRef = this.props.firebase.database().ref('rooms');
  this.handleChange = this.handleChange.bind(this);
  this.createRoom = this.createRoom.bind(this);
  }

  handleChange(e) {
    this.setState.newRoom = this.setState({newRoom: e.target.value});
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
  }

  createRoom(e) {
    e.preventDefault();
    console.log(this.state.newRoom)
    this.roomsRef.push({name: this.state.newRoom});
    this.setState({newRoom: ''});
  }

  setActiveRoom(room) {
    this.props.setActiveRoom(room);
  }

    render() {



      let result =
                    this.state.rooms.map((val)=>{

                        console.log(val.newRoom)
                        return <li key={val.key} onClick ={(e) => this.setActiveRoom(val, e)}>{val.name}</li>

                    })

        const roomForm = (
          <form onSubmit = {this.createRoom}>
             <input type = "text" value = {this.state.newRoom} placeholder = "Create New Room" onChange = {this.handleChange}/>
             <input type = "submit"/>
          </form>
    );


      return(
           <div>
                <div>{roomForm}</div>
                <ul>{result}</ul>

          </div>
        );

        }
      }

      export default RoomList;
