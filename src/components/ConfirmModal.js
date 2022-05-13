import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import styles from '../styles/modules/modal.module.scss'
import Button from './Button'
import {useDispatch} from 'react-redux';
import { deleteCompany } from '../slices/companySlice';
import {deleteCurrentAccount} from '../slices/currentAccountSlice'
import toast from 'react-hot-toast'

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
  
export default function ConfirmModal({type,currentAccount,company,confirmModalOpen,setConfirmModalOpen}) {
    const dispatch = useDispatch();
 
    const handleDelete=(e)=>{
        e.preventDefault();
        dispatch(deleteCompany(company.companyId))
        setConfirmModalOpen(false);
        toast.success('Başarılı şekilde silindi',);
        
    }
    const handleCurrentAccountDelete=(e)=>{
      e.preventDefault();
      dispatch(deleteCurrentAccount(currentAccount.id))
      setConfirmModalOpen(false);
      toast.success('Başarılı şekilde silindi');
    }
  return (
 <AnimatePresence>
 
    {confirmModalOpen && (
         <motion.div className={styles.wrapper} initial={{opacity:0}}
         animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className={styles.container} variants={dropIn}
             initial='hidden' animate='visible' exit='exit'>
                <motion.div className={styles.closeButton}
                onClick={()=>setConfirmModalOpen(false)}
                onKeyDown={()=>setConfirmModalOpen(false)}
                tabIndex={0} role="button"
                initial={{top:40,opacity:0}}
                animate={{top:-10,opacity:1}}
                exit={{top:40,opacity:0}}>
                <MdOutlineClose></MdOutlineClose>
                </motion.div>    
   <form className={styles.form} onSubmit={(e)=> type==="deleteCompany" ? handleDelete(e):handleCurrentAccountDelete(e)}>
                <h1 className={styles.formTitle}>Silmek istediğinizden emin misiniz ?</h1>
                
             
                <div className={styles.buttonContainer}>
                    <Button type="submit" variant='primary'>Sil </Button>
                    <Button type="button" variant='secondary' onClick={()=>setConfirmModalOpen(false)}
                    onKeyDown={()=>setConfirmModalOpen(false)}
                    >İptal Et</Button>
                </div>
            </form>
            </motion.div>
            </motion.div>
    )}</AnimatePresence>
  )
}
