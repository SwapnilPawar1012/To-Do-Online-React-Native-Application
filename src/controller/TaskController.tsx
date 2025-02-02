import axios from 'axios';
import {useEffect, useState} from 'react';
import AuthController from './AuthController';
import {useRefresh} from './context/useRefresh';

const TaskController = () => {
  const {currentUser, HandleAuthentication} = AuthController();
  const {setRefresh} = useRefresh();

  // const [tasks, setTasks] = useState<any[]>([]);
  
  const URI = 'http://10.0.2.2:3000/task-api';

  useEffect(() => {
    const HandleAuth = async () => {
      await HandleAuthentication(); // Wait for authentication to complete
      // HandleFetchTasks();
    };
    HandleAuth();
  }, [currentUser]);

  // Add Task
  const HandleAddTask = async (data: any) => {
    try {
      const {task, date, time} = data;
      const response = await axios.post(`${URI}/add-task`, {
        userId: currentUser,
        task,
        date,
        time,
      });

      if (response.status === 200) {
        setRefresh(true);
      }

      return response.status === 200
        ? {
            success: true,
            message: 'Task added successfully',
            task: response.data,
          }
        : {success: false, error: 'Failed to add Task'};
    } catch (error: any) {
      return {success: false, error: 'Something went wrong'};
    }
  };

  // Update Task
  const HandleUpdateTask = async (data: any) => {
    try {
      const {taskId, task, date, time} = data;
      const response = await axios.put(`${URI}/update-task`, {
        userId: currentUser,
        taskId,
        task,
        date,
        time,
      });

      if (response.status === 200) {
        setRefresh(true);
      }

      return response.status === 200
        ? {
            success: true,
            message: 'Task updated successfully',
            task: response.data,
          }
        : {success: false, error: 'Failed to update Task'};
    } catch (error: any) {
      return {success: false, error: 'Something went wrong'};
    }
  };

  // Remove Task
  const HandleRemoveTask = async (_id: any) => {
    try {
      console.log('id: ', _id);
      console.log('currenct user ', currentUser);
      const response = await axios.delete(`${URI}/delete-task`, {
        data: {userId: currentUser, taskId: _id},
      });

      if (response.status === 200) {
        setRefresh(true);
      }

      return response.status === 200
        ? {success: true, message: 'Task Deleted Successfully'}
        : {success: false, error: 'Failed to delete task'};
    } catch (error: any) {
      return {success: false, error: 'Something went wrong'};
    }
  };

  // Fetch All Task (GET)
  const HandleFetchTasks = async () => {
    try {
      if (!currentUser) return; // Avoid fetching if no user is logged in
      console.log('current user: ', currentUser);
      const response = await axios.post(`${URI}/tasks`, {
        userId: currentUser,
      });

      if (response.status === 200) {
        console.log('Fetched tasks: ', response.data); // Debugging
        // setTasks(response.data); // Ensure state updates
        return response.data;
      }
    } catch (error) {
      console.error('Fetch tasks error:', error);
    }
  };

  return {
    // tasks,
    HandleAddTask,
    HandleUpdateTask,
    HandleFetchTasks,
    HandleRemoveTask,
  };
};

export default TaskController;
