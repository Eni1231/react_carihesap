import React, {useState,useEffect} from 'react'
import styles from '../styles/modules/modal.module.scss'
import {MdOutlineClose} from 'react-icons/md'
import {useDispatch} from 'react-redux'
import Button from './Button'
import {v4 as uuid} from 'uuid'
import { addCompany,updateCompany } from '../slices/companySlice'
import toast from 'react-hot-toast'
import { AnimatePresence,motion } from 'framer-motion'
import { filterCurrentCompanyAccountList } from '../slices/currentAccountSlice'

const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };
  
export default function CompanyModal({type,modalOpen,setModalOpen,company}) {
    const [companyName,setCompanyName] = useState('');
    const [companyAddress,setCompanyAddress] = useState('');
    const [companyTaxAdministration,setCompanyTaxAdministration] = useState('');
    const [companyTaxNumber,setCompanyTaxNumber]=  useState('');
    const [companyTelNo,setCompanyTelNo] = useState('');
    const dispatch = useDispatch();
   
    useEffect(()=>{
        if(type==='update' && company){
            setCompanyName(company.companyName);
            setCompanyAddress(company.companyAddress);
            setCompanyTaxAdministration(company.companyTaxAdministration);
            setCompanyTaxNumber(company.companyTaxNumber);
            setCompanyTelNo(company.companyTelNo);
        }else{
            setCompanyName('');
            setCompanyAddress('');
            setCompanyTaxAdministration('');
            setCompanyTaxNumber('');
            setCompanyTelNo('');
        }
    },[type,company,modalOpen])
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(companyName==='' || companyAddress==='' || companyTelNo===''|| companyTaxAdministration ==='' || companyTaxNumber===''){
            toast.error('Lütfen bütün bilgileri giriniz.')
            return;
        }
        if(companyName&& companyAddress && companyTaxAdministration&&companyTaxNumber && companyTelNo ){
            if(type==="add"){
            dispatch(addCompany({
                    companyId:uuid(),
                    companyName:companyName,
                    companyAddress:companyAddress,
                    companyTaxAdministration: companyTaxAdministration,
                    companyTaxNumber: companyTaxNumber,
                    companyTelNo:companyTelNo
            }));
            toast.success('Firma başarılı şekilde eklendi');
            setCompanyName('');
            setCompanyAddress('');
            setCompanyTaxAdministration('');
            setCompanyTaxNumber('');
            setCompanyTelNo('');
           
            
        
    }if(type==='update'){
        if(company.companyName !== companyName||company.companyAddress !== companyAddress||
          company.companyTaxAdministration !== companyTaxAdministration || 
          company.companyTaxNumber !== companyTaxNumber ||
          company.companyTelNo !== companyTelNo){
            dispatch(updateCompany({
                ...company,
                companyName: companyName,
                companyAddress: companyAddress,
                companyTaxAdministration: companyTaxAdministration,
                companyTaxNumber: companyTaxNumber,
                companyTelNo: companyTelNo
            }))
        }else{
            toast.error('Değişiklik yapılmadı');
            return;
        }
        }
        setModalOpen(false)
    }
    
   
    }
  return (
    <AnimatePresence>
   { modalOpen && (
    <motion.div className={styles.wrapper} initial={{opacity:0}}
     animate={{opacity:1}} exit={{opacity:0}}>
        <motion.div className={styles.container} variants={dropIn}
         initial='hidden' animate='visible' exit='exit'>
            <motion.div className={styles.closeButton}
            onClick={()=>setModalOpen(false)}
            onKeyDown={()=>setModalOpen(false)}
            tabIndex={0} role="button"
            initial={{top:40,opacity:0}}
            animate={{top:-10,opacity:1}}
            exit={{top:40,opacity:0}}>
            <MdOutlineClose></MdOutlineClose>
           
            </motion.div>
            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
                <h1 className={styles.formTitle}>Firma {type==='update' ? 'Güncelle':'Ekle'}</h1>
                <label htmlFor='title'>Firma Adı
                <input type='text' id='title' value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}/>
                </label>
                <label htmlFor='title'>Adres
                <input type='text' id='title'
                value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)}/>
                </label>
                <label htmlFor='title'>Vergi Dairesi
                <input type='text' id='title'
                value={companyTaxAdministration} onChange={(e)=>setCompanyTaxAdministration(e.target.value)}/>
                </label>
                <label htmlFor='title'>Vergi Numarası
                <input type='number' id='title'
                value={companyTaxNumber} onChange={(e)=>setCompanyTaxNumber(e.target.value)}  onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}/>
                </label>
                <label htmlFor='title'>Telefon Numarası
                <input type='number'  id='title' 
                value={companyTelNo} onChange={(e)=>setCompanyTelNo(e.target.value)} onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}/>
                </label>
                <div className={styles.buttonContainer}> 
                    <Button type="submit" variant='primary'>Firma {type==='update'?'Güncelle':'Ekle'}</Button>
                    <Button type="button" variant='secondary' onClick={()=>setModalOpen(false)}
                     onKeyDown={()=>setModalOpen(false)}>İptal Et</Button>
                </div>
            </form>
            </motion.div>
    </motion.div>
  
    )
   }</AnimatePresence>
  
    )
}
