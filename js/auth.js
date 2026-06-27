import { auth, provider, db } from "./firebase.js";

import {
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// تسجيل الدخول
window.login = async () => {

    try {

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        // إذا كان المستخدم جديداً
        if (!userSnap.exists()) {

            await setDoc(userRef, {

                uid: user.uid,

                name: user.displayName,

                email: user.email,

                photo: user.photoURL,

                followers: 0,

                following: 0,

                likes: 0,

                verified: false,

                createdAt: serverTimestamp()

            });

        }

        location.href = "pages/home.html";

    }

    catch (error) {

        alert(error.message);

    }

};


// تسجيل الخروج
window.logout = async () => {

    await signOut(auth);

    location.href = "../index.html";

};


// مراقبة حالة المستخدم
onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("تم تسجيل الدخول:", user.displayName);

    } else {

        console.log("لم يتم تسجيل الدخول");

    }

});
