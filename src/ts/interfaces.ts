
interface Label {
    id: string;
    name: string;
    color: string;
    userId: string;
    taskId: string[];
}

interface CreateLabel {
    name: string;
    color: string;
    userId: string;
}

interface CreateTaskLabel {
  labelId: string;
  taskId: string;
}

interface TaskLabel {
  id: string;
  labelId: string;
  taskId: string;
}

enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

interface Project {
    id: string
    name: string;
    userId: string;
    priority: Priority | null;
    description: string;
}

interface Task {
    id: string;
    name: string;
    cost: number;
    projectId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    startTime: string
    endTime: string;
}

interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string | null;
    launchYear: string | null;
    types: string[];
}

export type { Label, CreateLabel, CreateTaskLabel, TaskLabel, Priority, Project, Task, Holiday };
