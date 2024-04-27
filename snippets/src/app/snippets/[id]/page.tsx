import db from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions";

interface ViewSnippetProps {
  params: {
    id: string;
  };
}
export default async function ViewSnippet(props: ViewSnippetProps) {
  const id = props.params.id;
  const snippet = await db.snippet.findUnique({
    where: {
      id: parseInt(props.params.id),
    },
  });
  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  if (snippet) {
    return (
      <div>
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-bold">{snippet.title}</h1>
          <div className="flex gap-4">
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="p-2 border rounded"
            >
              Edit
            </Link>
            <form action={deleteSnippetAction}>
              <button type="submit" className="border rounded p-2">
                Delete
              </button>
            </form>
          </div>
        </div>
        <pre className="p-3 border rounded bg-gray-200 border-gray-200">
          <code>{snippet.code}</code>
        </pre>
      </div>
    );
  }
}
