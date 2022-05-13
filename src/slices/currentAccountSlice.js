import { createSlice,  } from "@reduxjs/toolkit";

const getInitialCurrentAccount = ()=>{
    const localCurrentAccountList= window.localStorage.getItem('currentAccountList');
    if(localCurrentAccountList){
        return JSON.parse(localCurrentAccountList);
    }
    window.localStorage.setItem('currentAccountList',JSON.stringify([]));
    return [];
}
const getCurrentCompanyAccountList = ()=>{
    const localCurrentCompanyAccountList= window.localStorage.getItem('currentCompanyAccountList');
    if(localCurrentCompanyAccountList){
        return JSON.parse(localCurrentCompanyAccountList);
    }
    window.localStorage.setItem('currentCompanyAccountList',JSON.stringify([]));
    return [];
}

const initialValue = {
    currentAccountList:getInitialCurrentAccount(),
    filteredCurrentAccountList: [],
    currentCompanyAccountList: getCurrentCompanyAccountList(),
};
export const  currentCompanySlice= createSlice({
name:'currentAccount',
initialState:initialValue,
reducers:{

    addCurrentAccount:(state,action)=>{
        
        state.currentAccountList.push(action.payload);
        const currentAccountList= window.localStorage.getItem('currentAccountList');
        
        if(currentAccountList){
            const currentAccountListArr = JSON.parse(currentAccountList);
            currentAccountListArr.push({
                ...action.payload
            })
      
            
            window.localStorage.setItem('currentAccountList', JSON.stringify(currentAccountListArr))
         
        }else{
            window.localStorage.setItem('currentAccountList', JSON.stringify([{...action.payload}]))
            window.localStorage.setItem('currentCompanyAccountList',JSON.stringify([{...action.payload}]))
        }
    },
    filterCurrentCompanyAccountList:(state,action)=>{
        const currentCompanyAccountList = window.localStorage.getItem('currentAccountList');
        
        if(currentCompanyAccountList){
            const currentCompanyAccountListArr = JSON.parse(currentCompanyAccountList);
            const filteredList = [];
            currentCompanyAccountListArr.forEach((currentAccount)=>{
                if(currentAccount.companyId === action.payload){
                    filteredList.push(currentAccount)
                    console.log("Bu liste"+filteredList);

                }
                window.localStorage.setItem('currentCompanyAccountList',JSON.stringify(filteredList))
                
            })
            state.currentCompanyAccountList = [...filteredList];
        }
    },
    deleteCurrentAccount:(state,action)=>{
        const currentAccountList = window.localStorage.getItem('currentAccountList');
        const currentCompanyAccountList= window.localStorage.getItem('currentCompanyAccountList');
        if(currentAccountList){
            const currentAccountListArr = JSON.parse(currentAccountList);
            const currentCompanyAccountListArr = JSON.parse(currentCompanyAccountList);
            currentAccountListArr.forEach((currentAccount,index)=>{
                if(currentAccount.id ===action.payload ){
                    currentAccountListArr.splice(index,1);
                    
                }
        currentCompanyAccountListArr.forEach((currentAccount,index)=>{
            if(currentAccount.id ===action.payload){
                currentCompanyAccountListArr.splice(index,1);
            }
        })
                
            })
            window.localStorage.setItem('currentAccountList', JSON.stringify(currentAccountListArr));
            window.localStorage.setItem('currentCompanyAccountList', JSON.stringify(currentCompanyAccountListArr))
            state.filteredCurrentAccountList = [];
            state.currentAccountList = currentAccountListArr;
            state.currentCompanyAccountList = currentCompanyAccountListArr;
        
            
        }
    },
    updateCurrentAccount:(state,action)=>{
        const currentAccountList = window.localStorage.getItem('currentAccountList');
        const currentCompanyAccountList= window.localStorage.getItem('currentCompanyAccountList');
        if(currentAccountList){
            const currentAccountListArr =  JSON.parse(currentAccountList);
            const currentCompanyAccountListArr = JSON.parse(currentCompanyAccountList);
            currentAccountListArr.forEach((currentAccount)=>{
                if(currentAccount.id ===action.payload.id){
                    
                    currentAccount.customerName = action.payload.customerName;
                    currentAccount.date = action.payload.date;
                    currentAccount.explanationText = action.payload.explanationText;
                    currentAccount.debtValue = action.payload.debtValue;
                    currentAccount.balanceValue = action.payload.balanceValue;
                   
                }
            })
            currentCompanyAccountListArr.forEach((currentAccount)=>{
                if(currentAccount.id===action.payload.id && currentAccount.companyId === action.payload.companyId){
                    currentAccount.customerName = action.payload.customerName;
                    currentAccount.date = action.payload.date;
                    currentAccount.explanationText = action.payload.explanationText;
                    currentAccount.debtValue = action.payload.debtValue;
                    currentAccount.balanceValue = action.payload.balanceValue;
                }
            })
            
            window.localStorage.setItem('currentAccountList',JSON.stringify(currentAccountListArr));
            window.localStorage.setItem('currentCompanyAccountList', JSON.stringify(currentCompanyAccountListArr))
            state.filteredCurrentAccountList = [];
            state.currentAccountList = [...currentAccountListArr];
            state.currentCompanyAccountList = [...currentCompanyAccountListArr];
            
        }
    },
    filterCurrentAccountByName:(state,action)=>{
        const currentAccountList = window.localStorage.getItem('currentAccountList');
        if(currentAccountList){
            const currentAccountListArr= JSON.parse(currentAccountList);
            const filteredList = [];
            
  currentAccountListArr.forEach((currentAccount)=>{
                if(currentAccount.customerName.toUpperCase().match(action.payload.customerName.toUpperCase())){
                  
                filteredList.push(currentAccount)
                 
                   return true;
                  
                  }  else{
                      return [];               
                       }  
                    
                    
                    }
                     
                    
                    )
                state.filteredCurrentAccountList = [...filteredList];
                
                 
                }}
                   
                  
      
}});
export const {addCurrentAccount,filterCurrentCompanyAccountList,deleteCurrentAccount,updateCurrentAccount,filterCurrentAccountByName} = currentCompanySlice.actions;
export default currentCompanySlice.reducer;