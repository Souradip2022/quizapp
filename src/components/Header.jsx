import useApp from "../context/context_provider.js";

function Header() {
  const {status} = useApp();
  return (<>
      {status !== "response" ?
        <header className="app-header">
          <img src="logo.png" alt="React logo"/>
          <h1>The React Quiz</h1>
        </header> :
        <h1>👨‍🎓 Your Response 👨‍🎓</h1>}
    </>
  );
}

export default Header;
