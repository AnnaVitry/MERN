import React, { Component } from 'react';
import sha1 from 'sha1';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    setInStorage,
    } from '../utils/storage';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            isAdmin: false,
            confirmPassword: '',
            token: '',
            logState: false
        }
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
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: sha1(this.state.password),
                isAdmin: this.state.isAdmin,
            };
            axios.post('http://localhost:4242/users/add', user)
             .then(response => {
                 if (response.data.token !== '') {
                    this.setState({token: response.data.token});
                    setInStorage('the_main_app', { token: response.data.token });
                    const action = { type: 'TOGGLE_LOGSTATE', value: {logState: this.state.logState, order: 'register'} };
                    this.props.dispatch(action);
                    this.setState({logState: true});
                    window.location = '/';
                } else {
                    alert('Account already exists');
                }
             });

             this.setState({
                 username: '',
                 email: '',
                 password: '',
                 isAdmin: false,
                confirmPassword: '',
            });
        } else {
            alert("the two passwords entered don't match");
        }
    }

    render() {
        return (
            <div>
                <h3>Register</h3>
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
                        <input type="password" required className="form-control" 
                        value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm password: </label>
                        <input type="password" required className="form-control" 
                        value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-warning"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(CreateUser)