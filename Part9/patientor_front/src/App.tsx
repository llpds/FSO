import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { useAppDispatch } from "./store";
import { initializePatients } from "./reducers/patientReducer";
import { initializeDiagnoses } from "./reducers/diagnoseReducer";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    dispatch(initializePatients());
    dispatch(initializeDiagnoses());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/:id" element={<PatientPage />} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
