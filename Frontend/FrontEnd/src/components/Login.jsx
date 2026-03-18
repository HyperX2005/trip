import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
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

/* ── Map Firebase error codes to friendly messages ── */
function friendlyAuthError(code) {
  switch (code) {
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "No account found with those details. Please check and try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled. Please try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(null);
  const [resendSent, setResendSent] = useState(false);

  const handleEmailChange = (e) => { setError(""); setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setError(""); setPassword(e.target.value); };

  const persistUser = async (user) => {
    await setDoc(
      doc(db, "users", user.uid),
      { email: user.email, displayName: user.displayName || "", lastLogin: new Date(), role: "user" },
      { merge: true }
    );
  };

  // 🔐 Email Login
  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError(""); setUnverifiedUser(null);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user.emailVerified) { setUnverifiedUser(user); setLoading(false); return; }
      await persistUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyAuthError(err.code));
    } finally { setLoading(false); }
  };

  // 🌐 Social provider login
  const handleSocialLogin = async (provider) => {
    setLoading(true); setError(""); setUnverifiedUser(null);
    try {
      const { user } = await signInWithPopup(auth, provider);
      await persistUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyAuthError(err.code));
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (!unverifiedUser) return;
    try { await sendEmailVerification(unverifiedUser); setResendSent(true); }
    catch { setError("Could not resend. Please try again in a moment."); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  /* ── Unverified screen ── */
  if (unverifiedUser) {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✉️</div>
          <h1 className="title" style={{ fontSize: "1.8rem", letterSpacing: "2px" }}>Verify Your Email</h1>
          <p className="subtitle" style={{ maxWidth: "280px", lineHeight: "1.6" }}>
            Your email <strong style={{ color: "#f5b942" }}>{unverifiedUser.email}</strong> hasn't been verified yet.
            Please click the link we sent you.
          </p>
          {resendSent ? (
            <p style={{ color: "#4caf50", marginTop: "16px", fontSize: "0.9rem" }}>✅ Verification email resent! Check your inbox.</p>
          ) : (
            <button className="signin" style={{ marginTop: "20px", width: "100%", padding: "12px" }} onClick={handleResend}>
              Resend Verification Email
            </button>
          )}
          <button className="signin" style={{ marginTop: "12px", width: "100%", padding: "12px", background: "transparent", border: "1px solid #555" }}
            onClick={() => { setUnverifiedUser(null); setResendSent(false); }}>
            ← Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="title">TRIPCOMPASS</h1>
        <p className="subtitle">Explore smart. Travel safe.</p>

        <div className="form">
          <div className="input-box">
            <input type="email" placeholder="Email" value={email}
              onChange={handleEmailChange} onKeyDown={handleKeyDown} disabled={loading} />
            <span>📧</span>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" value={password}
              onChange={handlePasswordChange} onKeyDown={handleKeyDown} disabled={loading} />
            <span>🔒</span>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="buttons">
            <button className="signin" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>

          {/* ── Social Icon Buttons ── */}
          <div className="social-divider">or continue with</div>
          <div className="social-icons-row">
            <button className="social-icon-btn google" title="Sign in with Google" disabled={loading}
              onClick={() => handleSocialLogin(new GoogleAuthProvider())}>
              <GoogleIcon />
            </button>
            <button className="social-icon-btn facebook" title="Sign in with Facebook" disabled={loading}
              onClick={() => handleSocialLogin(new FacebookAuthProvider())}>
              <FacebookIcon />
            </button>
            <button className="social-icon-btn apple" title="Sign in with Apple" disabled={loading}
              onClick={() => handleSocialLogin(new OAuthProvider("apple.com"))}>
              <AppleIcon />
            </button>
            <button className="social-icon-btn twitter" title="Sign in with X (Twitter)" disabled={loading}
              onClick={() => handleSocialLogin(new TwitterAuthProvider())}>
              <TwitterIcon />
            </button>
          </div>

          <p className="create">
            New here?{" "}
            <span onClick={() => !loading && navigate("/signup")}>Create Account</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;