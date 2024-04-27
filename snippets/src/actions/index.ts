"use server";

import db from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(
  id: number,
  code: string,
  formData: FormData
) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  try {
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be at least 3 characters long",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be at least 10 characters long",
      };
    }
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }

  // Redirect the user to the home page
  redirect("/");
}
