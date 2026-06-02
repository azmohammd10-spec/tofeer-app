// استيراد الإعدادات من ملف firebase.js
import { app } from "./firebase.js"; 
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth(app);

// دالة إرسال كود التحقق لرقم الهاتف
export async function sendVerificationCode(phoneNumber, appVerifier) {
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return confirmationResult;
    } catch (error) {
        console.error("خطأ في إرسال الكود:", error);
        throw error;
    }
}

// دالة التأكد من الكود المدخل
export async function verifyCode(confirmationResult, code) {
    try {
        const result = await confirmationResult.confirm(code);
        return result.user;
    } catch (error) {
        console.error("خطأ في التحقق من الكود:", error);
        throw error;
    }
}
