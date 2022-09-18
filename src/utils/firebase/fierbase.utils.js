import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Configuration

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

// Initialize Firebase

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

//  Google Authentication

export const auth = getAuth();

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGoogleRedirect = () => {
  return signInWithRedirect(auth, googleProvider);
};


//   Database interaction

export const db = getFirestore();

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log("Done");
// };


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};


export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.email);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email, emailVerified } = userAuth;
    console.log(userAuth);
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        emailVerified,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }

    return userDocRef;
  }
};


// Sign in/up with email & password

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const SıgnInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  // const userDocRef = doc(db, "users", email);
  // const userSnapShot = await getDoc(userDocRef);

  // const isVerified = userSnapShot.data().emailVerified;

  // if (isVerified) {
    await signInWithEmailAndPassword(auth, email, password);
  // } else {
  //   alert("Please verify your email");
  // }
};


// Sign Out

export const signOutUser = async () => await signOut(auth);


// Listens auth status changes

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};


// Listens verification status changes

export const onIdTokenChangedListener = (callback) => {
  return onIdTokenChanged(auth, callback);
};
