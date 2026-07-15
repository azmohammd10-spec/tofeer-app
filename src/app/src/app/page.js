'use client'; // تفعيل ميزات التفاعل للموبايل والويب في Next.js

import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import PointsSystem from '../components/PointsSystem';

export default function Home() {
  // إنشاء حالة (State) ل إدارة نقاط التاجر في الصفحة الرئيسية
  const [userPoints, setUserPoints] = useState(150); 

  // هذه الدالة تعمل فور ضغط التاجر على زر إطلاق الحملة الإعلانية
  const handleNewCampaign = (productData) => {
    alert(
      `🎯 تم استلام بيانات الإعلان بنجاح!\n` +
      `📦 المنتج: ${productData.productName}\n` +
      `💰 الميزانية: ${productData.budget}$ يومياً\n\n` +
      `جاري تجهيز الاتصال بالذكاء الاصطناعي لكتابة النص الإعلاني...`
    );
    // ملاحظة: هنا سنربط ملف الخدمات البرمجية للذكاء الاصطناعي لاحقاً
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
      {/* هيدر التطبيق العلوي */}
      <header style={{ marginBottom: '24px', textAlign: 'center', direction: 'rtl' }}>
        <h1 style={{ color: '#1e1b4b', fontSize: '24px', margin: '0', fontWeight: 'bold' }}>
          المسوق الآلي الذكي AI 🚀
        </h1>
        <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>
          ارفع فيديو منتجك.. ودع الذكاء الاصطناعي يتولى كتابة الإعلانات والتمويل الآلي
        </p>
      </header>

      {/* 1. استدعاء ميزة نظام ومحفظة النقاط الفيروسية من ملفها المنفصل */}
      <PointsSystem points={userPoints} />

      {/* 2. استدعاء ميزة نموذج رفع المنتجات والفيديو من ملفها المنفصل */}
      <ProductForm onLaunch={handleNewCampaign} />
      
    </div>
  );
}
