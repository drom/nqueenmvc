'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var nQueens = React.createClass({
    displayName: 'nQueens',
    render: function () {
        return React.createElement('div', null, this.props.size, ' Queens');
    }
});

ReactDOM.render(
    React.createElement(
        nQueens, { size: 8 }
    ),
    document.getElementById('root')
);
