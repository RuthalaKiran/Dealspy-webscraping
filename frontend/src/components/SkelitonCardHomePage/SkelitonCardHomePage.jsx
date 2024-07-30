import React from 'react'

const SkelitonCardHomePage = () => {
  return (
    <div className='  relative overflow-hidden flex flex-col  items-center justify-evenly skelitoncardhomepage w-[250px] h-[300px] rounded-10'>
     <div className="bg-black/10 w-[200px] h-[200px] rounded-10 skelitoncardhome-img"></div>
     <div className='flex justify-between items-center gap-10 '>
        <p className='w-[80px] h-[30px] bg-black/10 rounded-10'></p>
        <p className='w-[80px] h-[30px] bg-black/10 rounded-10'></p>
     </div>
    </div>
  )
}

export default SkelitonCardHomePage
