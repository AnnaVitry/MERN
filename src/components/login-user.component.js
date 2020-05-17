import React, { Component } from 'react';
import sha1 from 'sha1';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    setInStorage,
    getFromStorage,
    } from '../utils/storage';

class LoginUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logState: false,
            token: '',
        }
        setInStorage('the_main_app', { token: ''});
        setInStorage('the_main_appf', { followed: ''});
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: sha1(this.state.password),
        }
        axios.post('http://localhost:4242/users/login', user)
            .then(response => { 
                if (response.data.token !== '') {
                    setInStorage('the_main_app', { token: response.data.token });
                    const action = { type: 'TOGGLE_LOGSTATE', value: {logState: this.state.logState, order: 'login'} };
                    this.props.dispatch(action);
                    this.setState({logState: true});
                    axios.get('http://localhost:4242/users/' + response.data.token)
                         .then(response => {
                            setInStorage('the_main_appf', { followed: response.data.followed });
                            this.setState({ followed: response.data.followed });
                            const action = { type: 'TOGGLE_FOLLOWED', value: {followed: response.data.followed} };
                            this.props.dispatch(action);
                         });
                    window.location = '/';
                }
                else {
                    alert('bad credentials');
                }
            });
        this.setState({username: '', password: ''});
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="form-control" 
                        value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" required className="form-control" 
                        value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-warning" />
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        followed: state.followed.followed,
    };
}

export default connect(mapStateToProps)(LoginUser)