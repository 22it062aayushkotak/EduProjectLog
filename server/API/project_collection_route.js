import { Router as Route } from "express";
import { body } from "express-validator";
import {
  getAllProjects,
  getoneProject,
  createProject,
  updateProject,
  deleteProject,
} from "./Handlers/Project.js";
import { inputErrorHandler } from "./Module/middleware.js";
import cors from "cors";
import { protect } from "./Module/auth.js";

const router = Route();
router.use(cors());

router.get("/getallprojects", getAllProjects);

router.get("/project/:id", getoneProject);

router.post(
    "/project",
    [
        body("student_name").notEmpty().withMessage("Student name is required"),
        body("student_id").notEmpty().withMessage("Student ID is required"),
        body("project_name").notEmpty().withMessage("Project name is required"),
        body("project_category").notEmpty().withMessage("Project category is required"),
        body("project_description").notEmpty().withMessage("Project description is required"),
        body("faculty_name").notEmpty().withMessage("Faculty name is required"),        
    ],
    inputErrorHandler,
    protect,
    createProject
    );

router.put("project/:id",
    [
        body("student_name").optional(),
        body("student_id").optional(),
        body("project_name").optional(),
        body("project_category").optional(),
        body("project_description").optional(),
        body("project_link").optional(),
        body("faculty_name").optional(),     
    ],
    inputErrorHandler,
    protect, updateProject);

router.delete("project/:id", protect, deleteProject);




export default router;