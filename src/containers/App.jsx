import React, { Component } from 'react';

import io from 'socket.io-client';

import { MuiThemeProvider } from 'material-ui/styles';
import { Divider, TextField, RaisedButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        this.socket = io('/');
    }
    onRaisedButtonTouchTap = () => {
        console.log('onRaisedButtonTouchTap');
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>medium-realtime-todo</h1>
                    <Divider />
                    <TextField 
                        hintText = "Add New Item"
                        floatingLabelText = "Enter the new item"
                        ref = "newTodo" 
                    />
                    <RaisedButton 
                        label = "Click to add！"
                        primary = { true }
                        onTouchTap = { this.onRaisedButtonTouchTap }
                    />
                    <List>
                        <ListItem primaryText = "test ListItem1"></ListItem>
                        <ListItem primaryText = "test ListItem2"></ListItem>
                        <ListItem primaryText = "test ListItem3"></ListItem>
                    </List>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
