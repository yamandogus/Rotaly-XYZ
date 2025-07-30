'use client'

import React, { useState } from 'react'
import BookingInformationPage from './booking/information/page'
import BookingPaymentPage from './booking/payment/page'
import BookingConfirmationPage from './booking/confirmation/page'
import { Check } from 'lucide-react'

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: 'Konaklama Bilgileri' },
    { id: 2, title: 'Ödeme Bilgileri' },
    { id: 3, title: 'Rezervasyon Onayı' }
  ]

  return (
    <div className='min-h-screen bg-background'>
      {/* Sayfa Numaraları */}
      <div className='w-full py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-between'>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Sayfa Numarası ve Başlık */}
                <div className='flex flex-row justify-center items-center gap-2'>
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-md
                    ${currentStep > step.id 
                      ? 'bg-green-500' 
                      : currentStep === step.id 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }
                    transition-all duration-300
                  `}>
                    {currentStep > step.id ? (
                      <Check className='w-6 h-6 text-white' />
                    ) : (
                      <span className={`
                        ${currentStep > step.id || currentStep === step.id 
                          ? 'text-white' 
                          : 'text-gray-600 dark:text-gray-300'
                        }
                      `}>
                        {step.id}
                      </span>
                    )}
                  </div>
                  <div className={`
                    text-sm font-medium text-center
                    ${currentStep >= step.id 
                      ? 'text-gray-900 dark:text-gray-100' 
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}>
                    {step.title}
                  </div>
                </div>

                {/* Bağlantı Çizgisi */}
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 rounded-full
                    ${currentStep > step.id 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                    }
                    transition-all duration-300
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Sayfa İçeriği */}
      <div className='max-w-6xl mx-auto px-4 pb-8'>
        {currentStep === 1 && <BookingInformationPage setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && <BookingPaymentPage setCurrentStep={setCurrentStep} />}
        {currentStep === 3 && <BookingConfirmationPage setCurrentStep={setCurrentStep} />}
      </div>
    </div>
  )
} 