import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header-Footer/Header.jsx";

function App() {
  return (
    <div className="w-full">
      <div className="w-full">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
