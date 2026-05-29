import { Request, Response } from 'express';
import * as projectService from '../services/project.service';

export const getProjects = async (req: Request, res: Response) => {
  const projects = await projectService.getProjects(req.tenant!.id);
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body, req.user!.id, req.tenant!.id);
  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const project = await projectService.updateProject(id, req.body, req.user!.id, req.tenant!.id);
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await projectService.deleteProject(id, req.user!.id, req.tenant!.id);
  res.status(204).send();
};
