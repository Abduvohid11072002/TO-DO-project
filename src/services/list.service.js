import pool from "../config/database.js";

export const createListService = async (body, user) => {
  try {
    const listId = await pool.query(
      `INSERT INTO lists (title, description, ownerid) VALUES ($1, $2, $3) RETURNING id`,
      [body.title, body.description, user.id]
    );
    console.log(listId.rows[0].id);

    if (listId.rows.length !== 1) {
      return {
        status: 400,
        values: "",
        message: "Bad request",
      };
    }

    return {
      status: 201,
      message: "Created successfully",
      values: {
        message: "List successfully Created",
        listId: listId.rows[0].id,
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

export const getAllListService = async (user) => {
  try {
    if (user.role === "admin") {
      const lists = await pool.query(`SELECT * FROM lists`);

      if (lists.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: lists.rows,
        };
      } else {
        return {
          status: 404,
          message: "Lists Not Found",
          values: "",
        };
      }
    } else {
      const listUser = await pool.query(
        `SELECT * FROM lists WHERE ownerid = $1`,
        [user.id]
      );

      if (listUser.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: listUser.rows,
        };
      } else {
        return {
          status: 404,
          message: "Lists Not Found",
          values: "",
        };
      }
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

export const getOneListService = async (id, user) => {
  try {
    const oneList = await pool.query(`SELECT * FROM lists WHERE id = $1`, [id]);

    if (oneList.rows.length !== 1) {
      return {
        status: 404,
        message: "List Not Found",
        values: "",
      };
    }

    if (user.id === oneList.rows[0].ownerid || user.role === "admin") {
      return {
        status: 200,
        message: "",
        values: oneList.rows[0],
      };
    }

    return {
      status: 403,
      message: "Authentication role Failed",
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

export const updateListService = async (id, body, user) => {
  try {
    const existList = await pool.query(`SELECT * FROM lists WHERE id =$1`, [
      id,
    ]);

    if (existList.rows.length !== 1) {
      return {
        status: 404,
        message: "List Not Found",
        values: "",
      };
    }

    if (user.role !== "admin" || user.id !== existList.rows[0].ownerid) {
      const time = await pool.query(`SELECT now()`);
      console.log(time.rows[0].now);

      await pool.query(
        `UPDATE lists set title = $1, description = $2, updatedat = $3 WHERE id = $4`,
        [body.title, body.description, time.rows[0].now, id]
      );

      return {
        status: 200,
        message: "",
        values: {
          message: "Updated List successfully",
          listId: id,
        },
      };
    }
    return {
      status: 403,
      message: "Authentication role Failed",
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

export const deleteListService = async (listId, user) => {
  try {
    const existList = await pool.query(`SELECT * FROM lists WHERE id = $1`, [
      listId,
    ]);

    if (existList.rows.length !== 1) {
      return {
        status: 400,
        message: "Bad request",
      };
    }

    if (existList.rows[0].ownerid !== user.id || user.role === "admin") {
      return {
        status: 400,
        message: "Authentication role Failed",
      };
    }

    await pool.query(`DELETE FROM lists WHERE id = $1`, [listId]);

    return {
      status: 200,
      message: "List successfully Deleted",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      message: "Bad request",
    };
  }
};
