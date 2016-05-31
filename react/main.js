'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    solver = require('../lib/solver');

var $ = React.createElement;

var board = React.createClass({
    displayName: 'board',
    getInitialState: function () {
        return {
            soft: this.props.soft,
            hard: this.props.hard
        };
    },
    handleClick: function (ox, oy) {
        console.log(ox, oy);
        var newHard = this.state.hard.slice();
        if (this.state.hard[oy] === ox) {
            newHard[oy] = null;
        } else {
            newHard[oy] = ox;
        }
        this.setState({ hard: newHard });
    },
    render: function () {
        var step = 45;
        var soft = this.state.soft;
        var hard = this.state.hard;
        var height = step * soft.length;
        var width = height;
        var wb = '#f0d9b5';
        var bb = '#b58863';
        return $(
            'svg', {
                viewBox: [width, height],
                width: width, height: height
            },
            soft.map(function (row, y) {
                var rowBody = Array(soft.length).fill().map(function (cell, x) {
                    return $(
                        'rect', {
                            onClick: this.handleClick.bind(this, x, y),
                            x: step * x, width: step, height: step,
                            style: { fill: ((x + y) % 2) ? wb : bb }
                        }
                    );
                }, this);
                if (hard[y] === null) {
                    rowBody.push($(
                        'rect', {
                            onClick: this.handleClick.bind(this, row, y),
                            style: { fill: '#777' },
                            x: step * row + 10, y: 10, width: 25, height: 25
                        }
                    ));
                } else {
                    rowBody.push($(
                        'rect', {
                            onClick: this.handleClick.bind(this, hard[y], y),
                            x: step * hard[y] + 10, y: 10, width: 25, height: 25
                        }
                    ));
                }
                return $(
                    'g', { transform: 'translate(0,' + (step * y) + ')' },
                    rowBody
                );
            }, this)
        );
    }
});

var hard = [5, null, null, 0, null, null, null, null];

ReactDOM.render(
    $(board, {
        soft: solver(hard),
        hard: hard
    }),
    document.getElementById('root')
);
