import React from 'react';

export default class ProgressBarTimer extends React.Component {
    state = {
        counter: 0,
        intervalId: null,
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    componentDidMount() {
        const intervalId = setInterval(this.timer, 500);
        this.setState({ intervalId: intervalId });
    }
    timer = () => {
        if (this.props.interval > this.state.counter) {
            this.setState({ counter: this.state.counter + 500 });
        } else {
            clearInterval(this.timer)
        }
    }
    render() {
        return (
            <ProgressBar percentage={(this.state.counter / this.props.interval).toFixed(2) * 100} />
        )
    }
}

export const ProgressBar = (props) => (
    <div className="progress-bar">
        <Filler percentage={props.percentage} />
    </div>
)

const Filler = (props) => (
    <div className="filler" style={{ width: `${props.percentage}%` }} />
)