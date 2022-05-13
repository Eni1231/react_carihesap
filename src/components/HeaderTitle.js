import React from 'react'
import style from '../styles/modules/title.module.scss';
export default function HeaderTitle({children,...rest}) {
  return (
    
        <p className={style.title}{...rest}>{children}</p>
  )
}
