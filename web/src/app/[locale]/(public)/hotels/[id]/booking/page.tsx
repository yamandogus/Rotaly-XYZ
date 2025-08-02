'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import BookingInformationPage from './information/page'
import BookingPaymentPage from './payment/page'
import { Check } from 'lucide-react'
import BookingSuccessPage from './success/page'

function BookingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // URL'den step parametresini oku, yoksa 1 kullan
  const urlStep = searchParams.get('step')
  const [currentStep, setCurrentStep] = useState(() => {
    if (urlStep && parseInt(urlStep) >= 1 && parseInt(urlStep) <= 3) {
      return parseInt(urlStep)
    }
    return 1
  })

  // Step değiştiğinde URL'i güncelle
  const updateStep = (newStep: number) => {
    setCurrentStep(newStep)
    router.push(`?step=${newStep}`, { scroll: false })
  }

  // URL parametresi değiştiğinde state'i güncelle
  useEffect(() => {
    const urlStep = searchParams.get('step')
    if (urlStep && parseInt(urlStep) >= 1 && parseInt(urlStep) <= 3) {
      setCurrentStep(parseInt(urlStep))
    }
  }, [searchParams])

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
                    ${(currentStep > step.id || (currentStep === 3 && step.id <= 3)) 
                      ? 'bg-green-500' 
                      : currentStep === step.id 
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }
                    transition-all duration-300
                  `}>
                    {(currentStep > step.id || (currentStep === 3 && step.id <= 3)) ? (
                      <Check className='w-6 h-6 text-white' />
                    ) : (
                      <span className={`
                        ${currentStep >= step.id 
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
                    ${(currentStep > step.id || (currentStep === 3 && step.id < 3))
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
        {currentStep === 1 && <BookingInformationPage setCurrentStep={updateStep} />}
        {currentStep === 2 && <BookingPaymentPage setCurrentStep={updateStep} />}
        {currentStep === 3 && <BookingSuccessPage />}
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  )
} 