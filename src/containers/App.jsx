import React, { Component } from 'react';

import io from 'socket.io-client';

import { MuiThemeProvider } from 'material-ui/styles';
import { Divider, TextField, RaisedButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const markCompleteStyle = {
  textDecoration: 'line-through'
};

const todosData = [
  { id: 0, title: 'test1', completed: false },
  { id: 1, title: 'test2', completed: false },
  { id: 2, title: 'test3', completed: false },
  { id: 3, title: 'test4', completed: false },
  { id: 4, title: 'test5', completed: false },
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    todos: []
  };

  componentWillMount = () => {
    this.setState({ todos: todosData });
  }
  componentDidMount = () => {
    this.socket = io('/');
  }
  componentWillUnmount = () => {
    // console.log('Disconnecting Socket as component will unmount');
    // alert('Disconnecting Socket as component will unmount');
    this.socket.disconnect();
  }

  handleTextFieldChange = (event) => {
    console.log(event.target.value);
  }
  handleTextFieldKeyUp = (event) => {
    const value = event.target.value;
    if(event.keyCode === 13){
      // console.log(value);
      if(value){
        const newTodoId = this.state.todos[this.state.todos.length-1].id + 1; 
        const todo = { id: newTodoId, title: value, completed: false };
        this.setState({ todos: [...this.state.todos, todo] });
        event.target.value = '';    
      }else{
        alert('Item should not be blank!');
      }
    }
  }

  handleListItemClick = (id) => {
    console.log(id);
    const { todos } = this.state;
    const todo = todos.find( (todo) => {
      return todo.id === id ;
    });
    if(todo != null){
      const index = todos.indexOf(todo);
      todo.completed = !todo.completed;
      if(index !== -1){
        todos[index] = todo;
        this.setState({ todos });
      }else{
        console.log('cant find the index of the todo');
      }
      console.log(...this.state.todos);
    }
  }

  render() {
    const { todos } = this.state;
    const listItems = todos.map((todo, index) => {
      return (
        <ListItem 
          key = { todo.id } 
          primaryText = { todo.title }
          style = { todo.completed ? markCompleteStyle : {} }
          onClick = { this.handleListItemClick.bind(this, todo.id) }
        >
        </ListItem>
      );
    });
    return (
      <MuiThemeProvider>
        <div>
          <h1>medium-realtime-todo</h1>
          <Divider />
          <TextField 
            hintText = "Add New Item"
            floatingLabelText = "Enter the new item"
            ref = "newTodo" 
            onChange = {this.handleTextFieldChange}
            onKeyUp = {this.handleTextFieldKeyUp}
          />
          <List>
            {listItems}
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
