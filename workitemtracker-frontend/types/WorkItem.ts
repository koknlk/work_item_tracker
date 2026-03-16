export interface WorkItem {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'InProgress' | 'Closed';
  createdAt: string;
}

export interface WorkItemSummary {
  id: string;
  title: string;
  totalSubtasks: number;
  completedSubtasks: number;
}

export interface CreateWorkItemDto {
  title: string;
  description: string;
  status: 'Open' | 'InProgress' | 'Closed';
}

export interface UpdateWorkItemDto {
  title: string;
  description: string;
  status: 'Open' | 'InProgress' | 'Closed';
}