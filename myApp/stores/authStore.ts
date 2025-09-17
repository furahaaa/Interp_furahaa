import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
  // État de l'authentification
  isAuthenticated: boolean;
  userId: string | null;
  phoneNumber: string | null;

  // Données utilisateur
  userData: {
    firstName: string;
    lastName: string;
    email?: string;
    newsletterAccepted: boolean;
  } | null;

  // État de la validation SMS
  isSMSVerified: boolean;
  smsCodeSent: boolean;
  smsCodeAttempts: number;

  // Messages d'erreur
  errorMessage: string | null;
  successMessage: string | null;

  // Actions
  setPhoneNumber: (phone: string) => void;
  setUserData: (data: { firstName: string; lastName: string; newsletterAccepted: boolean }) => void;
  setSMSVerified: (verified: boolean) => void;
  setSMSCodeSent: (sent: boolean) => void;
  incrementSMSCodeAttempts: () => void;
  resetSMSCodeAttempts: () => void;
  setErrorMessage: (message: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  setUserId: (id: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // État initial
      isAuthenticated: false,
      userId: null,
      phoneNumber: null,
      userData: null,
      isSMSVerified: false,
      smsCodeSent: false,
      smsCodeAttempts: 0,
      errorMessage: null,
      successMessage: null,

      // Actions
      setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),

      setUserData: (data: { firstName: string; lastName: string; email?: string; newsletterAccepted: boolean }) =>
        set({ userData: data }),

      setSMSVerified: (verified: boolean) => set({ isSMSVerified: verified }),

      setSMSCodeSent: (sent: boolean) => set({ smsCodeSent: sent }),

      incrementSMSCodeAttempts: () => set((state) => ({
        smsCodeAttempts: state.smsCodeAttempts + 1
      })),

      resetSMSCodeAttempts: () => set({ smsCodeAttempts: 0 }),

      setErrorMessage: (message: string | null) => set({
        errorMessage: message,
        successMessage: null
      }),

      setSuccessMessage: (message: string | null) => set({
        successMessage: message,
        errorMessage: null
      }),

      setUserId: (id: string | null) => set({ userId: id }),

      setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

      resetAuth: () => set({
        isAuthenticated: false,
        userId: null,
        phoneNumber: null,
        userData: null,
        isSMSVerified: false,
        smsCodeSent: false,
        smsCodeAttempts: 0,
        errorMessage: null,
        successMessage: null,
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        phoneNumber: state.phoneNumber,
        isSMSVerified: state.isSMSVerified,
      }),
    }
  )
);
