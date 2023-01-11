import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithCredential,  signOut } from 'firebase/auth';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';

export const useUser = () => {
    
    
    return [user, promptAsync, logout]
}