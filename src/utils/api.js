// utils/api.js
export const fetchTasks = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
    const data = await response.json();
    return data.map((task) => ({
      id: task.id,
      title: task.title,
      description: 'No Description', // Placeholder as API doesn't have descriptions
      status: task.completed ? 'Done' : 'To Do',
    }));
  };
  