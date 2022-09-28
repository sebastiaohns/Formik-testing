import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { FormFunctional } from "../Components/form_functional";
import { FormComponent } from "../Components/form_component";
import { onSubmit } from "../Utils/submit";
import { validate } from "../Utils/validate";

function AppRoutes() {
  return (
    <Router>
      <nav>
        <Link to="/">Functional</Link>
        <Link to="component">Component</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<FormFunctional onSubmit={onSubmit} validate={validate} />}
        />
        <Route
          path="component"
          element={<FormComponent onSubmit={onSubmit} validate={validate} />}
        />
      </Routes>
    </Router>
  );
}

export { AppRoutes };
