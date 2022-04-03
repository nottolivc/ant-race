import React, { useState } from 'react';
import seedData from '../api/data.json';
import '../App.css';

const AntRacer = () => {

  const [ants, setAnts] = useState({});
  // eslint-disable-next-line
  const [updateAnts, setUpdateAnts] = useState({});

  const calculateOdds = (): void => {
    function updateAnts(chances:any, idx:any):void {
      const updateAnts = Object.assign({}, {ants});
      updateAnts.ants[idx].likelihoodOfAntWinning = chances;
      updateAnts.ants[idx].calculatingOdds = "Calculating...";
      setUpdateAnts(updateAnts);
    }

    function generateAntWinLikelihoodCalculator():void {
      var delay = 7000 + Math.random() * 7000;
      var likelihoodOfAntWinning = Math.random();
      return function(callback:any):void {
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

  const AntList = () => {
    return antBuilder();
  }

  const antBuilder = () => {
      let ant = Object.keys(ants).sort((a, b) => ants[a].likelihoodOfAntWinning - ants[b].likelihoodOfAntWinning).reverse().map((idx) => {
      let racerId = "racer" + idx;
      let odds = Math.round(ants[idx].likelihoodOfAntWinning * 100)+"%";
      return (
        <section className="card"> 
        <ul id="racers" className={racerId}>
          <li>Odds of winning: {ants[idx].calculatingOdds}{ants[idx].likelihoodOfAntWinning}</li>
          <li>{ants[idx].name} has a {odds} probability of winning</li>
          <li>Name: {ants[idx].name}</li>
          <li>Length: {ants[idx].length}</li>
          <li>Weight: {ants[idx].weight}</li>
        </ul>
        </section>
      );
    })
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
    <div>
      <button type="button" onClick={loadData}>Load Ant Data</button>
      <button type="button" onClick={calculateOdds}>Start Racing</button>
      <AntList />
    </div>
  );
};


export default AntRacer;