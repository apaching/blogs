"use server";

import postgres from "postgres";
import { NewBlog, UpdateBlog } from "@/types/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function addBlog(newBlog: NewBlog) {
  const { user_id, title, description, content } = newBlog;

  const timestamp = new Date().toISOString();

  try {
    await sql`
			INSERT INTO blogs (user_id, title, description, content, last_edited)
			VALUES(
				${user_id},
				${title},
				${description},
				${content},
				${timestamp}
			)
		`;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateBlog(updatedBlog: UpdateBlog) {
  const { id, title, description, content } = updatedBlog;

  const timestamp = new Date().toISOString();

  console.log("What the heck", id);

  try {
    await sql`
		UPDATE blogs
		SET
			title = ${title},
        	description = ${description},
        	content = ${content},
       		last_edited = ${timestamp}
      	WHERE id = ${id}
	`;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteBlog(id: string) {
  try {
    await sql`
		DELETE FROM blogs
		WHERE id = ${id}
	`;
  } catch (error) {
    console.log("Error:", error);
  }
}
