import React, { useEffect } from "react";
import TopNavbar from "./TopNavbar";
import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

const AddProject = ({ name }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const addproject = async () => {
      const student_name = form[0].value;
      const student_id = form[1].value;
      const faculty_name = form[2].value;
      const project_name = form[3].value;
      const project_category = form[4].value;
      const project_link = form[5].value;
      const project_description = form[6].value;

      const project = {
        student_name,
        student_id,
        faculty_name,
        project_name,
        project_category,
        project_link,
        project_description,
      };

      const response = await fetch(
        "http://localhost:3001/api/projects/project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(project),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        alert("Project Added Successfully");
        form.reset();
      } else {
        alert("Project not Added");
        console.log(data);
      }
    };

    if (form.checkValidity() === true) {
      event.preventDefault();
      addproject();
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
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          border: "3px solid lightblue",
          borderRadius: "10px",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "lightblue",
            color: "black",
            fontWeight: "bold",
            padding: "10px",
            margin: "5px",
            fontSize: "30px",
            borderRadius: "5px",
          }}
        >
          Add Project
        </Card.Header>
        <Card.Body>
          <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Student name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Student Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter Stdent Name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control required type="text" placeholder="22it122" />
                  <Form.Control.Feedback type="invalid">
                    Enter Valid Student id
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Faucty Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Faucty Name"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Enter a Faucty Name.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Project Name"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid project name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  <Form.Label>Project Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Billig System"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid project category.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom05">
                  <Form.Label>Project Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Project Link"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid project link.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom06">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Project Description"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid project description.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit">Add Project</Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddProject;
