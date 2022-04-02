import { combineReducers } from 'redux';
import * as ants from './ants';
import * as ui from './ui';



export const rootReducer =
    combineReducers({
        ants: ants.reducer,
        ui: ui.reducer,
});                       