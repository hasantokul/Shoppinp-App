import { updateDoc, doc, getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, db, onAuthStateChangedListener, onIdTokenChangedListener } from "../utils/firebase/fierbase.utils";

// as the actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  name: null,
  setName: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState(null);
  const value = { currentUser, setCurrentUser, name};

  const getName = async (user) => {
    const email = user.email;
    const userDocRef = doc(db, "users", email);
    const userSnapShot = await getDoc(userDocRef);
    const name = userSnapShot.data().displayName;
    return name
  }

  useEffect(() => {
    const authStateUnsubscribe = onAuthStateChangedListener( async (user) => {
        
        if (user) {
          if (user.emailVerified) {
            createUserDocumentFromAuth(user);
            setCurrentUser(user);
            const name = await getName(user);
            setName(name);
          } else {
            alert("Please verify your email");
          }
        } else {
          setCurrentUser(user);
        }
    });

    return authStateUnsubscribe;
  }, []);

  useEffect(() => {
    const SignInListener = onIdTokenChangedListener(async (user) => {
      if (user) {
        if (user.emailVerified) {
          createUserDocumentFromAuth(user);
          setCurrentUser(user);
          const name = await getName(user);
          setName(name);
        } else {
          alert("Please verify your email");
        }
      }
    });

    return SignInListener;
  },[]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
