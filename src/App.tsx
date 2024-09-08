import MainPageView from "./pages/main";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserDetails from "./pages/userDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageView />} />
        <Route path="/:user" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
