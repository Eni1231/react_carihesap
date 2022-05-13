import HeaderTitle from './components/HeaderTitle';
import React from 'react';
import style from './styles/modules/app.module.scss';
import AppHeader from './components/AppHeader';
import CompanyContent from './components/CompanyContent';
import { Toaster} from 'react-hot-toast';
import CurrentAccountHeader from './components/CurrentAccountHeader';
import CurrentAccountContent from './components/CurrentAccountContent';
import { Routes } from 'react-router-dom';
import AddCompanyCurrentAccount from './components/AddCompanyCurrentAccount';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllCurrentCompanyHeader from './components/AllCurrentCompanyHeader';
import CurrentAccountItem from './components/CurrentAccountItem';
import CurrentAccountModal from './components/CurrentAccountModal';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const companyList = useSelector((state)=>state.company.filterCompanyById);
  console.log("A"+companyList)
  
  return (
    <>
    <div className="container">
      <HeaderTitle>KALAMOZA DEFTERİ</HeaderTitle>
    
      <div className={style.app__wrapper}>
      <BrowserRouter>
        
      
      
      
      <Routes>
        <Route path="/" element = {<><AppHeader/><CompanyContent /><AllCurrentCompanyHeader/><CurrentAccountContent filteredCompany={companyList}/></>}></Route>
       
 
        <Route path="/addCurrentAccount/:companyId" element={<><CurrentAccountHeader/><AddCompanyCurrentAccount company={companyList}/></>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    </div>
    <Toaster position="bottom-right" toastOptions={{style:{
      fontSize:'1.4rem', 

    }}}/>
    
    </>


  );
}

export default App;
