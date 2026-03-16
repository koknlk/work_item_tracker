import { WorkItem, WorkItemSummary, CreateWorkItemDto, UpdateWorkItemDto } from '../../types/WorkItem';
import { API_URL } from '../../utils/constants';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

export const getWorkItems = async (
  status: string = "Open",
  sort: string = "createdAt"
): Promise<WorkItem[]> => {

  const params = new URLSearchParams();

  if (status !== "") {
    params.append("status", status);
  }

  params.append("sort", sort);

  return fetchWithAuth(`${API_URL}/workitems?${params.toString()}`);
};

export const getWorkItemById = async (id: string): Promise<WorkItem> =>
  fetchWithAuth(`${API_URL}/workitems/${id}`); 

export const createWorkItem = async (dto: CreateWorkItemDto): Promise<WorkItem> =>
  fetchWithAuth(`${API_URL}/workitems`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });

export const updateWorkItem = async (id: string, dto: UpdateWorkItemDto): Promise<WorkItem> =>
  fetchWithAuth(`${API_URL}/workitems/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });

export const deleteWorkItem = async (id: string) =>
  fetchWithAuth(`${API_URL}/workitems/${id}`, { method: 'DELETE' });