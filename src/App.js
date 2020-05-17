import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


import Navbar from "./components/navbar.component";
import PostsList from "./components/posts-list.component";
import EditPost from "./components/edit-post.component";
import CreatePost from "./components/create-post.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import LoginUser from './components/login-user.component';
import LogoutUser from './components/logout-user.component';
import MemberList from './components/member-list.components';
import ShowUser from './components/show-user.component';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar/>
        <div className="container">
          <br/>
          <Route path='/' exact component={PostsList} />
          <Route path='/edit/:id' component={EditPost} />
          <Route path='/create' component={CreatePost} />
          <Route path='/user/add' component={CreateUser} />
          <Route path='/user/edit/:id' component={EditUser} />
          <Route path='/login' component={LoginUser} />
          <Route path='/logout/:id' component={LogoutUser} />
          <Route path='/members' component={MemberList} />
          <Route path='/user/show/:id' component={ShowUser} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
