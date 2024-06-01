import { parse, format, startOfWeek, endOfWeek, compareDesc } from 'date-fns';

interface Task {
    startTime: string;
    startDate: string;
    stopTime: string;
    stopDate: string;
    [key: string]: any;
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

  // Sort tasks within each week by start time in descending order
  Object.keys(groupedTasks).forEach(weekKey => {
      groupedTasks[weekKey].sort((a, b) => {
          const dateTimeA = parse(`${a.startDate}T${a.startTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
          const dateTimeB = parse(`${b.startDate}T${b.startTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
          return compareDesc(dateTimeA, dateTimeB);
      });
  });

  // Sort the weeks in descending order
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

export { calculateTotalTime, groupTasksByWeek, formatTotalTime };