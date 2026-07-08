import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./lib/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!supabase) {
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (isMounted) {
        if (error) {
          Alert.alert("Session Error", error.message);
        }
        setSession(data.session ?? null);
        setIsLoading(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (isMounted) {
          setSession(nextSession);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const content = useMemo(() => {
    if (!isSupabaseConfigured || !supabase) {
      return (
        <View style={styles.card}>
          <Text style={styles.title}>Supabase config required</Text>
          <Text style={styles.text}>
            Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in
            apps/mobile/.env.
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Loading...</Text>
        </View>
      );
    }

    if (!session) {
      return <LoginCard onSuccess={() => undefined} />;
    }

    return <DashboardCard session={session} />;
  }, [isLoading, session]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {content}
    </SafeAreaView>
  );
}

function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!supabase) return;
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSubmitting(false);

    if (error) {
      Alert.alert("Sign-in failed", error.message);
      return;
    }

    onSuccess();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>
        Enter your email address and password to sign in.
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isSubmitting && styles.buttonDisabled,
          ]}
          disabled={isSubmitting}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function DashboardCard({ session }: { session: Session }) {
  const email = session.user?.email ?? "unknown";

  const handleSignOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign-out failed", error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>Signed in as: {email}</Text>
      <View style={styles.dashboard}>
        <Text style={styles.dashboardLabel}>Next steps</Text>
        <Text style={styles.text}>
          Add app-specific dashboard features here.
        </Text>
      </View>
      <Pressable style={styles.secondaryButton} onPress={handleSignOut}>
        <Text style={styles.secondaryButtonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  form: {
    marginTop: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  button: {
    marginTop: 4,
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
  },
  secondaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  dashboard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
  },
  dashboardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4338ca",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  loading: {
    alignItems: "center",
    gap: 12,
  },
});
