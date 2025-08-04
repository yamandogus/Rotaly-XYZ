import React from 'react'
import Image from 'next/image'

const FavoritesPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold'>Favorilerim</h1>
            <p className='text-sm text-gray-500'>Favorileriniz burada görünür</p>
            <div className='flex flex-row items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Image src='/images/logo3.png' alt='logo' width={100} height={100} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FavoritesPage