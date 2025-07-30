import Link from 'next/link'
import React from 'react'

interface BookingConfirmationPageProps {
  setCurrentStep: (step: number) => void
}

const BookingConfirmationPage = ({ setCurrentStep }: BookingConfirmationPageProps) => {
  return (
    <div>
        <h1>Onay</h1>
        <button onClick={() => setCurrentStep(2)}>
          Geri
        </button>
        <Link href="/" className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Anasayfaya dön
        </Link>
    </div>
  )
}

export default BookingConfirmationPage