import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../Authentication/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import { couch } from "globals";

export const AuthContext=createContext()
const Authprovider = ({children}) => {
    const signin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const provider = new GoogleAuthProvider();
    const googlesignin=()=>{
        return signInWithPopup(auth,provider);
    }
    const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const logout =()=>{
    return signOut(auth)
  }
    const authvalue={
        user,
        signin,
        logout,
        googlesignin};
    return (
        <AuthContext.Provider value={authvalue}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;