import db from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import SnippetEditForm from "@/components/snippet-edit-form";

interface EditSnippetProps {
  params: {
    id: string;
  };
}

export default async function EditSnippetPage(props: EditSnippetProps) {
  const id = props.params.id;
  const snippet = await db.snippet.findUnique({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }
  return <SnippetEditForm snippet={snippet} />;
}
