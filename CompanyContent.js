import React from 'react'
import {useSelector} from 'react-redux'
import CompanyItem from './CompanyItem'
import  styles from '../styles/modules/app.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import style from '../styles/modules/modal.module.scss'
export default function CompanyContent() {
  const container = {
    hidden: {opacity: 1},
    visible: {opacity: 1,scale:1,transition:{staggerChildren: 0.2}},
  }
  const child = {
    hidden: {y :20,opacity:0},
    visible:{y:0,opacity:1}
  }
    const companyList = useSelector((state)=>state.company.companyList)
    
  return (
   <motion.div className={styles.content__wrapper}
   variants={container} initial='hidden' animate="visible">
     <AnimatePresence>
      {companyList.length >0 ? 
       <h1 className={style.formTitle}>Firma Listesi</h1> : ''}
     {companyList.length >0 ? 
        companyList.map((company)=>
          <CompanyItem key={company.companyId} company={company}/>
        )
:<motion.p className={styles.emptyText}
variants ={child}>Firma Bulunamadı</motion.p>}
</AnimatePresence></motion.div>
  )
}
