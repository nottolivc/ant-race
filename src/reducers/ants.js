export const ANT_INIT = "@@ANT INIT";
export const ANT_NOT_RUN_YET = "@@ANT NOT_RUN_YET";
export const ANT_CALCULATED = "@@ANT CALCULATED";
export const ANT_IN_PROGRESS = "@@ANT IN_PROGRESS";


export const reducer = (store={}, {type, payload}) => {
    console.log(store, type, payload);
    switch (type) {
      case ANT_INIT: {
          const newState = payload.reduce((map, ant) => {
              ant.state = ANT_NOT_RUN_YET;
              map[ant.name] = ant; 
             return map; 
          },{})
          return Object.assign({}, store, newState);
      }
      case ANT_IN_PROGRESS: {
          const { id, delay } = payload;
          return Object.assign({}, store, {
              [id] : Object.assign({}, store[id], {state: ANT_IN_PROGRESS, delay})
          });
      }
      case ANT_CALCULATED:{
          const { id, likelihoodOfAntWinning} = payload;
            if(!(id in store)) {
              throw Error("NO ANT ID FOUND")
          }
          return Object.assign({}, store,{
              [id] : Object.assign({}, store[id], {state: ANT_CALCULATED, likelihoodOfAntWinning})
          }); 
      }
      default:
        return store;
    }
  }