import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditPostPage from './components/EditPostPage';
import NewPostPage from './components/NewPostPage';
import PostPage from './components/PostPage';
import ListPage from './components/ListPage';
import PostProvider from './components/PostProvider';

import './App.css';

function App() {

  // console.log(process.env.REACT_APP_API_URL);

  return (
    <PostProvider>
      <Router>
        <Route path="/" exact component={ListPage} />
        <Route path="/posts/new" exact component={NewPostPage}/>
        <Route path="/posts/:id([0-9]+)" exact component={PostPage} />
        <Route path="/posts/:id([0-9]+)/edit" exact component={EditPostPage} />
      </Router>    
    </PostProvider>
  );
}

export default App;
