import React, { useEffect } from "react";
import { auth, provider, signInWithPopup, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./Login.css";
import { CardCarousel } from "./components/Carosuel";
const images = [
  {
    src: "https://dalle3.ai/wp-content/uploads/2023/09/heart-square.jpg",
    alt: "Tiger in Flames",
  },
  {
    src: "https://dalle3.ai/wp-content/uploads/2023/09/captain.jpg",
    alt: "Peaceful Forest",
  },
  {
    src: "https://dalle3.ai/wp-content/uploads/2023/09/avocado-square-1536x1536.jpg",
    alt: "Ocean Dreams",
  },
  {
    src: "https://images.ctfassets.net/kftzwdyauwt9/zhG2ogG4dS14YXjWCkHGc/6d7a9a65e9b1748f76cb26a410d3dd8f/shipwreck.png?w=1920&q=90&fm=webp",
    alt: "Mountain Sunset",
  },
];

export default function Login({ setUser }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // If user exists in Firestore, setUser directly
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL,
          });
        }

        setUser(firebaseUser); // Skip login UI
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
        });
      }

      setUser(firebaseUser);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">🎨 Create Stunning AI-Generated Images</div>
        <p style={{ fontSize: "1rem", marginBottom: "2rem", color: "#555" }}>
          Bring your imagination to life in seconds!
        </p>
        <button
          className="button"
          onClick={handleGoogleLogin}
          onMouseEnter={(e) => (
            (e.currentTarget.style.backgroundColor = "#4285F4"),
            (e.currentTarget.style.color = "#fff")
          )}
          onMouseLeave={(e) => (
            (e.currentTarget.style.backgroundColor = "#fff"),
            (e.currentTarget.style.color = "#000")
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
          Continue with Google
        </button>
        <p style={{ marginTop: "1rem", color: "#666", fontSize: "0.9rem" }}>
          🔒 We respect your privacy. No spam, ever.
        </p>
      </div>

      <div className="main-image-section">
        <div className="main-image-container">
          <img
            src="https://images.ctfassets.net/kftzwdyauwt9/5JZsznv2kZBJhcntpSLEL9/fbe72de7edaceb8a44176170312ccf2a/picnic-cherry-tree.jpeg?w=1920&q=90&fm=webp"
            alt="Main AI Image"
            className="main-image"
          />
        </div>
        <h2 className="info-heading">
          This app is proudly built using DALL·E&nbsp;3, bringing you the latest
          in AI-powered image generation.
        </h2>
        <div className="info-container">
          <div className="info-block">
            <h3>Preventing harmful generations</h3>
            <p>
              DALL·E 3 has mitigations to decline requests that ask for a public
              figure by name. We improved safety performance in risk areas like
              generation of public figures and harmful biases related to visual
              over/under-representation, in partnership with red teamers—domain
              experts who stress-test the model—to help inform our risk
              assessment and mitigation efforts in areas like propaganda and
              misinformation.
            </p>
          </div>

          <div className="info-block">
            <h3>Internal testing</h3>
            <p>
              We’re also researching the best ways to help people identify when
              an image was created with AI. We’re experimenting with a
              provenance classifier—a new internal tool that can help us
              identify whether or not an image was generated by DALL·E 3— and
              hope to use this tool to better understand the ways generated
              images might be used. We’ll share more soon.
            </p>
          </div>
        </div>
        <CardCarousel
          images={images}
          autoplayDelay={3000}
          showPagination={true}
          showNavigation={true}
        />
      </div>

      {/* <div className="sub-images-container">
        <div className="sub-image-item">
          <img src="/public/logo.png" alt="Sub Image 1" className="sub-image" />
          <p className="image-caption">
            DALL-E 2: An expressive oil painting of a basketball player dunking,
            depicted as an explosion of a nebula.
          </p>
        </div>
        <div className="sub-image-item">
          <img src="/public/logo.png" alt="Sub Image 2" className="sub-image" />
          <p className="image-caption">
            DALL-E 3: An expressive oil painting of a basketball player dunking,
            depicted as an explosion of a nebula.
          </p>
        </div>
      </div> */}
    </>
  );
}
