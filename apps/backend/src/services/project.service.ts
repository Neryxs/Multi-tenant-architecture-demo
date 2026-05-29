import * as projectRepository from '../repositories/project.repository';
import { createAuditLog } from '../repositories/audit.repository';

export const getProjects = async (tenantId: string) => {
  return projectRepository.getProjectsByTenant(tenantId);
};

export const createProject = async (data: any, userId: string, tenantId: string) => {
  const project = await projectRepository.createProject({ ...data, tenantId });
  await createAuditLog('CREATE_PROJECT', userId, tenantId, { projectId: project.id });
  return project;
};

export const updateProject = async (id: string, data: any, userId: string, tenantId: string) => {
  const project = await projectRepository.updateProject(id, { ...data, tenantId });
  await createAuditLog('UPDATE_PROJECT', userId, tenantId, { projectId: project.id });
  return project;
};

export const deleteProject = async (id: string, userId: string, tenantId: string) => {
  const project = await projectRepository.deleteProject(id);
  await createAuditLog('DELETE_PROJECT', userId, tenantId, { projectId: project.id });
  return project;
};
