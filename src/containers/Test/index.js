import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleKey = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 66) {
      this.setState({showBaseline: !this.state.showBaseline});
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
    setTimeout(() => {
      this.addMessage();
    }, 468);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  render() {
    return (
      <div className={css(this.state.showBaseline && styles.baseline)}>
      </div>
    );
  }
}


const styles = StyleSheet.create({
  baseline: {
    ':after': {
      position: 'absolute',
      content: '" "',
      width: '100%',
      height: '100%',
      backgroundImage: 'url("grid.png")',
      top: 0,
      left: 0
    }
  }
});

export default Test;
