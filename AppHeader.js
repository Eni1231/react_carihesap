import React,{useState} from 'react'
import Button from './Button'
import styles from '../styles/modules/app.module.scss'
import CompanyModal from './CompanyModal'
import ConfirmModal from './ConfirmModal';
export default function AppHeader() {
    const [modalOpen , setModalOpen]  =  useState(false);
    const [confirmModalOpen,setConfirmModalOpen] = useState(false);
  return (
   
    <div className={styles.appHeader}>
        
        <Button variant='primary' onClick={()=>setModalOpen(true)}>Firma Ekle</Button>
       
    
        <CompanyModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <ConfirmModal type="deleteCompany" confirmModalOpen={confirmModalOpen} setConfirmModalOpen={setConfirmModalOpen}/>
        
    </div>
      
  )
}
