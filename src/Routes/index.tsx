import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { FormFunctional } from "../Components/form_functional";
import { FormComponent } from "../Components/form_component";

function AppRoutes() {
  return (
    <Router>
      <nav>
        <Link to="/">Functional</Link>
        <Link to="component">Component</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FormFunctional />} />
        <Route path="component" element={<FormComponent />} />
      </Routes>
    </Router>
  );
}

export { AppRoutes };
