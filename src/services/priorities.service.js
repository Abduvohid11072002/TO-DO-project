import pool from "../config/database.js";

export const createPriorityService = async (body, user) => {
  try {
    const priorityId = await pool.query(
      `INSERT INTO priorities (name, level, ownerid) VALUES ($1, $2, $3) RETURNING id`,
      [body.name, body.level, user.id]
    );

    return {
      status: 201,
      message: "Priority created successfully",
      values: priorityId.rows[0].id,
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

export const getAllPriorityService = async (user) => {
  try {
    if (user.role === "admin") {
      const allPrioritiess = await pool.query(`SELECT * FROM priorities`);

      if (allPrioritiess.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: allPrioritiess.rows,
        };
      } else {
        return {
          status: 404,
          message: "Tags Not Found",
          values: "",
        };
      }
    } else {
      const allPrioritiessUser = await pool.query(
        `SELECT * FROM priorities WHERE ownerid = $1`,
        [user.id]
      );

      if (allPrioritiessUser.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: allPrioritiessUser.rows,
        };
      }
    }

    return {
      status: 404,
      message: "Tags Not Found",
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

export const getOnePriorityService = async (id, user) => {
  try {
    if (user.role === "admin") {
      const priotityOne = await pool.query(
        `SELECT * FROM priorities WHERE id = $1`,
        [id]
      );
      if (priotityOne.rows.length !== 1) {
        return {
          status: 404,
          message: "Not Found",
          values: "",
        };
      };
      return {
        status: 200,
        message: "",
        values: priotityOne.rows[0],
      };

    } else {
      const priotityOnly = await pool.query(
        `SELECT * FROM priorities WHERE id = $1 AND ownerid = $2`,
        [id, user.id]
      );
      if (priotityOnly.rows.length !== 1) {
        return {
          status: 404,
          message: "Not Found",
          values: "",
        };
      };
      return {
        status: 200,
        message: "",
        values: priotityOnly.rows[0],
      };
    }
   
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      values: "",
      message: "Bad request",
    };
  }
};

export const updatePriorityService = async (id, body, user) => {
  try {
    const { rows } = await pool.query(`SELECT now()`);
    const currentTime = rows[0].now;

    if (user.role === "admin") {
      await pool.query(
        `UPDATE priorities SET name = $1, level = $2, updatedat = $3 WHERE id = $4`,
        [body.name, body.level, currentTime, id]
      );
    } else {
      await pool.query(
        `UPDATE priorities SET name = $1, level = $2, updatedat = $3 WHERE id = $4 AND ownerid = $5`,
        [body.name, body.level, currentTime, id, user.id]
      );
    }

    return {
      status: 200,
      message: "Updated successfully",
      values: {
        message: "Tag successfully updated",
        tagId: id,
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


export const deletePriorityService = async (id, user) => {
  try {
    if (user.role === "admin") {
      await pool.query(`DELETE FROM priorities WHERE id =$1`, [id]);
    } else {
      await pool.query(`DELETE FROM priorities WHERE id =$1 AND ownerid = $2`, [
        id,
        user.id,
      ]);
    }

    return {
      status: 200,
      message: "Deleted Priorities",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      message: "Bad request",
    };
  }
};
