import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Editor = () => {
  const { auth, setAuth } = useAuth();
  const [verified, setVerified] = useState(false);

  const onClickHandler = () => {
    if (auth?.accessToken) {
      // console.log(
      //   JSON.stringify({
      //     username: auth?.user,
      //     password: auth?.pwd,
      //     accessToken: auth?.accessToken
      //   })
      // );
      fetch("https://d7s2x6-8080.csb.app/verify", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data[0]?.username === auth?.user) {
            setVerified(true);
          } else {
            setAuth({});
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
      <div className="flexGrow">
        <button onClick={onClickHandler}>Verify token</button>
      </div>
      <div className="flexGrow">{verified ? "verified" : "Verify"}</div>
    </section>
  );
};

export default Editor;
