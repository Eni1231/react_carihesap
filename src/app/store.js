import {configureStore} from'@reduxjs/toolkit';
import companyReducer from '../slices/companySlice'
import currentCompanyReducer  from '../slices/currentAccountSlice';
export const store = configureStore({
    reducer:{
    company: companyReducer,
    currentAccount: currentCompanyReducer
    }
})