import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import authReducer from '../reduce/auth/reducer';
import departementReducer from '../reduce/departement/reducer';
import jabatanReducer from '../reduce/jabatan/reducer';
import bagianReducer from '../reduce/bagian/reducer';
import karyawanReducer from '../reduce/karyawan/reducer';
import roleReducer from '../reduce/role/reducer';
import userReducer from '../reduce/user/reducer';
import setttingReducer from '../reduce/setting/reducer';
import absensiReducer from '../reduce/absensi/reducer';

import thunk from 'redux-thunk';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducers = combineReducers({
    auth: authReducer,
    departements: departementReducer,
    jabatans: jabatanReducer, 
    bagians: bagianReducer,
    karyawans: karyawanReducer,
    roles: roleReducer,
    users: userReducer,
    settings: setttingReducer,
    absensies: absensiReducer,
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store
