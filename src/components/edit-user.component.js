import React, { Component } from 'react';
import sha1 from 'sha1';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    setInStorage,
    getFromStorage,
    } from '../utils/storage';

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            isAdmin: false,
            confirmPassword: '',
            token: '',
            logState: false,
            previousPassword: ''
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:4242/users/' + getFromStorage('the_main_app').token)
             .then(response => {
                 console.log(response.data);
                 this.setState({ 
                     username: response.data.username,
                     email: response.data.email,
                     previousPassword: response.data.password
                 });
             })
             .catch((err) => {
                 console.log(err);
             })
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onChangeIsAdmin = (event) => {
        this.setState({
            isAdmin: event.target.value
        })
    }

    onChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }
    
    onSubmit = (event) => {

        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            if (this.state.password === '') {
                this.setState({password: this.state.previousPassword});
            }
                const user = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                }
                axios.post('http://localhost:4242/users/update/' + getFromStorage('the_main_app').token, user)
                     .then(response => console.log(response.data));
            
            window.location = '/';
        } else {
            alert("the two passwords entered don't match");
        }
    }

    render() {
        return (
            <div>
                <h3>Edit</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="form-control" 
                        value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" required className="form-control" 
                        value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" 
                        value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm password: </label>
                        <input type="password" className="form-control" 
                        value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-warning"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(EditUser)