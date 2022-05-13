import React from 'react'
import  styles from '../styles/modules/app.module.scss'
import style from '../styles/modules/modal.module.scss'
import styles1 from '../styles/modules/title.module.scss';

import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import CurrentCompanyAccountItem from './CurrentCompanyAccountItem';

export default function AddCompanyCurrentAccount({company}) {

 
  const filteredCurrentCompanyAccount =  useSelector((state)=>state.currentAccount.currentCompanyAccountList);
  
  const container = {
    hidden: {opacity: 1},
    visible: {opacity: 1,scale:1,transition:{staggerChildren: 0.2}},
  }
const child = {
  hidden: {y :20,opacity:0},
  visible:{y:0,opacity:1}
}
const totalDebt  =  filteredCurrentCompanyAccount.reduce((total,debt)=>total+parseInt(debt.debtValue,10),0);
const totalBalance  =  filteredCurrentCompanyAccount.reduce((total,balance)=>total+parseInt(balance.balanceValue,10),0);
let total = totalDebt - totalBalance;
  return (
   
   <motion.div className={styles.content__wrapper}

variants={container} initial='hidden' animate="visible">
{filteredCurrentCompanyAccount.length >0?
  <h1 className={style.formTitle}>Cari Hesap Listesi </h1> : ''
  
}

  <AnimatePresence>
  {filteredCurrentCompanyAccount.length>0?
  filteredCurrentCompanyAccount.map((currentAccount)=>{
     return <CurrentCompanyAccountItem key={currentAccount.id}company={company} currentAccount={currentAccount}></CurrentCompanyAccountItem>
     

    })
:<motion.p className={styles.emptyText}
variants ={child}>Cari Hesap Bulunamadı</motion.p>}

</AnimatePresence>

{
  total >=0 && filteredCurrentCompanyAccount.length>0 ? 
    <h2 className={styles1.balanceRedTitle}>Bilanço : +{total}₺ </h2>
   :
   filteredCurrentCompanyAccount.length>0?
   <h2 className={styles1.balanceTitle}>Bilanço : {total}₺ </h2>
    :""
  
}

</motion.div>

  
    
    
  )
  
}
