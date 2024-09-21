import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Profile = () => {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {message}</p>;
  }

  return (
    <>
      <h1>Profile</h1>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {/* <img src={`http://localhost:3001/${user.user_img}`} alt='' /> */}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </>
  );
};

export default Profile;


