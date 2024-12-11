import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

import NotFound from "./components/not-found";
import CocktailCards from "./components/coctail-cards";

const App: React.FC = () => {
  const cocktailList = useSelector(
    (state: RootState) => state.cocktails.cocktailList,
  );
  const firstCocktail = cocktailList[0];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${firstCocktail}`} replace />}
        />
        <Route path="/:cocktailCode" element={<CocktailCards />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
