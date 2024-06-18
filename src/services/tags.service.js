import pool from "../config/database.js";

export const createTagService = async (body, user) => {
  try {
    const tagId = await pool.query(
      `INSERT INTO tags (name, ownerid) VALUES ($1, $2) RETURNING id`,
      [body.name, user.id]
    );

    return {
      status: 201,
      message: "Created successfully",
      values: {
        message: "Tag successfully Created",
        tagId: tagId.rows[0].id,
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

export const getAllTagsService = async (user) => {
  try {
    if (user.role === "admin") {
      const allTags = await pool.query(`SELECT * FROM tags`);

      if (allTags.rows.length > 0) {
        return {
          status: 200,
          message: "",
          values: allTags.rows,
        };
      } else {
        return {
          status: 404,
          message: "Tags Not Found",
          values: "",
        };
      }
    }
    const allTagsUser = await pool.query(
      `SELECT * FROM tags WHERE ownerid = $1`,
      [user.id]
    );

    if (allTagsUser.rows.length > 0) {
      return {
        status: 200,
        message: "",
        values: allTagsUser.rows,
      };
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

export const getOneTagService = async (id) => {
  try {
    const tag = await pool.query(`SELECT * FROM tags WHERE id = $1`, [id]);

    if (tag.rows.length !== 1) {
      return {
        status: 404,
        message: "Not Found",
        values: "",
      };
    }

    return {
      status: 200,
      message: "",
      values: tag.rows[0],
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

export const updateTagService = async (id, body, user) => {
  try {
    const time = await pool.query(`SELECT now()`);

    await pool.query(
      `UPDATE tags SET name = $1, updatedat = $2 WHERE id = $3`,
      [body.name, time.rows[0].now, id]
    );

    return {
      status: 200,
      message: "Created successfully",
      values: {
        message: "Tag successfully Updated",
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

export const deleteTagService = async (id, user) => {
  try {
    await pool.query(`DELETE FROM tags WHERE id =$1`, [id]);

    return {
      status: 200,
      message: "Deleted Tag",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      message: "Bad request",
    };
  }
};
