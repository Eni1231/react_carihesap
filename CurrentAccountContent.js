import React from 'react'
import  styles from '../styles/modules/app.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import {useSelector} from 'react-redux'
import CurrentAccountItem from './CurrentAccountItem';
import style from '../styles/modules/modal.module.scss'

import styles1 from '../styles/modules/title.module.scss';

export default function CurrentAccountContent({filteredCompany}) {
    const container = {
        hidden: {opacity: 1},
        visible: {opacity: 1,scale:1,transition:{staggerChildren: 0.2}},
      }
      const child = {
        hidden: {y :20,opacity:0},
        visible:{y:0,opacity:1}
      }

    
    const currentAccountList = useSelector((state)=>state.currentAccount.currentAccountList);
    const list = [...currentAccountList]
    const  filteredCurrentAccountList = useSelector((state)=>state.currentAccount.filteredCurrentAccountList);
    const sortedCurrentAccountList =  [...currentAccountList];
     sortedCurrentAccountList.sort((a,b)=> new Date(b.date)- new Date(a.date))
  const totalDebt  =  list.reduce((total,debt)=>total+parseInt(debt.debtValue,10),0);
  const totalBalance  =  list.reduce((total,balance)=>total+parseInt(balance.balanceValue,10),0);
  const total  = totalDebt-totalBalance;
  
   
    return (
        <motion.div className={styles.content__wrapper}

        variants={container} initial='hidden' animate="visible">
    {currentAccountList.length >0?
          <h1 className={style.formTitle}>Cari Hesap Listesi </h1> : ''
          
}

          <AnimatePresence>
            {filteredCurrentAccountList.length>0 ? filteredCurrentAccountList.map((currentAccount)=>{
               return <CurrentAccountItem key={currentAccount.id} currentAccount={currentAccount}></CurrentAccountItem>
            }):   currentAccountList.length > 0 ? 
            sortedCurrentAccountList.map((currentAccount)=>
                <CurrentAccountItem  filteredCompany={filteredCompany} key={currentAccount.id} debt={totalDebt} currentAccount={currentAccount}/>
                
              )
      :<motion.p className={styles.emptyText}
      variants ={child}>Cari Hesap Bulunamadı</motion.p>}
    
     
    
</AnimatePresence>
{
  total >=0 && currentAccountList.length>0 ? 
    <h2 className={styles1.balanceRedTitle}>Bilanço : +{total}₺ </h2>
   :
   currentAccountList.length>0?
   <h2 className={styles1.balanceTitle}>Bilanço : {total}₺ </h2>
    :""
  
}

 

</motion.div>

       )
}
