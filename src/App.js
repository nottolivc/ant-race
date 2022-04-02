import React, { useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ANT_INIT, ANT_IN_PROGRESS, ANT_CALCULATED } from './reducers/ants';
import { UI_IN_PROGRESS, UI_CALCULATED } from './reducers/ui';
import ProgressBarTimer, { ProgressBar } from './components/ProgressBar';
import seedData from './api/data.json';
import { generateAntWinLikelihoodCalculator } from './utils/algorithm';
//import Ant from './components/Ant';

const App = (props) => {
    
    const [data, setData] = useState(seedData);
    
    const loadData = () => {
      setData(seedData);
      console.log(data);
    };

    const startRace = () => {
      const { uiInProgress, inProgress, uiCompleted, completed } = props;
      uiInProgress();
      const results = data.ants.map((e) => {
        return new Promise((resolve) => {
          const getAnts = generateAntWinLikelihoodCalculator(e.name, inProgress)
          getAnts((id, likelihoodOfAntWinning) => resolve({ id, likelihoodOfAntWinning }))
      })
      .then(({ id, likelihoodOfAntWinning }) => completed(id, likelihoodOfAntWinning))
      });
      Promise.all(results).then(() => uiCompleted());
    }
    const { ants, ui } = props;
    let values = ants ? Object.values(ants) : [];

    return (
      <>
      <div>
      <br />
      <button onClick={loadData}>Load Data</button>
      <br />
      <br />
      <button onClick={startRace}>Start Race</button>
      {(() => {
        values.sort((a, b) => a.likelihoodOfAntWinning - b.likelihoodOfAntWinning);
        //console.table(values);
        switch (ui.state) {
          case UI_CALCULATED:
            return (
            <div>
              <h2>Race Done:</h2>
              <h4>Winner: <p>{values[values.length-1].name}</p></h4>
            </div>);
          case UI_IN_PROGRESS:
            //console.log(ants, data);
            return (<div>
              <h4>Race in Progress </h4>
              <h4>Ants Completed: </h4>
              { ui.antsCompleted }
              <h4>Ants In Progress: </h4>
              { ui.antsInProgress }
              {data ? data.ants.map((ant, id) => (
                <ul>
                <li key={id} className="card">
                  <p> {ant.name} </p>
                  <p> {ant.weight} </p>
                  <p> {ant.color} </p> 
                  <p> {ant.length} </p>
                </li>
                </ul>
              )) : 'load data...'}
              <ProgressBar percentage={ui.antsCompleted / values.length * 100} />
            </div>);
          default:
            return (
              <div>
              <h1>Click to Load Ants and Start the Race</h1>
              </div>);
        }})()}
        <ul>
          {values ? values.map((ant, id) => (
            <li key={id} className="card">
            <ul>
              <h4>Stats: {Object.values(ant)}</h4>
              {ant.likelihoodOfAntWinning && 
              <div>Probability of Ant Winning: {ant.likelihoodOfAntWinning.toFixed(2) * 100 } %</div>}  
            </ul>
              {ant.state === ANT_IN_PROGRESS && <ProgressBarTimer interval={ant.delay} /> }
            </li>
          )) : null}
        </ul>
      </div>
      {/* <Ant /> */}
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