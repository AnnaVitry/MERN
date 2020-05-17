import React, { Component } from 'react';
import axios from 'axios';
import {
    getFromStorage,
    setInStorage,
    } from '../utils/storage';

export default class LogoutUser extends Component {

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {

            axios.delete('http://localhost:4242/users/logout/' + obj.token )
            .then(response => {
                setInStorage('the_main_app', { token: '' });
                window.location = '/';
            });
        };
    }

    render() {
         window.location = '/';
         return(<p></p>)
    }
}