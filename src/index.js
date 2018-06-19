import React from 'react';
import ReactDOM from 'react-dom';

// main app
import App from './containers/App';
import Footer from './components/footer';
import Header from './components/header';
import Body from './components/body';

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Body />, document.getElementById('body'));
ReactDOM.render(<Footer />, document.getElementById('footer'));


