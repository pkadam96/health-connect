import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { AllRoutes } from "./router/AllRoutes";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AllRoutes />
    </AuthProvider>
  );
}

export default App;
