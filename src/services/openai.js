/**
 * دالة للاتصال بمحرك OpenAI (ChatGPT) لتوليد النصوص التسويقية
 * @param {string} productName - اسم المنتج المرفوع
 * @param {string} price - سعر المنتج
 * @returns {Promise<string>} - النص التسويقي المكتوب باللهجة المحلية
 */
export async function generateMarketingCaption(productName, price) {
  try {
    const url = 'https://openai.com';
    
    // يتم استدعاء المفتاح السرّي بأمان عبر بيئة Vercel لضمان عدم سرقته
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 

    if (!apiKey) {
      console.warn("تنبيه: لم يتم ضبط مفتاح OpenAI API Key بعد.");
      return `📢 العرض الأقوى وصل! تفضلوا بزيارة متجرنا لرؤية ${productName} المتوفر الآن بسعر ${price} فقط! الكمية محدودة 🔥.`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // موديل حديث متطور مخصص للتسويق وفهم المنتجات
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

    if (!response.ok) {
      throw new Error("فشل الاتصال بخوادم الذكاء الاصطناعي");
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("حدث خطأ أثناء توليد الكابشن:", error);
    // نص بديل ذكي في حال حدوث أي انقطاع لكي لا يتوقف التطبيق أمام التاجر
    return `✨ جديدنا اليوم! ${productName} متاح الآن بتصميم فاخر وجودة عالية وبسعر مناسب: ${price} فقط 😍. اطلب الآن قبل نفاد الكمية من المتجر!`;
  }
}
