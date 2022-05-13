import React,{useState,useEffect} from 'react'
import styles from '../styles/modules/modal.module.scss'
import { AnimatePresence,motion } from 'framer-motion'
import { MdOutlineClose } from 'react-icons/md'
import Button from './Button'
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import {updateCurrentAccount} from '../slices/currentAccountSlice'
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
export default function CurrentCompanyAccountModal({company,currentAccount,currentCompanyAccountOpen,setCurrentCompanyAccountOpen}) {
 
  const[customerName,setCustomerName]=  useState('');
  const[explanationText,setExplanationText]= useState('');
  const[debtValue,setDebtValue] = useState('');
  const [balanceValue,setBalanceValue] = useState('');
  const dispatch = useDispatch();
  const filteredList = useSelector((state)=>state.company.filterCompanyById);  
  console.log("geldimbe"+filteredList);
  let companyName= ''
  filteredList.map((company)=> companyName=company.companyName)
    useEffect(()=>{
   
      if(currentAccount){
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
     
    },[currentAccount,currentCompanyAccountOpen])
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(customerName==='' || explanationText===''|| debtValue===''||balanceValue===''){
        toast.error('Lütfen bütün bilgileri giriniz.')
        return;
    
    }
    
      if(
        currentAccount.explanationText!==explanationText ||
        currentAccount.debtValue!==debtValue || 
        currentAccount.balanceValue!==balanceValue){
          dispatch(updateCurrentAccount({
            ...currentAccount,
            date:new Date().toLocaleString(),
            customerName:companyName,
            
            explanationText:explanationText,
            debtValue:debtValue,
            balanceValue:balanceValue
          }))
          toast.success('Bilgiler Güncellendi')
        }else{
          toast.error('Değişiklik yapılmadı')
          return;
        }
    
    setCurrentCompanyAccountOpen(false)
  }
    
    

  
return (
    <AnimatePresence>
    {currentCompanyAccountOpen &&(

 <motion.div className={styles.wrapper} initial={{opacity:0}}
  animate={{opacity:1}} exit={{opacity:0}}>
     <motion.div className={styles.container} variants={dropIn}
      initial='hidden' animate='visible' exit='exit'>
         <motion.div className={styles.closeButton}
         onClick ={()=>setCurrentCompanyAccountOpen(false)}
         onKeyDown ={()=>setCurrentCompanyAccountOpen(false)}
         tabIndex={0} role="button"
         initial={{top:40,opacity:0}}
         animate={{top:-10,opacity:1}}
         exit={{top:40,opacity:0}}>
         <MdOutlineClose></MdOutlineClose>
        
         </motion.div>
         <form className={styles.form} onSubmit={(e)=>handleSubmit(e)} >
             <h1 className={styles.formTitle}>Cari Hesap Güncelle</h1>
            
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
                 <Button type="submit" variant='primary'>Cari Hesap Güncelle</Button>
                 <Button type="button" variant='secondary'
                 onClick={()=> setCurrentCompanyAccountOpen(false)}
                 onKeyDown={()=>setCurrentCompanyAccountOpen(false)}>İptal Et</Button>
             </div>
         </form>
      
         
         </motion.div>
 </motion.div>
    )}
 </AnimatePresence>
  )
}
