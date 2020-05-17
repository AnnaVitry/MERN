import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    getFromStorage,
    } from '../utils/storage';
class PostsList extends Component {

    signal = axios.CancelToken.source();

    constructor(props) {
        super(props);
        
        this.state = {
            posts: [],
            token: ''
        };
    }

    componentDidMount = () => {
        if (JSON.parse(localStorage.getItem('the_main_app')) !== null && JSON.parse(localStorage.getItem('the_main_appf')) !== null) {
            axios.post('http://localhost:4242/posts/' + getFromStorage('the_main_app').token, getFromStorage('the_main_appf').followed)
                 .then(response => {
                    this.setState({ posts: response.data });
                    setInterval(this.flowRefresh, 3000);
                 })
                 .catch((err) => console.log(err));
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.flowRefresh);
        this.signal.cancel('Api is being canceled');
     }

     flowRefresh = () => {
        axios.post('http://localhost:4242/posts/' + getFromStorage('the_main_app').token, getFromStorage('the_main_appf').followed, { cancelToken: this.signal.token })
                 .then(response => {
                    this.setState({ posts: response.data });
                 })
                 .catch((err) => console.log(err));
     }

    deletePost = (id) => {
        axios.delete('http://localhost:4242/posts/' + id)
             .then(response => console.log(response.data));

        this.setState({
            posts: this.state.posts.filter(elt => elt._id !== id)
        });
    }

    postList = () => {
        let Post = (props) => {
            let currentToken = getFromStorage('the_main_app').token;
            if (props.post.user_id === currentToken) {
                return (
                    <div className="card" id="marge">
                        <div className="card-header text-white bg-dark ">
                        <i class="fas fa-poo"></i> <strong>{props.post.user_name}</strong>
                        </div>
                        <div className="card-body">
                            {/* <h5 class="card-title">{props.post.title}</h5> */}
                            <div className="row justify-content-end">
                                <div className="col-10"><p className="card-text">{props.post.content}</p></div>
                                <div className="col-2">
                                    <div className="dropdown">
                                        <a className="btn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-cog"></i></a>

                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <Link to={"/edit/" + props.post._id} className="dropdown-item"><i class="far fa-edit"></i> Edit</Link>
                                            <a href="#" onClick={() => props.deletePost(props.post._id)} className="dropdown-item" ><i class="far fa-trash-alt"></i> Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="card" id="marge">
                        <div className="card-header text-white bg-dark">
                        <i class="fas fa-poo"></i> <strong>{props.post.user_name}</strong>
                        </div>
                        <div className="card-body">
                            {/* <h5 className="card-title">{props.post.title}</h5> */}
                            <p className="card-text">{props.post.content}</p>
                        </div>
                    </div>
                    )
            }
        }
        return this.state.posts.map(currentPost => {
            return <Post post={currentPost} deletePost={this.deletePost} key={currentPost._id} />
        });
    }


    render() {
        if (getFromStorage('the_main_app').token !== '') {
            return (
                <div>
                    <div className="container col-8">
                    { this.postList() }
                    </div>

                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <img src='./rainbow-poop-emoji-sticker-1540920725.7286046.png'/>
                    </div>
                    <div className="row justify-content-center">
                        <h1>Welcome to Vie De MERN !</h1>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        logState: state.logState,
        followed: state.followed.followed
    };
}
export default connect( mapStateToProps)(PostsList)