import React, { useState } from 'react';
import seedData from '../api/data';
import '../App.css';

const AntRacer = ({startRaceRedux}) => {
  
  const [ants, setAnts] = useState({});
  const [isActive, setActive] = useState(false);
  // eslint-disable-next-line
  const [updateAnts, setUpdateAnts] = useState({});
 
  const toggleClass = () => {
    setActive(!isActive);
  };

  const calculateOdds = () => {
    function updateAnts(chances, idx) {
      
      const updateAnts = Object.assign({}, {ants});
      updateAnts.ants[idx].likelihoodOfAntWinning = chances;
      updateAnts.ants[idx].calculatingOdds = "Calculating: ";
      setUpdateAnts(updateAnts);
    }

    function generateAntWinLikelihoodCalculator() {
      var delay = 7000 + Math.random() * 7000;
      var likelihoodOfAntWinning = Math.random();
      return function(callback) {
        setTimeout(function() {
          callback(likelihoodOfAntWinning);
        }, delay);
      };
    }
    // eslint-disable-next-line
    Object.keys(ants).map((idx) => {
      updateAnts('', idx);
      const callback = (likelihoodOfAntWinning) => {
        updateAnts(likelihoodOfAntWinning, idx);
      };
      generateAntWinLikelihoodCalculator()(callback);
    });
  }
  let done = false;
  let status = updateAnts.ants && done === false ? <p>Race Initiated</p> : done === true && <p>Stopped</p>;

  const AntList = () => {
    return antRaceBuilder();
  }

  const antRaceBuilder = () => {
      let ant = Object.keys(ants).sort((a, b) => ants[a].likelihoodOfAntWinning - ants[b].likelihoodOfAntWinning).reverse().map((idx) => {
      let racerId = "racer" + idx;
      let odds = Math.round(ants[idx].likelihoodOfAntWinning * 100)+"%";
      
      return (
      <main className={isActive ? 'move' : null}>
      <section key={Math.random()} className="card">
          <ul id="racers" key={idx} className={racerId}>
          <li>Odds of winning: {ants[idx].calculatingOdds}{ants[idx].likelihoodOfAntWinning}</li>
          <li>{ants[idx].name} has a {odds} probability of winning</li>
          <li>Name: {ants[idx].name}</li>
          <li>Length: {ants[idx].length}</li>
          <li>Weight: {ants[idx].weight}</li>
          </ul>
        </section>
        </main>
      );
    })
    done = true;

    return ant;
  }

  const loadData = () => {
    const ants = {};
    const fetchData = async () => {
      const result = seedData;
      result.ants.forEach((ant, idx) => {
        ants[idx] = ant;
        ants[idx].likelihoodOfAntWinning = "";
        ants[idx].calculatingOdds = "";
      });      
      setAnts(ants);
    };
    fetchData();
  };


  return ( 
    <>
    <button type="button" onClick={loadData}>Load Ants Data</button>
    <br />
    <br />
    <main>
      <div onClick={startRaceRedux}>
        <span onClick={toggleClass}>
        <button type="button" onClick={calculateOdds}>Start Racing</button>
        </span>
      </div>
      <h2>Highest Score Up Here Wins</h2>
        {status}
      <br />
      <AntList />
      <h2>Lowest</h2>
    </main>
    </>
  );
};


export default AntRacer;