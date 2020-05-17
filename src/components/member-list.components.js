import React, { Component } from 'react';
import { Redirect } from 'react-router'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import toggleFollowed from '../Store/Reducers/followedReducer';
import {
    getFromStorage,
    setInStorage,
    } from '../utils/storage';

    class MemberList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current_user: '',
            members: [],
            token: '',
            followedMembers: [],
            otherMembers: [],
        };
    }

    componentDidMount = () => {
        this.onFollowedUpdate();
    }

    componentDidUpdate = () => {
        if(this.state.current_user !== '') {
            if(this.state.current_user._id !== getFromStorage('the_main_app').token) {
                this.onFollowedUpdate();
            }
        } 
    }

    onFollowedUpdate() {
        axios.get('http://localhost:4242/users/' + getFromStorage('the_main_app').token)
             .then(response => {
             this.setState({ current_user: response.data });
             axios.get('http://localhost:4242/users')
                  .then(response => {
                    this.setState({ members: response.data })
                    let otherMembers = this.state.members.filter(member => {
                        return this.state.current_user.followed.indexOf(member._id.toString()) === -1 && member._id !== this.state.current_user._id;
                    });
                    this.setState({otherMembers: otherMembers.sort((a,b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))});
                    let followedMembers = this.state.members.filter(member => {
                        return this.state.current_user.followed.indexOf(member._id.toString()) !== -1;
                    });
                    this.setState({followedMembers: followedMembers.sort((a,b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))});
                    })
                  .catch((err) => console.log(err));
            });
    }
        
    _toggleFollowed(id) {
        const action = { type: 'TOGGLE_FOLLOWED', value: {followed: this.props.followed, id: id} };
        this.props.dispatch(action);
        axios.post('http://localhost:4242/followed/'+ getFromStorage('the_main_app').token, this.props.followed)
             .then( response => {
                 setInStorage('the_main_appf', { followed: this.props.followed });
                 this.onFollowedUpdate();
              })
             .catch((err) => console.log(err));
    }

    _toggleProfile(id) {
        //window.location = '/' + id;
        this.props.history.push("/user/show/" + id);
    }

    followedMemberList = () => {
        console.log(this.state.followedMembers);
        return this.state.followedMembers.map(currentMember => {
            return (
                <tr>               
                    <td>{currentMember.username}</td>
                    <td>
                        <button onClick={() => this._toggleProfile(currentMember._id)} className="btn btn-warning"><i class="fas fa-eye"></i></button>
                        <button onClick={() => this._toggleFollowed(currentMember._id)} className="btn btn-danger"><i class="fas fa-minus"></i></button>
                    </td>
                </tr>
            )
        });
    }

    unfollowedMemberList = () => {

        return this.state.otherMembers.map(currentMember => {
            return (
                <tr>               
                    <td>{currentMember.username}</td>
                    <td>
                        <button onClick={() => this._toggleProfile(currentMember._id)} className="btn btn-warning"><i class="fas fa-eye"></i></button>
                        <button onClick={() => this._toggleFollowed(currentMember._id)} className="btn btn-primary"><i class="fas fa-plus"></i></button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div className="container col-5">
                <h3>Members list</h3>
                <table className="table table-light" >
                    <thead className="thead-light" >
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.followedMemberList()}
                        {this.unfollowedMemberList()}
                    </tbody>

                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        followed: state.followed
    }
}

export default connect(mapStateToProps)(MemberList)