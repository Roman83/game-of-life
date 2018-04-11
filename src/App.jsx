import React, { Component } from 'react';
import Cell from './Cell';

const width = 80;
const height = 50;
const density = 0.3;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;

    const curData = [];
    for (let i = 0; i < height; i++) {
      curData.push([]);
      for (let j = 0; j < width; j++) {
        if (Math.random() > density) {
          curData[i].push(0);
        } else {
          curData[i].push(1);
        }
      }
    }
    this.state = {
      data: curData,
      counter: 0,
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.clear = this.clear.bind(this);
    this.random = this.random.bind(this);
  }

  componentDidMount() {
    if (!this.timer) {
      this.start();
    }
  }

  setItem(i, j) {
    const tmp = this.state.data;
    tmp[i][j] = !tmp[i][j];
    this.setState(tmp);
  }

  step() {
    let cells = this.state.data;
    const isAlive = (x, y) => (cells[x] || [])[y] || 0;
    cells = cells.map((a, i) => a.map((v, j) => {
      const sum = isAlive(i - 1, j - 1) + isAlive(i - 1, j) + isAlive(i - 1, j + 1) +
            isAlive(i, j - 1) + isAlive(i, j + 1) +
            isAlive(i + 1, j - 1) + isAlive(i + 1, j) + isAlive(i + 1, j + 1);
      if ((sum === 3) || (v && (sum === 2))) {
        return 1;
      }
      return 0;
    }));

    this.setState({
      data: cells,
      counter: this.state.counter + 1,
    });
  }

  start() {
    this.timer = window.setInterval(this.step.bind(this), 1000);
  }

  pause() {
    clearInterval(this.timer);
  }

  clear() {
    this.setState({
      data: this.state.data.map(r => r.map(() => 0)),
      counter: 0,
    });
  }

  random() {
    const cells = this.state.data.map(r => r.map(() => +(Math.random() < density)));
    this.setState({
      data: cells,
      counter: 0,
    });
  }

  render() {
    const buildRow = (r, i) => {
      const row = r.map((v, j) =>
        <Cell alive={!!v} click={this.setItem.bind(this, i, j)} />);
      return <div className="row">{row}</div>;
    };
    const board = this.state.data.map(buildRow);

    return (
      <div>
        <h1>Game of Life</h1>
        <button onClick={this.start}>Start</button>
        <button onClick={this.pause}>Pause</button>
        <button onClick={this.clear}>Clear</button>
        <button onClick={this.random}>Random</button>
        <span className="generation">
          generation: <span className="gen_value">{this.state.counter}</span>
        </span>
        <div className="board">
          {board}
        </div>
      </div>
    );
  }
}
