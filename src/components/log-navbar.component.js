import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    setInStorage,
    getFromStorage,
    } from '../utils/storage';
import { throwStatement } from '@babel/types';
import toggleLogState from '../Store/Reducers/logStateReducer';
import loginUserComponent from './login-user.component';
//import { threadId } from 'worker_threads';

class LogNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            this.setState({token: obj.token});
        };
    }

    _toggleLogState() {
        const action = { type: 'TOGGLE_LOGSTATE', value: {logState: this.props.logState, order: 'logout'} };
        this.props.dispatch(action);
        this.setState({token: ''});
        setInStorage('the_main_app', { token: '' });
        setInStorage('the_main_appf', { followed: '' });
    }

    render() { 
        if (this.props.logState && this.state.token !== '' && this.props.order !== '') {
            return (
                <div>
                    <div className="row">
                        <li className="col-3 nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-feather-alt"></i></a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link to="/" className="dropdown-item"> <i class="fas fa-list-ul"></i> Posts</Link>
                            <Link to="/create" className="dropdown-item"><i class="fas fa-feather-alt"></i> Create Post </Link>
                            <Link to="/members" className="dropdown-item"><i class="fas fa-users"></i> Members </Link>
                            </div>
                        </li>
                        <li className="col-4 nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user"></i></a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link to="/user/edit/:id" className="dropdown-item"><i class="fas fa-user-edit"></i> Edit profile</Link>
                            <Link to="/logout/:id" className="dropdown-item" onClick={() => this._toggleLogState() }><i class="far fa-user"></i> Logout</Link>

                            </div>
                        </li>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <li className="col-3 nav-item">
                        <Link to="/user/add" className="nav-link"><i class="fas fa-user-plus"></i></Link>
                    </li>
                    <li className="col-4 nav-item">
                        <Link to="/login" className="nav-link"><i class="fas fa-sign-in-alt"></i></Link>
                    </li>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        logState: state.logState
    };
}
export default connect(mapStateToProps)(LogNavbar)