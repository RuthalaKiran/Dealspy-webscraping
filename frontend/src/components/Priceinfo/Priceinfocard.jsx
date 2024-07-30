import React from 'react'

const Priceinfocard = ({title,icon,value,borderclor}) => {
  return (
    <div className={`price-info_card border-l-[${borderclor}]`}>
     <p className='text-base text-black-100'>{title}</p>
     <div className='flex gap-1'>
        <img src={icon} width={24} height={24} alt={title} />
        <p className='text-2xl font-bold text-secondary'>
            {value}
        </p>
     </div>
    </div>
  )
}

export default Priceinfocard
