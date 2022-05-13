import { AnimatePresence,motion } from 'framer-motion'
import React,{useState,useEffect,useMemo} from 'react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { MdOutlineClose } from 'react-icons/md'
import {v4 as uuid} from 'uuid'
import { addCurrentAccount,updateCurrentAccount } from '../slices/currentAccountSlice'
import styles from '../styles/modules/modal.module.scss'
import Button from './Button'
import { useSelector } from 'react-redux';

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
export default function CurrentAccountModal({type,currentAccount,accountModalOpen,setAccountModalOpen}) {
 
    const[customerName,setCustomerName]=  useState('');
    const[explanationText,setExplanationText]= useState('');
    const[debtValue,setDebtValue] = useState('');
    const [balanceValue,setBalanceValue] = useState('');
   
    const dispatch = useDispatch();
    const companyList = useSelector((state)=>state.company.filterCompanyById);
   const list = [...companyList];
   let companyId =  0;
   let companyName='';
   list.map((item)=>{
     companyName= item.companyName;
   return companyId = item.companyId;


    
   });

 
  useEffect(()=>{
    dispatch(filterCurrentCompanyAccountList(companyId))
  })
      
   
  useEffect(()=>{
   
    if(type==='update' && currentAccount){
      setCustomerName(currentAccount.customerName);
      setExplanationText(currentAccount.explanationText);
      setDebtValue(currentAccount.debtValue);
      setBalanceValue(currentAccount.balanceValue);
    }else{
      setCustomerName('');
      setExplanationText('');
      setDebtValue('');
      setBalanceValue('');
    }
   
  },[type,currentAccount,accountModalOpen])
 const handleSubmit =(e)=>{
    e.preventDefault();
    
    if( explanationText===''|| debtValue===''||balanceValue===''){
        toast.error('Lütfen bütün bilgileri giriniz.')
        return;
    
    }
    if( explanationText && debtValue && balanceValue){
      if(type==='add'){
        dispatch(addCurrentAccount({
            id:uuid(),
            date:new Date().toLocaleString(),
            companyId:companyId,
            customerName:companyName,
            explanationText:explanationText,
            debtValue:debtValue,
            balanceValue:balanceValue
        })
        )
        
        toast.success('Cari Hesap eklendi');
        
        setCustomerName('');
        setExplanationText('');
        setDebtValue('');
        setBalanceValue('');
      
      }if(type==='update'){
        if(
          currentAccount.explanationText!==explanationText ||
          currentAccount.debtValue!==debtValue || 
          currentAccount.balanceValue!==balanceValue){
            dispatch(updateCurrentAccount({
              ...currentAccount,
              date:new Date().toLocaleString(),
              customerName:currentAccount.customerName,
              
              explanationText:explanationText,
              debtValue:debtValue,
              balanceValue:balanceValue
            }))
            toast.success('Bilgiler Güncellendi')
          }else{
            toast.error('Değişiklik yapılmadı')
            return;
          }
      }
      setAccountModalOpen(false)
    }
    
 }
 
    return (
    
    <AnimatePresence>
        {accountModalOpen &&(
   
     <motion.div className={styles.wrapper} initial={{opacity:0}}
      animate={{opacity:1}} exit={{opacity:0}}>
         <motion.div className={styles.container} variants={dropIn}
          initial='hidden' animate='visible' exit='exit'>
             <motion.div className={styles.closeButton}
             onClick ={()=>setAccountModalOpen(false)}
             onKeyDown ={()=>setAccountModalOpen(false)}
             tabIndex={0} role="button"
             initial={{top:40,opacity:0}}
             animate={{top:-10,opacity:1}}
             exit={{top:40,opacity:0}}>
             <MdOutlineClose></MdOutlineClose>
            
             </motion.div>
             <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
                 <h1 className={styles.formTitle}>Cari Hesap {type==="update"? 'Güncelle':'Ekle'}</h1>
                 
                 <label htmlFor='title'>Açıklama
                 <input type='text' id='title' value={explanationText}onChange={(e)=>setExplanationText(e.target.value)}
            />
                 </label>
                 <label htmlFor='title'>Borç
                 <input type='number'  id='title'  value={debtValue}onChange={(e)=>setDebtValue(e.target.value)}

               onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}/>
                 </label>
                 <label htmlFor='title'>Alacak
                 <input type='number'  id='title' value={balanceValue}onChange={(e)=>setBalanceValue(e.target.value)}
               onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}/>
                 </label>
                 <div className={styles.buttonContainer}>
                     <Button type="submit" variant='primary'>Cari Hesap {type==='update'? 'Güncelle':'Ekle'}</Button>
                     <Button type="button" variant='secondary'
                     onClick={()=> setAccountModalOpen(false)}
                     onKeyDown={()=>setAccountModalOpen(false)}>İptal Et</Button>
                 </div>
             </form>
          
             
             </motion.div>
     </motion.div>
        )}
     </AnimatePresence>
   
  )
}
