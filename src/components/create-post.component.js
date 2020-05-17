import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    getFromStorage,
    } from '../utils/storage';

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            user_id: ''
        }
    }

    componentDidMount() {
        if(!this.props.logState)  {
            window.location = '/';
        }
    }

    onChangeContent = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    onChangeUser_id = (event) => {
        this.setState({
            user_id: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.get('http://localhost:4242/users/' + getFromStorage('the_main_app').token)
             .then(response => {
                const post = {
                    content: this.state.content,
                    user_id: getFromStorage('the_main_app').token,
                    user_name: response.data.username
                }
                axios.post('http://localhost:4242/posts/add', post)
                    .then(response => {
                            console.log(response.data);
                            window.location = '/';
                        });
                        this.setState({
                            content: ''
                        });
             });
    }

    render() {
        return (
            <div>
                <h3>Create New Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea required className="form-control" 
                        onChange={this.onChangeContent}>{this.state.content}</textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-warning"/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logState: state.logState
    };
}

export default connect(mapStateToProps)(CreatePost)