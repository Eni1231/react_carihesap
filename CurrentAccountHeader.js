import React ,{useState}from 'react'
import Button from './Button'
import styles from '../styles/modules/app.module.scss'
import {useSelector} from'react-redux'
import '../styles/modules/input.css'
import CurrentAccountModal from './CurrentAccountModal';
import ConfirmModal from './ConfirmModal';
import style from '../styles/modules/title.module.scss';
import SearchModal from './SearchModal';
import CurrentCompanyAccountModal from './CurrentCompanyAccountModal'


export default function CurrentAccountHeader() {
   
    const [accountModalOpen,setAccountModalOpen] = useState(false);
    const [confirmModalOpen,setConfirmModalOpen] = useState(false);
    const [currentCompanyAccountOpen,setCurrentCompanyAccountOpen] = useState(false);
   
    const company =  useSelector((state)=>state.company.filterCompanyById);
    console.log("bu company"+company);
   
    return (
    <>  {company.map((company)=>{
      return <h1 key={company.companyId} className={style.companyTitle}>{company.companyName}</h1>
})}
    <div className={styles.appHeader}>
    
    
        <Button variant='primary' onClick={()=>setAccountModalOpen(true)}>Cari Hesap Ekle</Button>
      
        
         
        <CurrentAccountModal type="add"  accountModalOpen={accountModalOpen} setAccountModalOpen={setAccountModalOpen}></CurrentAccountModal>
        <CurrentCompanyAccountModal currentCompanyAccountOpen={currentCompanyAccountOpen} setCurrentCompanyAccountOpen={setCurrentCompanyAccountOpen}></CurrentCompanyAccountModal>
        <ConfirmModal type="deleteCurrentAccount"  confirmModalOpen={confirmModalOpen} setConfirmModalOpen={setConfirmModalOpen}/>
      
    </div>
    </>
  )
}
