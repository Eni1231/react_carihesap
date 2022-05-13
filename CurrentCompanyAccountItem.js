import React,{useState,useEffect} from 'react'
import { MdDelete, MdEdit} from 'react-icons/md';
import styles from '../styles/modules/companyItem.module.scss';
import { getClasses } from '../utils/getClasses';
import {motion} from 'framer-motion';
import CurrentAccountModal from './CurrentAccountModal';
import ConfirmModal from './ConfirmModal';
import CurrentCompanyAccountModal from './CurrentCompanyAccountModal';
export default function CurrentCompanyAccountItem({company,currentAccount}) {
    
const child = {
    hidden: {y :20,opacity:0},
    visible:{y:0,opacity:1}
  }
  const [currentCompanyAccountOpen,setCurrentCompanyAccountOpen] = useState(false);
  const [confirmModalOpen,setConfirmModalOpen] = useState(false);
   
  const handleDelete=()=>{
    setConfirmModalOpen(true);
}
const handleUpdate=()=>{
    setCurrentCompanyAccountOpen(true);

}
 

  var date= [currentAccount.date];
  return (
    <>
     
     <motion.div className={styles.item} variants={child}>
          
          <div className={styles.companyDetails}>
              
              <div className={styles.text}>
              <p  className={getClasses([styles.companyText])}>
                  {'Tarih: '+new Date(date).toLocaleDateString("en-GB")}
              </p>
              <p  className={getClasses([styles.companyText])}>
                  {'Firma İsmi: '+currentAccount.customerName}
              </p>
              <p  className={getClasses([styles.companyText])}>
                  {'Açıklama : '+currentAccount.explanationText}
              </p>
              <p  className={getClasses([styles.companyText])}>
                  {'Borç : '+currentAccount.debtValue}
              </p>
              <p  className={getClasses([styles.companyText])}>
                  {'Alacak : '+currentAccount.balanceValue}
              </p>
                
    
             
              </div>
              
          </div>
          <div className={styles.companyActions}>
          <div className={styles.icon} onClick={handleUpdate} role="button" tabIndex={0} onKeyDown={handleUpdate} >
                  <MdEdit ></MdEdit>
              </div>
              <div className={styles.icon} onClick={handleDelete} role="button" tabIndex={0} onKeyDown={handleDelete}>
                  <MdDelete></MdDelete>
                
              </div>
             
          </div>
          </motion.div>
   <CurrentCompanyAccountModal company={company} currentAccount={currentAccount} currentCompanyAccountOpen={currentCompanyAccountOpen} setCurrentCompanyAccountOpen={setCurrentCompanyAccountOpen}></CurrentCompanyAccountModal>
   <ConfirmModal type={'deleteCurrentAccount'} currentAccount={currentAccount} confirmModalOpen={confirmModalOpen}setConfirmModalOpen={setConfirmModalOpen} ></ConfirmModal>
    
 
    
  
    
    </>
    
  )
}
