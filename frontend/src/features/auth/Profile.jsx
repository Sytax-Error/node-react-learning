import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getProfile } from "./authService";
import Button from "../../components/ui/Button";

function Profile() {
  const { user, isAuthenticated, logout } = useAuth();

  const [serverUser, setServerUser] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      setProfileError("");

      try {
        const data = await getProfile();
        setServerUser(data.user);
      } catch (error) {
        setProfileError(error.message);
      } finally {
        setProfileLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>No user logged in</p>;
  }

  return (
    <main className="profile-page">
      <section className="profile-header">
        <p className="section-label">Account</p>
        <h1>My Profile</h1>
        <p className="section-description">
          View your local auth state and verified server profile.
        </p>
      </section>

      <section className="profile-grid">
        <div className="profile-card">
          <h3>Local User</h3>
          <p className="profile-card-subtitle">
            This data comes from AuthContext and localStorage.
          </p>

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <span>Role</span>
              <strong>{user?.role}</strong>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h3>Server Profile</h3>
          <p className="profile-card-subtitle">
            This data comes from protected backend API.
          </p>

          {profileLoading && (
            <p className="profile-muted">Loading profile...</p>
          )}

          {profileError && <p className="profile-error">{profileError}</p>}

          {serverUser && (
            <div className="profile-info">
              <div>
                <span>Name</span>
                <strong>{serverUser.name}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{serverUser.email}</strong>
              </div>

              <div>
                <span>Role</span>
                <strong>{serverUser.role}</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      <Button variant="solid-danger" onClick={logout}>
        Logout
      </Button>
    </main>
  );
}

export default Profile;
