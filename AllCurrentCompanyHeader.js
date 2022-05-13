
import React ,{useState}from 'react'
import Button from './Button'
import styles from '../styles/modules/app.module.scss'

import '../styles/modules/input.css'

import ConfirmModal from './ConfirmModal';

import SearchModal from './SearchModal';
export default function AllCurrentCompanyHeader() {
     
const [confirmModalOpen,setConfirmModalOpen] = useState(false);
const [searchModalOpen,setSearchModalOpen] = useState(false);
  return (
    <div className={styles.appHeader}>
    
    <Button variant='primary' onClick={()=>setSearchModalOpen(true)}>Arama Yap</Button>
    
     
 
  
    
    <ConfirmModal type="deleteCurrentAccount"  confirmModalOpen={confirmModalOpen} setConfirmModalOpen={setConfirmModalOpen}/>
    <SearchModal searchModalOpen={searchModalOpen} setSearchModalOpen={setSearchModalOpen}></SearchModal>
</div>
  )
}
