import React from 'react';

export default function PointsSystem({ points = 100, referralLink = "https://vercel.app" }) {
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("تم نسخ رابط الإحالة بنجاح! شاركه مع أصدقائك من التجار لكسب نقاط ترويج مجانية.");
  };

  return (
    <div style={{
      backgroundColor: '#eff6ff',
      borderRadius: '12px',
      padding: '16px',
      width: '100%',
      maxWidth: '400px',
      border: '1px solid #bfdbfe',
      marginBottom: '20px',
      direction: 'rtl',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontWeight: 'bold', color: '#1e40af' }}>محفظة النقاط الذكية 🪙</span>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1d4ed8' }}>{points} نقطة</span>
      </div>
      
      <p style={{ fontSize: '13px', color: '#1e3a8a', margin: '0 0 12px 0', lineHeight: '1.4' }}>
        شارك تطبيق "المسوق الذكي" مع تجار آخرين. كل صديق يسجل من خلالك يمنحك 50 نقطة ترويج إضافية فوراً!
      </p>

      <button 
        onClick={handleCopyLink}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        🔗 نسخ رابط مشاركة التطبيق
      </button>
    </div>
  );
}
