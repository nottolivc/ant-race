import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ANT_INIT, ANT_IN_PROGRESS, ANT_CALCULATED } from './reducers/ants';
import { UI_IN_PROGRESS, UI_CALCULATED } from './reducers/ui';
import ProgressBarTimer, { ProgressBar } from './components/ProgressBar';
import seedData from './api/data.json';
import AntRacer from './components/AntRacer.js';
import Ant from './components/Ant';
import { generateAntWinLikelihoodCalculator } from './utils/algorithm';

const App = (props) => {     
    const { ants, ui } = props;
    let values = ants ? Object.values(ants) : [];
    
    const startRaceRedux = () => {
      const { uiInProgress, inProgress, uiCompleted, completed } = props;
      uiInProgress();
      const requests = seedData.ants.map((item) => {
        return new Promise((resolve) => {
          const generate = generateAntWinLikelihoodCalculator(item.name, inProgress)
          generate((id, likelihoodOfAntWinning) => resolve({ id, likelihoodOfAntWinning }))
        })
        .then(({ id, likelihoodOfAntWinning }) => completed(id, likelihoodOfAntWinning))
      });
      Promise.all(requests).then(() => uiCompleted())
    }

    return (
      <>
      <section>
      {(() => {
        values.sort((a, b) => a.likelihoodOfAntWinning - b.likelihoodOfAntWinning).reverse();
        switch (ui.state) {
          case UI_CALCULATED:
            return (
              <>
              <h2>Race Done. Start New Race?</h2>
              </>
              );
          case UI_IN_PROGRESS:
            //console.table(ants);
            return (
              <>
              <h4>Race in Progress...</h4>
              <p>Ants Completed: { ui.antsCompleted }</p>
              <p>Ants In Progress:  { ui.antsInProgress }</p>
              <ProgressBar percentage={ui.antsCompleted / values.length * 100} />
              <br />
              </>
              );
          default:
            return (
              <>
              <h1>Click to Load Ants and Start the Race</h1>
              </>
              );
        }})()}
        <ul>
        <AntRacer props={props} startRaceRedux={startRaceRedux} />
        <br />
        <h4>Top to Bottom Metrics</h4>
        {values ? values.map((ant, idx) => (
            <li key={idx} className="card">
              <h4>Delayed by: {ant.delay} seconds </h4>
              <h4>{Object.keys(idx)}</h4>
              {ant.likelihoodOfAntWinning && <div>Probability of Ant Winning: {ant.likelihoodOfAntWinning.toFixed(2) * 100 } %</div>}  
              {ant.state === ANT_IN_PROGRESS && <ProgressBarTimer interval={ant.delay} /> }
              </li>
          )) : 'Load Data...'}
        </ul>
      </section>
      <h5>Ant Carousel</h5>
       <Ant />
      <br />
      </>
    )
  }

const ReduxWrapper = connect(
  ({ ants, ui }) => ({ ants, ui }),
  (dispatch) => ({
    uiInProgress: () => dispatch({ type: UI_IN_PROGRESS }),
    uiCompleted: () => dispatch({ type: UI_CALCULATED }),
    initialize: (ants) => dispatch({ type: ANT_INIT, payload: ants }),
    inProgress: (id, delay) => dispatch({ type: ANT_IN_PROGRESS, payload: { id, delay } }),
    completed: (id, likelihoodOfAntWinning) => dispatch({ type: ANT_CALCULATED, payload: { id, likelihoodOfAntWinning }})
  })
)(App)

const Wrapper = (props) => (
  <div className="App">
  <header><h1>Ant Race</h1></header>     
  <ReduxWrapper data={seedData} />
  </div>
);

export default (Wrapper);