import React,{useState,useEffect} from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

import styles from '../styles/modules/companyItem.module.scss';
import { getClasses } from '../utils/getClasses';
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion';
import CompanyModal from './CompanyModal';
import ConfirmModal from './ConfirmModal';
import { getCompanyById } from '../slices/companySlice'
import { filterCurrentCompanyAccountList } from '../slices/currentAccountSlice';


import {useDispatch} from 'react-redux'
import Button from './Button';

const child = {
    hidden: {y :20,opacity:0},
    visible:{y:0,opacity:1}
  }
export default function CompanyItem({company}) {
    
    const [updateModalOpen,setUpdateModalOpen] = useState(false);
    const [confirmModalOpen,setConfirmModalOpen] = useState(false);
    const dispatch = useDispatch();
    const handleDelete=()=>{
        setConfirmModalOpen(true);
     
    }
    const handleUpdate=()=>{
        setUpdateModalOpen(true);
    }
    const getCompanyDetailsById=(companyId)=>{
        dispatch(getCompanyById(companyId));
        
        
        
    }
   
  return (
      <>
    <motion.div className={styles.item} variants={child}>
        <div className={styles.companyDetails}>
            <div className={styles.text}>
            <p  className={getClasses([styles.companyText])}>
                {'Firma Ismi: '+company.companyName}
            </p>
            <p  className={getClasses([styles.companyText])}>
                {'Adres : '+company.companyAddress}
            </p>
            <p  className={getClasses([styles.companyText])}>
                {'Vergi Dairesi : '+company.companyTaxAdministration}
            </p>
            <p  className={getClasses([styles.companyText])}>
                {'Vergi Numarası: '+company.companyTaxNumber}
            </p>
            <p  className={getClasses([styles.companyText])}>
                {'Telefon Numarası : '+company.companyTelNo}
            </p>
           
    
           
            </div>
            
        </div>
        
        <div className={styles.companyActions}>
        

                <Button variant="secondary" onClick={()=>getCompanyDetailsById(company.companyId)}>
                <Link style={{textDecoration:"none"}}to={`/addCurrentAccount/${company.companyId}`}>Cari Ekle</Link>
                </Button>
       
        <div className={styles.icon} onClick={handleUpdate} role="button" tabIndex={0} onKeyDown={handleUpdate}>
                <MdEdit></MdEdit>
            </div>
            <div className={styles.icon} onClick={handleDelete} role="button" tabIndex={0} onKeyDown={handleDelete}>
                <MdDelete></MdDelete>
            </div>

           

        </div>
    </motion.div>
    
    <CompanyModal type={'update'} company={company} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
    <ConfirmModal type={'deleteCompany'} company={company} confirmModalOpen={confirmModalOpen} setConfirmModalOpen={setConfirmModalOpen}/>
    </>
  )
}
