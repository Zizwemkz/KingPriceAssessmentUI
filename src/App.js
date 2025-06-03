import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import EmployeePage from "./components/EmployeeList";
import RolesPage from "./pages/RolesPage";
import EmployeeForm from "./pages/EmployeeForm"; 
import EmployeeDetails from "./components/EmployeeDetails"; 
import DepartmentPage from "./pages/DepartmentPage";
import SearchPage from "./pages/SearchPage";
import EmployeeAllocationPage from "./pages/EmployeeAllocationPage";
import DepartmentEmployeePage from "./pages/DepartmentEmployeePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <div className="app-root page-content">
        <Routes>
          {/* No need for "/" route for just navigation anymore */}
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/EmployeeList" element={<EmployeePage />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/view/:id" element={<EmployeeDetails />} />
          <Route path="/employee-allocation" element={<EmployeeAllocationPage />} />
          <Route path="/employees-by-department" element={<DepartmentEmployeePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;