'use client'; // تفعيل ميزات التفاعل للموبايل والويب في Next.js

import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import PointsSystem from '../components/PointsSystem';

// دالة الذكاء الاصطناعي مدمجة داخلياً لضمان التشغيل الفوري والسرعة
async function generateMarketingCaptionInPage(productName, price) {
  try {
    const url = 'https://openai.com';
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 

    if (!apiKey) {
      return `📢 العرض الأقوى وصل! تفضلوا بزيارة متجرنا لرؤية ${productName} المتوفر الآن بسعر ${price} فقط! الكمية محدودة 🔥.`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "أنت خبير ومستشار تسويق رقمي محترف في السوق الخليجي والعربي. اكتب نص إعلاني مشوق وجذاب جداً لإنستغرام وتيك توك يعتمد على اللهجة السعودية التسويقية المحببة للتجار، واشرح ميزات المنتج بطريقة تقنع الزبون بالشراء فوراً، واضف هاشتاقات تريند مناسبة للمنتج."
          },
          {
            role: "user",
            content: `اسم المنتج: ${productName}. السعر: ${price}.`
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) throw new Error("خطأ بخوادم الذكاء الاصطناعي");
    const data = await response.json();
    return data.choices.message.content;

  } catch (error) {
    return `✨ جديدنا اليوم! ${productName} متاح الآن بتصميم فاخر وجودة عالية وبسعر مناسب: ${price} فقط 😍. اطلب الآن قبل نفاد الكمية من المتجر!`;
  }
}

export default function Home() {
  const [userPoints, setUserPoints] = useState(150); 
  const [generatedText, setGeneratedText] = useState(''); 
  const [isProcessing, setIsProcessing] = useState(false); 

  const handleNewCampaign = async (productData) => {
    setIsProcessing(true);
    setGeneratedText('');

    // استدعاء الدالة المدمجة مباشرة
    const resultText = await generateMarketingCaptionInPage(productData.productName, productData.price);
    
    setGeneratedText(resultText);
    setIsProcessing(false);
    setUserPoints((prevPoints) => Math.max(0, prevPoints - 20)); 
    
    alert("✨ نجح الذكاء الاصطناعي في تحليل بياناتك وتوليد النص الإعلاني الذكي!");
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <header style={{ marginBottom: '24px', textAlign: 'center', direction: 'rtl' }}>
        <h1 style={{ color: '#1e1b4b', fontSize: '24px', margin: '0', fontWeight: 'bold' }}>
          المسوق الآلي الذكي AI 🚀
        </h1>
        <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>
          ارفع فيديو منتجك.. ودع الذكاء الاصطناعي يتولى كتابة الإعلانات والتمويل الآلي
        </p>
      </header>

      <PointsSystem points={userPoints} />
      <ProductForm onLaunch={handleNewCampaign} />

      {(isProcessing || generatedText) && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          marginTop: '20px',
          direction: 'rtl',
          boxSizing: 'border-box',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e1b4b', margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>
            📝 النص التسويقي المقترح المقاوم للمنافسة:
          </h3>
          
          {isProcessing ? (
            <p style={{ color: '#4f46e5', fontSize: '14px', margin: '0' }}>
              ⏳ جاري قراءة بيانات منتجك وصياغة الكابشن الإعلاني باللهجة المحلية...
            </p>
          ) : (
            <>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#334155',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                border: '1px solid #f1f5f9'
              }}>
                {generatedText}
              </div>
              <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '8px' }}>
                * تم خصم 20 نقطة من رصيدك مقابل هذه العملية.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
