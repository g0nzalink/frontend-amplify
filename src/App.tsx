import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";
import PetProfilePage from "./pages/PetProfilePage";
import AdoptionRequestPage from "./pages/AdoptionRequestPage";
import RequestsPage from "./pages/RequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import CentersPage from "./pages/CentersPage";
import AdoptedPage from "./pages/AdoptedPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/pets/:id" element={<PetProfilePage />} />
        <Route path="/pets/:id/apply" element={<AdoptionRequestPage />} />
        <Route path="/my-requests" element={<RequestsPage />} />
        <Route path="/my-requests/:id" element={<RequestDetailPage />} />
        <Route path="/centers" element={<CentersPage />} />
        <Route path="/adopted" element={<AdoptedPage />} />
      </Routes>
    </>
  );
}

export default App;
