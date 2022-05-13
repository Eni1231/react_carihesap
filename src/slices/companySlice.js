import { createSlice } from "@reduxjs/toolkit";


const getInitialCompany = ()=>{
    const localCompanyList = window.localStorage.getItem('companyList')
   
    if(localCompanyList){
        return JSON.parse(localCompanyList);
       
    }
    window.localStorage.setItem('companyList',JSON.stringify([]))
    return [];
    
}
const getInitialFilteredCompany=()=>{
    const localCompanyById = window.localStorage.getItem('companyFiltered');
    if(localCompanyById){
        return JSON.parse(localCompanyById);
    }
    window.localStorage.setItem('companyFiltered',JSON.stringify([]));
    return [];
}
const initialValue ={
    companyList: getInitialCompany(),
    filterCompanyById : getInitialFilteredCompany(),
};

export const companySlice = createSlice({
    name: 'company',
    initialState:initialValue,
    reducers:{
        addCompany:(state,action)=>{
            state.companyList.push(action.payload);
            const companyList = window.localStorage.getItem('companyList');
            if(companyList){
                const companyListArr = JSON.parse(companyList);
                companyListArr.push({
                    ...action.payload
                })
                window.localStorage.setItem('companyList', JSON.stringify(companyListArr))
            }else{
                window.localStorage.setItem("companyList",JSON.stringify([{...action.payload}]))   
            }
        },
   
    deleteCompany:(state,action)=>{
        const companyList = window.localStorage.getItem("companyList");
        if(companyList){
            const companyListArr = JSON.parse(companyList);
            companyListArr.forEach((company,index)=>{
                if(company.companyId === action.payload){
                    companyListArr.splice(index,1);
                }
            });
            window.localStorage.setItem('companyList',JSON.stringify(companyListArr));
            state.companyList = companyListArr;
        }
    },
    getCompanyById:(state,action)=>{
        const companyList = window.localStorage.getItem('companyList');
        if(companyList) {
            const companyListArr = JSON.parse(companyList);
            const filteredList = [];
            companyListArr.forEach((company)=>{
                if(company.companyId===action.payload){
                    filteredList.push(company);
                    console.log(filteredList);
                }
                window.localStorage.setItem('companyFiltered',JSON.stringify(filteredList));
                state.filterCompanyById = [...filteredList];
            })
            
        }
    },
    updateCompany:(state,action)=>{
        const companyList = window.localStorage.getItem('companyList');
        if(companyList){
            const companyListArr = JSON.parse(companyList);
            companyListArr.forEach((company)=>{
                if(company.companyId === action.payload.companyId){
                    company.companyName = action.payload.companyName;
                    company.companyAddress = action.payload.companyAddress;
                    company.companyTaxAdministration = action.payload.companyTaxAdministration;
                    company.companyTaxNumber = action.payload.companyTaxNumber;
                    company.companyTelNo = action.payload.companyTelNo;
                }
            })
        window.localStorage.setItem('companyList',JSON.stringify(companyListArr))
        state.companyList = [...companyListArr];
    
    }
    }
}
})
export const {addCompany,getCompanyById,deleteCompany,updateCompany} =  companySlice.actions;
export default companySlice.reducer;