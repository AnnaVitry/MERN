import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import moment from 'moment';
import {
    getFromStorage,
    } from '../utils/storage';

const Post = (props) => {
    return (
        <tr>
            <td>{props.post.content}</td>
        </tr>
    )
}

const UserLink = (props) => {
    return (
        <li><Link to={"/user/show/" + props.id} className="nav-link">{ props.name }</Link></li>
    )
}

class ShowUser extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userId: '',
            user: null,
            posts: [],
            followed: [],
        };
    }

    componentDidMount = () => {
        if (this.state.userId !== this.props.match.params.id) {
            this.setState({userId: this.props.match.params.id});
            this.onUserIdChange(this.state.userId);
        }
    }

    componentDidUpdate = () => {
        if (this.state.userId !== this.props.match.params.id) {
            this.setState({userId: this.props.match.params.id});
            this.onUserIdChange(this.state.userId);
        }
    }

    onUserIdChange = (id) => {
        axios.get('http://localhost:4242/users/' + this.props.match.params.id)
                 .then(response => {
                    this.setState({ user: response.data });
                    let objIdArray = this.state.user.followed.map( (id) => {
                        return ObjectId(id);
                    });
                    axios.post('http://localhost:4242/users/following/' + this.props.match.params.id, {followed: objIdArray})
                         .then(response => {
                            this.setState({ followed: response.data });
                         })
                         .catch((err) => console.log(err));
                 })
                 .catch((err) => console.log(err));
            axios.get('http://localhost:4242/posts/writer/' + this.props.match.params.id)
                 .then(response => {
                    this.setState({ posts: response.data });
                 })
                 .catch((err) => console.log(err));
            
    }

    postList = () => {
        return this.state.posts.map(currentPost => {
            return <Post post={currentPost} key={currentPost._id} />
        });
    }

    followedList = () => {
        return this.state.followed.map(followedUser => {
            return <UserLink name={followedUser.username} id={followedUser._id} key={followedUser._id} />
        });
    }



    followerList = () => {
        console.log(this.state.followers);
        return this.state.followers.map(followerUser => {
            return <UserLink name={followerUser.username} key={followerUser._id} />
        });
    }

    render() {
        if (this.state.user !== null) {
        return (
            <div>
                <div className="row justify-content-center">
                <h1><i class="fas fa-poo"></i> { this.state.user.username }</h1></div>
                <div className="card">
                        <div className="card-header">
                        <h3>Informations</h3>
                        </div>
                        <div className="card-body">
                            {/* <h5 class="card-title">{props.post.title}</h5> */}
                            <div>
                                <div>
                                    <p className="card-text"><strong><i class="far fa-envelope"></i> :</strong> { this.state.user.email }</p>
                                    <p><strong><i class="far fa-clock"></i> :</strong> { moment(this.state.user.createdAt).format('DD-MM-YYYY') }</p>
                                    <p><strong><i class="fas fa-glasses"></i> :</strong> <ul>{ this.followedList() }</ul></p>
                                </div>
                            </div>
                        </div>
                    </div>
                <p></p>
                
                <table className="table table-light" >
                    <thead className="thead-light" >
                        <tr>
                            <th><h3>Old Posts</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.postList() }
                    </tbody>

                </table>
            </div>
        )
        } 
        else {
            return <p>No result found</p>;
        }
    }
}

export default ShowUser