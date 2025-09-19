import React from 'react'
import { FileUpload } from '@/components/FileUpload'

const page = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
        <div className='m-3 md:m-0 md:w-[60%] h-[50%]'>
        <FileUpload></FileUpload>
        </div>
      
    </div>
  )
}

export default page
