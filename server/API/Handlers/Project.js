import ProjectCollection from "../Schema/projects.js";
import { validationResult } from "express-validator";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectCollection.find();
    res.status(200).json({projects, status: "success"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getoneProject = async (req, res) => {
  try {
    const project = await ProjectCollection.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({project, status: "success"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const project = req.body;
    const newProject = new ProjectCollection(project);
    await newProject.save();

    if (!newProject) {
      return res.status(404).json({ message: "Project not saved" });
    }

    res.status(201).json({newProject, status: "success"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectCollection.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await ProjectCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({updatedProject, status: "success"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectCollection.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await ProjectCollection.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" , status: "success"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
