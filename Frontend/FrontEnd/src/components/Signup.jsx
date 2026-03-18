import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Login.css";

/* ── Brand SVG Icons ── */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#fff" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#fff" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#fff" />
  </svg>
);

/* ── Map Firebase error codes to friendly messages ── */
function friendlyAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-up was cancelled. Please try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    default:
      return "Sign-up failed. Please try again.";
  }
}

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const clearError = () => setError("");

  const persistUser = async (user, name) => {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email, displayName: name || user.displayName || "",
      createdAt: new Date(), lastLogin: new Date(), role: "user",
    });
  };

  // 🔐 Email / Password Signup
  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true); setError("");
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: fullName });
      await persistUser(user, fullName);
      await sendEmailVerification(user);
      setVerifiedEmail(email);
      setVerificationSent(true);
    } catch (err) {
      setError(friendlyAuthError(err.code));
    } finally { setLoading(false); }
  };

  // 🌐 Social provider signup — already verified, go straight to dashboard
  const handleSocialSignup = async (provider) => {
    setLoading(true); setError("");
    try {
      const { user } = await signInWithPopup(auth, provider);
      await persistUser(user, user.displayName);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyAuthError(err.code));
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSignup(); };

  /* ── Verification sent screen ── */
  if (verificationSent) {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📬</div>
          <h1 className="title" style={{ fontSize: "1.8rem", letterSpacing: "2px" }}>Check Your Inbox</h1>
          <p className="subtitle" style={{ maxWidth: "280px", lineHeight: "1.6" }}>
            We've sent a verification link to{" "}
            <strong style={{ color: "#f5b942" }}>{verifiedEmail}</strong>.
            Click it to activate your account, then sign in.
          </p>
          <button className="signin" style={{ marginTop: "24px", width: "100%", padding: "12px" }}
            onClick={() => navigate("/login")}>
            Go to Sign In
          </button>
          <p className="forgot" style={{ marginTop: "16px", fontSize: "0.82rem" }}>
            Didn't receive it? Check your spam folder, or{" "}
            <span style={{ color: "#f5b942", cursor: "pointer" }}
              onClick={async () => {
                try { await sendEmailVerification(auth.currentUser); alert("Verification email resent!"); }
                catch { alert("Could not resend. Please try signing in again."); }
              }}>
              resend the email
            </span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Join TripCompass today</p>

        <div className="form">
          <div className="input-box">
            <input type="text" placeholder="Full Name" value={fullName}
              onChange={(e) => { clearError(); setFullName(e.target.value); }}
              onKeyDown={handleKeyDown} disabled={loading} />
            <span>👤</span>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => { clearError(); setEmail(e.target.value); }}
              onKeyDown={handleKeyDown} disabled={loading} />
            <span>📧</span>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password (min. 6 characters)" value={password}
              onChange={(e) => { clearError(); setPassword(e.target.value); }}
              onKeyDown={handleKeyDown} disabled={loading} />
            <span>🔒</span>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" value={confirmPassword}
              onChange={(e) => { clearError(); setConfirmPassword(e.target.value); }}
              onKeyDown={handleKeyDown} disabled={loading} />
            <span>🔑</span>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="buttons">
            <button className="signin" onClick={handleSignup} disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </div>

          {/* ── Social Icon Buttons ── */}
          <div className="social-divider">or sign up with</div>
          <div className="social-icons-row">
            <button className="social-icon-btn google" title="Sign up with Google" disabled={loading}
              onClick={() => handleSocialSignup(new GoogleAuthProvider())}>
              <GoogleIcon />
            </button>
            <button className="social-icon-btn facebook" title="Sign up with Facebook" disabled={loading}
              onClick={() => handleSocialSignup(new FacebookAuthProvider())}>
              <FacebookIcon />
            </button>
            <button className="social-icon-btn apple" title="Sign up with Apple" disabled={loading}
              onClick={() => handleSocialSignup(new OAuthProvider("apple.com"))}>
              <AppleIcon />
            </button>
            <button className="social-icon-btn twitter" title="Sign up with X (Twitter)" disabled={loading}
              onClick={() => handleSocialSignup(new TwitterAuthProvider())}>
              <TwitterIcon />
            </button>
          </div>

          <p className="forgot">Already have an account?</p>
          <p className="create">
            <span onClick={() => !loading && navigate("/login")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;