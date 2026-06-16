import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getProfile } from "./authService";

function Profile() {
  const { user, accessToken, isAuthenticated, logout } = useAuth();

  const [serverUser, setServerUser] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      setProfileError("");

      try {
        const data = await getProfile(accessToken);
        setServerUser(data.user);
      } catch (error) {
        setProfileError(error.message);
      } finally {
        setProfileLoading(false);
      }
    };

    if (isAuthenticated && accessToken) {
      fetchProfile();
    }
  }, [isAuthenticated, accessToken]);

  if (!isAuthenticated) {
    return <p>No user logged in</p>;
  }

  return (
    <div>
      <h2>Profile</h2>

      <h3>Local User</h3>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>Role:</strong> {user?.role}
      </p>

      <hr />

      <h3>Server Profile</h3>

      {profileLoading && <p>Loading profile...</p>}

      {profileError && <p>{profileError}</p>}

      {serverUser && (
        <>
          <p>
            <strong>Name:</strong> {serverUser.name}
          </p>

          <p>
            <strong>Email:</strong> {serverUser.email}
          </p>

          <p>
            <strong>Role:</strong> {serverUser.role}
          </p>
        </>
      )}

      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
