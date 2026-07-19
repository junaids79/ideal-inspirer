"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isTeacher: false,
  isStudent: false,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(user) {
    if (!user) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      setProfile(null);
      return;
    }

    setProfile(data);
  }

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      await loadProfile(currentUser);

      setLoading(false);
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      await loadProfile(currentUser);

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateUser = async (updates) => {
    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) throw error;

    setUser(data.user);

    await loadProfile(data.user);

    return data.user;
  };

  const value = {
    user,
    profile,
    loading,

    isAdmin: profile?.role === "admin",
    isTeacher: profile?.role === "teacher",
    isStudent: profile?.role === "student",

    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}