import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithPopup,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "@/firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signInGoogle: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initalLoading, setInitialLoading] = useState(true);

  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInGoogle = async () => {
    setLoading(true);

    await signInWithPopup(auth, googleProvider)
      .then(({ user }) => {
        setUser(user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      error,
      signInGoogle,
      loading,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initalLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  // we are returing the current value from our created context,which holds
  // our user info some functions and some states
  return useContext(AuthContext);
}
