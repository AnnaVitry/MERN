import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            user_id: '',
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:4242/posts/' + this.props.match.params.id)
             .then(response => {
                 this.setState({ 
                     title: response.data.title,
                     content: response.data.content,
                     user_id: response.data.user_id
                 });
             })
             .catch((err) => {
                 console.log(err);
             })
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
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

        const post = {
            title: this.state.title,
            content: this.state.content,
            user_id: this.state.user_id
        }
        axios.post('http://localhost:4242/posts/update/' + this.props.match.params.id, post)
             .then(response => console.log(response.data));
             
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" required className="form-control" 
                        value={this.state.title} onChange={this.onChangeTitle}/>
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea required className="form-control" 
                        onChange={this.onChangeContent} value={this.state.content} ></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Post" className="btn btn-warning"/>
                    </div>
                </form>
            </div>
        )
    }
}