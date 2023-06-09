import { useParams } from "react-router-dom";
import Error from "./Error";
import { useEffect, useState } from "react";
import { getUser } from "../utils";
import Loading from "./Loading";

function UserPage() {
  const { username } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser(username)
      .then((userData) => {
        setSelectedUser(userData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="text-center mt-5">
      <div className="">
        <h1>{selectedUser.username}</h1>
        <img
          className="img-thumbnail shadow"
          src={`${selectedUser.avatar_url}`}
          alt="user avatar logo"
          style={{ clipPath: "circle()", width: "200px" }}
        ></img>
      </div>
    </main>
  );
}

export default UserPage;
