import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yamandevop@gmail.com',
        pass: process.env.EMAIL_PASS // .env.local dosyasında tanımlanmalı
      }
    })

    const mailOptions = {
      from: 'rezervasyon@rotaly.com',
      to: email,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Rotaly Hotel</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Lüks ve Konforun Adresi</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px;">${subject}</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${message}
            </div>
            
            <div style="margin: 30px 0; padding: 20px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
              <h3 style="margin: 0 0 10px 0; color: #155724;">✅ Rezervasyon Detayları</h3>
              <p style="margin: 5px 0;"><strong>Otel:</strong> Rotaly Hotel Deluxe</p>
              <p style="margin: 5px 0;"><strong>Giriş:</strong> 2 Ağustos 2025</p>
              <p style="margin: 5px 0;"><strong>Çıkış:</strong> 6 Ağustos 2025</p>
              <p style="margin: 5px 0;"><strong>Oda Tipi:</strong> Deluxe Suite</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://rotaly.com" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Rezervasyonumu Görüntüle
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #1e40af;">🎉 Özel Fırsat!</h4>
              <p style="margin: 0; color: #1e40af;">
                <strong>%20 Yaz İndirimi</strong> - Sadece bu hafta geçerli fırsatları kaçırma! 
                <a href="https://rotaly.com/firsatlar" style="color: #667eea;">Hemen İncele</a>
              </p>
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px;">
            <p style="margin: 0;">
              Bu e-posta otomatik gönderilmiştir. Detaylar için 
              <a href="https://rotaly.com" style="color: #667eea;">rotaly.com</a>'u ziyaret edin.
            </p>
            <p style="margin: 10px 0 0 0;">
              © 2024 Rotaly Hotel. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email gönderildi:', info.messageId)
    
    return NextResponse.json({ 
      success: true, 
      message: 'E-posta başarıyla gönderildi',
      messageId: info.messageId 
    })

  } catch (error) {
    console.error('Email gönderme hatası:', error)
    return NextResponse.json(
      { success: false, message: 'E-posta gönderilemedi' },
      { status: 500 }
    )
  }
} 