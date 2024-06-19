import pool from "../config/database.js";

export const createTaskService = async (body, user) => {
  try {
    const { title, description, listid, priorityid, duedate, status } = body;

    const newTask = await pool.query(
      `INSERT INTO tasks (title, description, ownerid, listid, priorityid, duedate, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [title, description, user.id, listid, priorityid, duedate, status]
    );

    if (newTask.rows.length !== 1) {
      return {
        status: 400,
        message: "Bad request",
        values: "",
      };
    }

    return {
      status: 201,
      message: "Task created successfully",
      values: newTask.rows[0].id,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const getAllTaskService = async (user) => {
  try {
    if (user.role === "admin") {
      const allTasks = await pool.query(`SELECT * FROM tasks`);

      if (allTasks.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: allTasks.rows,
        };
      } else {
        return {
          status: 404,
          message: "Tags Not Found",
          values: "",
        };
      }
    } else {
      const allTasksUser = await pool.query(
        `SELECT * FROM tasks WHERE ownerid = $1`,
        [user.id]
      );

      if (allTasksUser.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: allTasksUser.rows,
        };
      }
    }

    return {
      status: 404,
      message: "Task Not Found",
      values: "",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const getOneTaskService = async (id, user) => {
  try {
    let taskQuery;
    let queryParams;

    if (user.role === "admin") {
      taskQuery = `SELECT * FROM tasks WHERE id = $1`;
      queryParams = [id];
    } else {
      taskQuery = `SELECT * FROM tasks WHERE id = $1 AND ownerid = $2`;
      queryParams = [id, user.id];
    }

    const taskResult = await pool.query(taskQuery, queryParams);

    if (taskResult.rows.length !== 1) {
      return {
        status: 404,
        message: "Task not found",
        values: "",
      };
    }

    return {
      status: 200,
      message: "",
      values: taskResult.rows[0],
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const updateTaskService = async (id, body, user) => {
  try {
    const { title, description, listid, priorityid, duedate, status } = body;
    const { rows } = await pool.query(`SELECT now()`);
    const currentTime = rows[0].now;

    let updateResult;
    if (user.role === "admin") {
      updateResult = await pool.query(
        `UPDATE tasks SET title = $1, description = $2, listid = $3, priorityid = $4, duedate = $5, status = $6, updatedat = $7 WHERE id = $8`,
        [
          title,
          description,
          listid,
          priorityid,
          duedate,
          status,
          currentTime,
          id,
        ]
      );
    } else {
      updateResult = await pool.query(
        `UPDATE tasks SET title = $1, description = $2, listid = $3, priorityid = $4, duedate = $5, status = $6, updatedat = $7 WHERE id = $8 AND ownerid = $9`,
        [
          title,
          description,
          listid,
          priorityid,
          duedate,
          status,
          currentTime,
          id,
          user.id,
        ]
      );
    }

    if (updateResult.rowCount === 0) {
      return {
        status: 404,
        message: "Task not found",
        values: "",
      };
    }

    return {
      status: 200,
      message: "Task successfully updated",
      values: {
        taskId: id,
        message: "Task successfully updated",
      },
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const deleteTaskService = async (id, user) => {
  try {
    if (user.role === "admin") {
      await pool.query(`DELETE FROM tasks WHERE id =$1`, [id]);
    } else {
      await pool.query(`DELETE FROM tasks WHERE id =$1 AND ownerid = $2`, [
        id,
        user.id,
      ]);
    }

    return {
      status: 200,
      message: "Deleted Task",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      message: "Bad request",
    };
  }
};
