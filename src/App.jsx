import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect ,logout, isAuthenticated, user, isLoading} = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <>
    {
      !isAuthenticated?
      <button className="bg-black text-white" onClick={() => loginWithRedirect()}>Log In</button>:
      <button className="bg-black text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    }
    <h1 className="text-[4rem]">Hello, {isAuthenticated && `${user.name}!`} </h1>
    </>
  );
}
export default App;