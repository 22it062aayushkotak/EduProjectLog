import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import './ViewProject.css'; // Import the CSS file
import { Card, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { format } from "date-fns"; // Import date-fns for date formatting

const ViewProject = ({ name }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchdata();
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const columns = [
    { field: 'student_name', headerName: 'Student Name', width: 200 },
    { field: 'student_id', headerName: 'Student ID', width: 150 },
    { field: 'faculty_name', headerName: 'Faculty Name', width: 200 },
    { field: 'project_name', headerName: 'Project Name', width: 200 },
    { field: 'project_category', headerName: 'Project Category', width: 200 },
    { field: 'project_link', headerName: 'Project Link', width: 200 },
    { field: 'project_description', headerName: 'Project Description', width: 200 },
    {
      field: 'created_at',
      headerName: 'Date Created',
      width: 180,
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Button
    //       variant="danger"
    //       onClick={() => handleDelete(params.row.id)}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
  ];

  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/projects/getallprojects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      const projectsWithId = data.projects.map((project) => ({
        ...project,
        id: project._id,
        created_at: format(new Date(project.created_at), 'MM/dd/yyyy'), // Format the date here
      }));

      setRows(projectsWithId);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/project/${id}`, {
        method: "DELETE",       
      });

      console.log(response);

      if (response.status === "success") {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        alert("Project deleted successfully");
      } else {
        alert("Failed to delete the project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project");
    }
  };

  return (
    <div>
      <TopNavbar name={name} />
      <Card
        style={{
          width: "98%",
          margin: "auto",
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "white",
          color: "black",
          border: "3px solid lightblue",
          borderRadius: "10px",
        
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          className="data-grid"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slotProps={{
            loadingOverlay: {
              noRowsVariant: 'skeleton',                            
            },
          }}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              padding: '10px',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f0f8ff',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #e0e0e0',
            },
          }}
        />
      </Card>
    </div>
  );
};

export default ViewProject;
