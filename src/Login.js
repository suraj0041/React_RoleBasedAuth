import { useRef, useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserData from "./UserData.json";

export default function Login() {
  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let FoundUser = UserData.filter(
      (u) => u.username === user && u.password === pwd
    );
    console.table(`FoundUser:${FoundUser}`);
    if (FoundUser.length > 0) {
      let role = FoundUser[0]?.role;
      let accessToken = "accessToken";
      console.log(from, user, pwd, role);
      setAuth({ user, pwd, role, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    }
  };
  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="#">Sign Up</a>
          </span>
        </p>
      </section>
    </>
  );
}
