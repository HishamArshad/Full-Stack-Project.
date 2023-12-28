import React from 'react'
import ReactCompareImage from 'react-compare-image';


const Comparison = () => {
  return (
 
    <div className='w-96 ml-96 flex justify-center items-center h-96'>
    <ReactCompareImage leftImage="./image1.jpg" rightImage="./image2.jpg" />
    </div>
  
  )
}

export default Comparison