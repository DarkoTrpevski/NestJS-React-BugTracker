import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import AppLayout from './layouts/AppLayout/AppLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage';
import { loadCurrentUser } from './redux/auth/authActions';
import { Box } from '@chakra-ui/layout';
import ProtectedRoute from './routes/ProtectedRoute/ProtectedRoute';
import './App.css';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch])

  return (
    <Box w="full" className="App">
      <Router>
        <AppLayout>
          <Switch>

            <Route path={[`/login`, `/register`]}>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </Route>

            <ProtectedRoute path="/" exact Component={ProjectsPage} />
            <ProtectedRoute path="/projects/:projectId" exact Component={ProjectDetailsPage} />

          </Switch>
        </AppLayout>
      </Router>
    </Box>
  );
}

export default App;