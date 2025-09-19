// // // // // import { useState } from "react";

// // // // // function App() {
// // // // //   const [name, setName] = useState("");
// // // // //   const [email, setEmail] = useState("");
// // // // //   const [consent, setConsent] = useState(false);
// // // // //   const [msg, setMsg] = useState(null);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   async function handleRegister(e) {
// // // // //     e.preventDefault();
// // // // //     if (!consent) {
// // // // //       setMsg("Please give consent to collect IP & location.");
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await fetch("/api/register", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ name, email, consent }),
// // // // //       });

// // // // //       const j = await res.json();
// // // // //       if (!res.ok) throw new Error(j.message || "Registration failed");

// // // // //       setMsg(
// // // // //         `✅ Registered! Approx location: ${
// // // // //           j.location.city ||
// // // // //           j.location.region ||
// // // // //           j.location.country ||
// // // // //           "Unknown"
// // // // //         }`
// // // // //       );

// // // // //       // Reset form
// // // // //       setName("");
// // // // //       setEmail("");
// // // // //       setConsent(false);
// // // // //     } catch (err) {
// // // // //       setMsg("❌ Error: " + err.message);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div style={{ maxWidth: 500, margin: "3rem auto", fontFamily: "sans-serif" }}>
// // // // //       <h1>Register</h1>
// // // // //       <form onSubmit={handleRegister}>
// // // // //         <label>
// // // // //           Name <br />
// // // // //           <input
// // // // //             value={name}
// // // // //             onChange={(e) => setName(e.target.value)}
// // // // //             required
// // // // //           />
// // // // //         </label>
// // // // //         <br /><br />
// // // // //         <label>
// // // // //           Email <br />
// // // // //           <input
// // // // //             type="email"
// // // // //             value={email}
// // // // //             onChange={(e) => setEmail(e.target.value)}
// // // // //             required
// // // // //           />
// // // // //         </label>
// // // // //         <br /><br />
// // // // //         <label style={{ display: "flex", gap: 10 }}>
// // // // //           <input
// // // // //             type="checkbox"
// // // // //             checked={consent}
// // // // //             onChange={(e) => setConsent(e.target.checked)}
// // // // //           />
// // // // //           I consent to collection of my IP and location.
// // // // //         </label>
// // // // //         <br />
// // // // //         <button type="submit" disabled={loading}>
// // // // //           {loading ? "Registering..." : "Register"}
// // // // //         </button>
// // // // //       </form>
// // // // //       {msg && <p style={{ marginTop: 20 }}>{msg}</p>}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;












// // // // import { useState } from "react";
// // // // import "./App.css";

// // // // function App() {
// // // //   const [name, setName] = useState("");
// // // //   const [email, setEmail] = useState("");
// // // //   const [consent, setConsent] = useState(false);
// // // //   const [msg, setMsg] = useState(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   async function handleRegister(e) {
// // // //     e.preventDefault();
// // // //     if (!consent) {
// // // //       setMsg("❌ Please consent to location collection.");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setMsg(null);

// // // //     function getPosition(options = {}) {
// // // //       return new Promise((resolve, reject) => {
// // // //         if (!navigator.geolocation) {
// // // //           return reject(new Error("Geolocation not supported"));
// // // //         }
// // // //         navigator.geolocation.getCurrentPosition(resolve, reject, options);
// // // //       });
// // // //     }

// // // //     try {
// // // //       const pos = await getPosition({
// // // //         enableHighAccuracy: true,
// // // //         timeout: 15000,
// // // //         maximumAge: 0,
// // // //       });

// // // //       const latitude = pos.coords.latitude;
// // // //       const longitude = pos.coords.longitude;

// // // //       const res = await fetch("http://localhost:4000/api/register", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ name, email, consent, latitude, longitude }),
// // // //       });

// // // //       const j = await res.json();
// // // //       if (!res.ok) throw new Error(j.message || "Registration failed");

// // // //       setMsg(
// // // //         `✅ Registered! Location: ${j.address || `${latitude}, ${longitude}`}`
// // // //       );

// // // //       setName("");
// // // //       setEmail("");
// // // //       setConsent(false);
// // // //     } catch (err) {
// // // //       if (err.code === 1) {
// // // //         setMsg("❌ Permission denied. Allow location access to continue.");
// // // //       } else if (err.code === 3) {
// // // //         setMsg("⚠️ Location request timed out.");
// // // //       } else {
// // // //         setMsg("Error: " + err.message);
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="App">
// // // //       <h1>User Registration</h1>
// // // //       <form onSubmit={handleRegister}>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Name"
// // // //           value={name}
// // // //           onChange={(e) => setName(e.target.value)}
// // // //           required
// // // //         />
// // // //         <input
// // // //           type="email"
// // // //           placeholder="Email"
// // // //           value={email}
// // // //           onChange={(e) => setEmail(e.target.value)}
// // // //           required
// // // //         />
// // // //         <label>
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={consent}
// // // //             onChange={(e) => setConsent(e.target.checked)}
// // // //           />{" "}
// // // //           I consent to collection of my IP and exact location.
// // // //         </label>
// // // //         <button type="submit" disabled={loading}>
// // // //           {loading ? "Registering..." : "Register"}
// // // //         </button>
// // // //       </form>
// // // //       {msg && <p>{msg}</p>}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;


























// // // import { useState } from 'react';
// // // import 'bootstrap/dist/css/bootstrap.min.css';

// // // const Login = () => {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [showPassword, setShowPassword] = useState(false);

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     console.log('Login attempt with:', { email, password });
// // //     // Add your existing login logic here
// // //   };

// // //   return (
// // //     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
// // //       <div className="bg-white rounded-3 shadow-lg p-4 p-md-5 w-100" style={{ maxWidth: '400px' }}>
// // //         <h1 className="text-center mb-4 fw-bold">Welcome Back</h1>
// // //         <p className="text-center text-muted mb-4">Sign in to your account</p>

// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-3">
// // //             <label htmlFor="email" className="form-label fw-medium">
// // //               Email Address
// // //             </label>
// // //             <input
// // //               id="email"
// // //               type="email"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               required
// // //               className="form-control"
// // //               placeholder="Enter your email"
// // //             />
// // //           </div>

// // //           <div className="mb-3">
// // //             <label htmlFor="password" className="form-label fw-medium">
// // //               Password
// // //             </label>
// // //             <div className="input-group">
// // //               <input
// // //                 id="password"
// // //                 type={showPassword ? 'text' : 'password'}
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 required
// // //                 className="form-control"
// // //                 placeholder="Enter your password"
// // //               />
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowPassword(!showPassword)}
// // //                 className="btn btn-outline-secondary"
// // //                 aria-label={showPassword ? 'Hide password' : 'Show password'}
// // //               >
// // //                 {showPassword ? (
// // //                   <svg className="bi" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
// // //                     <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.211.135-.52.165-.756.165l.669.669zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
// // //                     <path d="M1.5 1.5l13 13" stroke="currentColor" strokeWidth="1.5" />
// // //                   </svg>
// // //                 ) : (
// // //                   <svg className="bi" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
// // //                     <path d="M8 1a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
// // //                   </svg>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <button type="submit" className="btn btn-primary w-100 mb-3">
// // //             Sign In
// // //           </button>
// // //         </form>

// // //         <div className="text-center">
// // //           <a href="/forgot-password" className="text-primary text-decoration-none small">
// // //             Forgot Password?
// // //           </a>
// // //         </div>
// // //         <div className="text-center mt-2">
// // //           <p className="small text-muted">
// // //             Don't have an account?{' '}
// // //             <a href="/signup" className="text-primary text-decoration-none">
// // //               Sign Up
// // //             </a>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;


























// // import { useState } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // function App() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);

// //   const [consent, setConsent] = useState(false);
// //   const [msg, setMsg] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // helper to wrap geolocation in a Promise
// //   function getPosition(options = {}) {
// //     return new Promise((resolve, reject) => {
// //       if (!navigator.geolocation) {
// //         return reject(new Error("Geolocation not supported"));
// //       }
// //       navigator.geolocation.getCurrentPosition(resolve, reject, options);
// //     });
// //   }

// //   // Handle login
// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     if (!consent) {
// //       setMsg("❌ Please consent to location collection.");
// //       return;
// //     }

// //     setLoading(true);
// //     setMsg(null);

// //     try {
// //       const pos = await getPosition({
// //         enableHighAccuracy: true,
// //         timeout: 15000,
// //         maximumAge: 0,
// //       });

// //       const latitude = pos.coords.latitude;
// //       const longitude = pos.coords.longitude;

// //       const res = await fetch("http://localhost:4000/api/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password, consent, latitude, longitude }),
// //       });

// //       const j = await res.json();
// //       if (!res.ok) throw new Error(j.message || "Login failed");

// //       setMsg(
// //         `✅ Logged in! Location: ${j.address || `${latitude}, ${longitude}`}`
// //       );

// //       setEmail("");
// //       setPassword("");
// //       setConsent(false);
// //     } catch (err) {
// //       if (err.code === 1) {
// //         setMsg("❌ Permission denied. Allow location access to continue.");
// //       } else if (err.code === 3) {
// //         setMsg("⚠️ Location request timed out.");
// //       } else {
// //         setMsg("Error: " + err.message);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
// //       <div
// //         className="bg-white rounded-3 shadow-lg p-4 p-md-5 w-100"
// //         style={{ maxWidth: "400px" }}
// //       >
// //         <h1 className="text-center mb-4 fw-bold">Welcome Back</h1>
// //         <p className="text-center text-muted mb-4">Sign in to your account</p>

// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label htmlFor="email" className="form-label fw-medium">
// //               Email Address
// //             </label>
// //             <input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               className="form-control"
// //               placeholder="Enter your email"
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label htmlFor="password" className="form-label fw-medium">
// //               Password
// //             </label>
// //             <div className="input-group">
// //               <input
// //                 id="password"
// //                 type={showPassword ? "text" : "password"}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //                 className="form-control"
// //                 placeholder="Enter your password"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="btn btn-outline-secondary"
// //                 aria-label={showPassword ? "Hide password" : "Show password"}
// //               >
// //                 {showPassword ? (
// //                   <svg
// //                     className="bi"
// //                     width="16"
// //                     height="16"
// //                     fill="currentColor"
// //                     viewBox="0 0 16 16"
// //                   >
// //                     <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.211.135-.52.165-.756.165l.669.669zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
// //                     <path
// //                       d="M1.5 1.5l13 13"
// //                       stroke="currentColor"
// //                       strokeWidth="1.5"
// //                     />
// //                   </svg>
// //                 ) : (
// //                   <svg
// //                     className="bi"
// //                     width="16"
// //                     height="16"
// //                     fill="currentColor"
// //                     viewBox="0 0 16 16"
// //                   >
// //                     <path d="M8 1a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
// //                   </svg>
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           <div className="form-check mb-3">
// //             <input
// //               className="form-check-input"
// //               type="checkbox"
// //               id="consent"
// //               checked={consent}
// //               onChange={(e) => setConsent(e.target.checked)}
// //             />
// //             <label className="form-check-label small" htmlFor="consent">
// //               I consent to collection of my IP and exact location.
// //             </label>
// //           </div>

// //           <button
// //             type="submit"
// //             className="btn btn-primary w-100 mb-3"
// //             disabled={loading}
// //           >
// //             {loading ? "Signing in..." : "Sign In"}
// //           </button>
// //         </form>

// //         {msg && (
// //           <div className="alert alert-info text-center small" role="alert">
// //             {msg}
// //           </div>
// //         )}

// //         <div className="text-center">
// //           <a
// //             href="/forgot-password"
// //             className="text-primary text-decoration-none small"
// //           >
// //             Forgot Password?
// //           </a>
// //         </div>
// //         <div className="text-center mt-2">
// //           <p className="small text-muted">
// //             Don&apos;t have an account?{" "}
// //             <a href="/signup" className="text-primary text-decoration-none">
// //               Sign Up
// //             </a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;





















































// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [consent, setConsent] = useState(false);
//   const [msg, setMsg] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // wrap geolocation in a Promise
//   function getPosition(options = {}) {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         return reject(new Error("Geolocation not supported"));
//       }
//       navigator.geolocation.getCurrentPosition(resolve, reject, options);
//     });
//   }

//   // Handle login
//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!consent) {
//       setMsg("❌ Please consent to location collection.");
//       return;
//     }

//     setLoading(true);
//     setMsg(null);

//     try {
//       const pos = await getPosition({
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 0,
//       });

//       const latitude = pos.coords.latitude;
//       const longitude = pos.coords.longitude;

//       const res = await fetch("http://localhost:4000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, consent, latitude, longitude }),
//       });

//       const j = await res.json();
//       if (!res.ok) throw new Error(j.message || "Login failed");

//       setMsg(
//         `✅ Logged in! Location: ${j.address || `${latitude}, ${longitude}`}`
//       );

//       setEmail("");
//       setPassword("");
//       setConsent(false);
//     } catch (err) {
//       if (err.code === 1) {
//         setMsg("❌ Permission denied. Allow location access to continue.");
//       } else if (err.code === 3) {
//         setMsg("⚠️ Location request timed out.");
//       } else {
//         setMsg("Error: " + err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div
//         className="bg-white rounded-3 shadow-lg p-4 p-md-5 w-100"
//         style={{ maxWidth: "400px" }}
//       >
//         <h1 className="text-center mb-4 fw-bold">Welcome Back</h1>
//         <p className="text-center text-muted mb-4">Sign in to your account</p>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label fw-medium">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-control"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label fw-medium">
//               Password
//             </label>
//             <div className="input-group">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="form-control"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="btn btn-outline-secondary"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <svg
//                     className="bi"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.211.135-.52.165-.756.165l.669.669zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
//                     <path
//                       d="M1.5 1.5l13 13"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="bi"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M8 1a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="form-check mb-3">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="consent"
//               checked={consent}
//               onChange={(e) => setConsent(e.target.checked)}
//             />
//             <label className="form-check-label small" htmlFor="consent">
//               I consent to collection of my IP and exact location.
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100 mb-3"
//             disabled={loading}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         {msg && (
//           <div className="alert alert-info text-center small" role="alert">
//             {msg}
//           </div>
//         )}

//         <div className="text-center">
//           <a
//             href="/forgot-password"
//             className="text-primary text-decoration-none small"
//           >
//             Forgot Password?
//           </a>
//         </div>
//         <div className="text-center mt-2">
//           <p className="small text-muted">
//             Don&apos;t have an account?{" "}
//             <a href="/signup" className="text-primary text-decoration-none">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;












































  // import { useState } from "react";
  // import "bootstrap/dist/css/bootstrap.min.css";
  // import "./App.css";

  // function App() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [consent, setConsent] = useState(false);
  //   const [msg, setMsg] = useState(null);
  //   const [loading, setLoading] = useState(false);
  //   const [coords, setCoords] = useState(null);

  //   // Geolocation wrapper
  //   function getPosition(options = {}) {
  //     return new Promise((resolve, reject) => {
  //       if (!navigator.geolocation) {
  //         return reject(new Error("Geolocation not supported"));
  //       }
  //       navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //     });
  //   }

  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     if (!consent) {
  //       setMsg("❌ Please consent to location collection.");
  //       return;
  //     }

  //     setLoading(true);
  //     setMsg(null);

  //     try {
  //       const pos = await getPosition({
  //         enableHighAccuracy: true,
  //         timeout: 15000,
  //         maximumAge: 0,
  //       });

  //       const latitude = pos.coords.latitude;
  //       const longitude = pos.coords.longitude;
  //       setCoords({ latitude, longitude });

  //       const res = await fetch("http://localhost:4000/api/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email, password, consent, latitude, longitude }),
  //       });

  //       const j = await res.json();
  //       if (!res.ok) throw new Error(j.message || "Login failed");

  //       setMsg(
  //         `✅ Logged in! Location: ${j.address || `${latitude.toFixed(
  //           6
  //         )}, ${longitude.toFixed(6)}`}`
  //       );

  //       setEmail("");
  //       setPassword("");
  //       setConsent(false);
  //       setCoords(null);
  //     } catch (err) {
  //       if (err.code === 1) {
  //         setMsg("❌ Permission denied. Allow location access to continue.");
  //       } else if (err.code === 3) {
  //         setMsg("⚠️ Location request timed out.");
  //       } else {
  //         setMsg("Error: " + err.message);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   return (
  //     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  //       <div className="bg-white rounded-3 shadow-lg p-4 p-md-5 w-100" style={{ maxWidth: "400px" }}>
  //         <h1 className="text-center mb-4 fw-bold">Welcome Back</h1>
  //         <p className="text-center text-muted mb-4">Sign in to your account</p>

  //         <form onSubmit={handleSubmit}>
  //           <div className="mb-3">
  //             <label htmlFor="email" className="form-label fw-medium">
  //               Email Address
  //             </label>
  //             <input
  //               id="email"
  //               type="email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               required
  //               className="form-control"
  //               placeholder="Enter your email"
  //             />
  //           </div>

  //           <div className="mb-3">
  //             <label htmlFor="password" className="form-label fw-medium">
  //               Password
  //             </label>
  //             <div className="input-group">
  //               <input
  //                 id="password"
  //                 type={showPassword ? "text" : "password"}
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //                 className="form-control"
  //                 placeholder="Enter your password"
  //               />
  //               <button
  //                 type="button"
  //                 onClick={() => setShowPassword(!showPassword)}
  //                 className="btn btn-outline-secondary"
  //                 aria-label={showPassword ? "Hide password" : "Show password"}
  //               >
  //                 {showPassword ? "Hide" : "Show"}
  //               </button>
  //             </div>
  //           </div>

  //           <div className="form-check mb-3">
  //             <input
  //               className="form-check-input"
  //               type="checkbox"
  //               id="consent"
  //               checked={consent}
  //               onChange={(e) => setConsent(e.target.checked)}
  //             />
  //             <label className="form-check-label small" htmlFor="consent">
  //               I consent to collection of my IP and exact location.
  //             </label>
  //           </div>

  //           <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
  //             {loading ? "Signing in..." : "Sign In"}
  //           </button>
  //         </form>

  //         {msg && (
  //           <div className={`alert ${msg.startsWith("✅") ? "alert-success" : "alert-danger"} text-center small`} role="alert">
  //             {msg}
  //           </div>
  //         )}

  //         {coords && (
  //           <div className="text-center mt-2 small text-muted">
  //             Latitude: {coords.latitude.toFixed(6)}, Longitude: {coords.longitude.toFixed(6)}
  //           </div>
  //         )}

  //         <div className="text-center">
  //           <a href="/forgot-password" className="text-primary text-decoration-none small">
  //             Forgot Password?
  //           </a>
  //         </div>
  //         <div className="text-center mt-2">
  //           <p className="small text-muted">
  //             Don&apos;t have an account?{" "}
  //             <a href="/signup" className="text-primary text-decoration-none">
  //               Sign Up
  //             </a>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // export default App;















import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);

  // Geolocation wrapper
  function getPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation not supported"));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!consent) {
      setMsg("❌ Please consent to location collection.");
      return;
    }

    setLoading(true);
    setMsg(null);

    let latitude = null;
    let longitude = null;

    try {
      const pos = await getPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;
      setCoords({ latitude, longitude });
    } catch (err) {
      if (err.code === 1) {
        setMsg("❌ Permission denied. Allow location access to continue.");
      } else if (err.code === 3) {
        setMsg("⚠️ Location request timed out.");
      } else {
        setMsg("⚠️ Geolocation error: " + err.message);
      }
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, consent, latitude, longitude }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response: " + text);
      }

      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMsg(
        `✅ Registered! Location: ${data.address || `${latitude.toFixed(
          6
        )}, ${longitude.toFixed(6)}`}`
      );

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConsent(false);
      setCoords(null);
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="bg-white rounded-3 shadow-lg p-4 p-md-5 w-100"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4 fw-bold">Register</h1>
        <p className="text-center text-muted mb-4">Create your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-medium">
              Password
            </label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="Enter a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-outline-secondary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label className="form-check-label small" htmlFor="consent">
              Verify you're a human by clicking this checkbox.
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
{/* 
        {msg && (
          <div
            className={`alert ${
              msg.startsWith("✅") ? "alert-success" : "alert-danger"
            } text-center small`}
            role="alert"
          >
            {msg}
          </div>
        )}

        {coords && (
          <div className="text-center mt-2 small text-muted">
            Latitude: {coords.latitude.toFixed(6)}, Longitude:{" "}
            {coords.longitude.toFixed(6)}
          </div>
        )} */}

        <div className="text-center mt-2">
          <p className="small text-muted">
            Already have an account?{" "}
            <a href="/login" className="text-primary text-decoration-none">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;