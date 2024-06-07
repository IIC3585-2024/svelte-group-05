import { parse, format, startOfWeek, endOfWeek, compareDesc } from 'date-fns';

interface Task {
    startTime: string;
    startDate: string;
    stopTime: string;
    stopDate: string;
    [key: string]: any;
}

interface Project {
    id: number;
    name: string;
    [key: string]: any;
}

interface WeekTotalHours {
    week: string;
    totalHours: number;
}

function calculateTotalTime(tasks: Task[]): number {
    return tasks.reduce((acc, task) => {
        const startTime = new Date(`${task.startDate}T${task.startTime}`);
        const stopTime = new Date(`${task.stopDate}T${task.stopTime}`);
        return acc + (stopTime.getTime() - startTime.getTime()) / 1000;
    }, 0);
}

function formatTotalTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function groupTasksByWeek(tasks: Task[]): { [week: string]: Task[] } {
  const groupedTasks: { [week: string]: Task[] } = {};

  tasks.forEach((task) => {
      const dateTimeString = `${task.startDate}T${task.startTime}`;
      const taskDate = parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
      const weekStart = startOfWeek(taskDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(taskDate, { weekStartsOn: 1 });
      const weekKey = `${format(weekStart, "MMM. dd")} - ${format(weekEnd, "MMM. dd, yyyy")}`;

      if (!groupedTasks[weekKey]) {
          groupedTasks[weekKey] = [];
      }
      groupedTasks[weekKey].push(task);
  });

  Object.keys(groupedTasks).forEach(weekKey => {
      groupedTasks[weekKey].sort((a, b) => {
          const dateTimeA = parse(`${a.startDate}T${a.startTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
          const dateTimeB = parse(`${b.startDate}T${b.startTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
          return compareDesc(dateTimeA, dateTimeB);
      });
  });

  const sortedGroupedTasks: { [week: string]: Task[] } = {};
  Object.keys(groupedTasks)
      .sort((a, b) => {
          const weekStartA = parse(a.split(' - ')[0], 'MMM. dd', new Date());
          const weekStartB = parse(b.split(' - ')[0], 'MMM. dd', new Date());
          return compareDesc(weekStartA, weekStartB);
      })
      .forEach(key => {
          sortedGroupedTasks[key] = groupedTasks[key];
      });

  return sortedGroupedTasks;
}

function groupTasksByProjectId(tasks: Task[]): { [projectId: string]: Task[];} {
    const groupedTasks: { [projectId: string]: Task[]; } = {};
  
    tasks.forEach((task) => {
      if (!groupedTasks[task.projectId]) {
        groupedTasks[task.projectId] = [];
      }
      groupedTasks[task.projectId].push(task);
    });
  
    Object.keys(groupedTasks).forEach(projectId => {
      groupedTasks[projectId].sort((a, b) => {
        const dateTimeA = parse(`${a.startDate}T${a.startTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
        const dateTimeB = parse(`${b.startDate}T${b.startTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
        return compareDesc(dateTimeA, dateTimeB);
      });
    });
  
    return groupedTasks;
}

function parseWeekString(week: string): Date {
    const [start, end] = week.split(' - ');
    const startDate = new Date(start);
    const endDate = new Date(end.replace(/,/g, ''));
  
    if (isNaN(startDate.getTime())) {
      const [startMonth, startDay] = start.split(' ');
      const endYear = endDate.getFullYear();
      return new Date(`${startMonth} ${startDay}, ${endYear}`);
    }
  
    return startDate;
}
  
function transformTasksToWeekTotalHours(tasksGroupedByWeek: { [week: string]: Task[] }): WeekTotalHours[] {
    return Object.keys(tasksGroupedByWeek)
      .sort((a, b) => parseWeekString(a).getTime() - parseWeekString(b).getTime())
      .map(week => {
        const totalHours = calculateTotalTime(tasksGroupedByWeek[week]) / 3600;
        return {
          week,
          totalHours
        };
      });
  }

function calculateProjectHours(tasks: Task[], projects: Project[]): { group: string; value: number }[] {
    const groupedTasks = groupTasksByProjectId(tasks);
    const projectIds = Object.keys(groupedTasks).map(id => parseInt(id, 10));
  
    const tasksByProjects = projects
      .filter(project => projectIds.includes(project.id))
      .map(project => ({
        group: project.name,
        value: calculateTotalTime(groupedTasks[project.id.toString()]) / 3600
      }));
  
    return tasksByProjects;
}

export { calculateTotalTime, groupTasksByWeek, formatTotalTime, groupTasksByProjectId, transformTasksToWeekTotalHours, calculateProjectHours };