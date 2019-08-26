// /client/App.js
import React, { Component } from 'react';
import "./App.css";
import axios from 'axios';

class App extends Component {
  // initialize our state
  state = {
    selectedId:-1,
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: -1,
    updateToApply: "",
    objectToUpdate: null,
  };

  

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('/api/putData', {
      id: idToBeAdded,
      message: message,
    }).then(()=>{
      this.getDataFromDb();
  });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    }).then(()=>{
        this.getDataFromDb();
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    }).then(()=>{
      this.setState({idToUpdate:-1});
      this.getDataFromDb();
  });
  };

  editData = (id, message) => {

    this.setState({ idToUpdate: id, updateToApply: message });
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>

        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px', margin: 5 }}
          />
          <button style={{ margin: 5 }} onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px', margin: 5 }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button style={{ margin: 5 }} onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>


        <div style={{ height: 60 }}>
         


        </div>

        <table className="fixed_header">
          <thead>
            <tr>
              <th>Id</th>
              <th>Message</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>{data.id + " : " + data._id}</td>
                <td>{ data.id==this.state.idToUpdate ? (<input className="edit-input"  focus="true" type="text" value={this.state.updateToApply}  onChange={(e) => this.setState({ updateToApply: e.target.value })}/> ): data.message}</td>
                <td>
                  <button style={{ margin: 5 }} onClick={() => this.deleteFromDB(data.id)}>Delete</button>
                  { data.id!=this.state.idToUpdate &&  <button style={{ margin: 5 }} onClick={() => { this.editData(data.id, data.message) }}>Edit</button>}
                  { data.id==this.state.idToUpdate &&  <button style={{ margin: 5 }}  onClick={() => {this.updateDB(this.state.idToUpdate, this.state.updateToApply)}}>Update</button>}
                 
                </td>

              </tr>

            ))}
          </tbody>

        </table>

<div className="vbox" style={{margin:10,width:400,height:300,border:"1px solid silver", alignItems:"center",justifyContent:"center"}}>
  <div alignSelf>abc</div>
</div>


      </div>
    );
  }
}

export default App;