
interface Label {
    id: string;
    name: string;
    color: string;
    userId: string;
    taskId: string[];
}

interface Project {
    id: string
    name: string;
    userId: string;
}

interface Task {
    id: string;
    task: string;
    projectId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    startTime: string
    endTime: string;
}

export type { Label, Project, Task };