import React,{useState} from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { MdOutlineClose } from 'react-icons/md'
import styles from '../styles/modules/modal.module.scss'
import Button from './Button';
import { useDispatch,useSelector} from 'react-redux';
import { filterCurrentAccountByName } from '../slices/currentAccountSlice';

import CurrentAccountContent from './CurrentAccountContent';



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
  
export default function SearchModal({searchModalOpen,setSearchModalOpen}) {


    const [searchNameText,setSearchNameText] = useState('');
    const filteredAccountList = useSelector((state)=>state.currentAccount.filteredAccountList);
    

    const dispatch = useDispatch();
    
    const handleGet=(e)=>{
      e.preventDefault();
   
      
      dispatch(
        

       
          filterCurrentAccountByName({
              
              customerName: searchNameText,
              
              
          })
        
         
      )
     
      setSearchModalOpen(false);
      setSearchNameText('')
    
      
  }
  return (
    <AnimatePresence>
 
    {searchModalOpen && (
        
         <motion.div className={styles.wrapper} initial={{opacity:0}}
         animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className={styles.container} variants={dropIn}
             initial='hidden' animate='visible' exit='exit'>
                <motion.div className={styles.closeButton}
                onClick={()=>setSearchModalOpen(false)}
                onKeyDown={()=>setSearchModalOpen(false)}
                tabIndex={0} role="button"
                initial={{top:40,opacity:0}}
                animate={{top:-10,opacity:1}}
                exit={{top:40,opacity:0}}>
                <MdOutlineClose></MdOutlineClose>
                </motion.div>    
   <form className={styles.form} onSubmit={(e)=>e.preventDefault()}>
                <h1 className={styles.formTitle}>Aramak İstediğiniz firma İsmini giriniz ?</h1>
                <label htmlFor='title'>Firma İsmi
                 <input type='text' id='title' value={searchNameText}onChange={(e)=>setSearchNameText(e.target.value)}
                 />
                 </label>
             
                <div className={styles.buttonContainer}>
                    <Button type="button" variant='primary'   onClick={(e)=>handleGet(e)} onKeyDown={()=>handleGet()}>Ara </Button>
                    <Button type="button" variant='secondary' onClick={()=>setSearchModalOpen(false)}
                    onKeyDown={()=>setSearchModalOpen(false)}
                    >İptal Et</Button>
                  
                </div>
            </form>
            </motion.div>
            </motion.div>
             
    )}</AnimatePresence>
   
  )
 
}
