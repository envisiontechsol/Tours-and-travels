import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import { Toolbar } from "./_components/toolbar";

const AboutEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Write your About page here...</p>",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    // axios.get("http://localhost:4000/api/about").then((res) => {
    //   if (res.data?.content) {
    //     editor.commands.setContent(res.data.content);
    //   }
    // });
  }, [editor]);

  const saveContent = async () => {
    if (!editor) return;

    // await axios.post("http://localhost:4000/api/about", {
    //   content: editor.getHTML(),
    // });

    console.log(editor.getHTML());

    alert("About page saved");
  };

  if (!editor) return null;

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-4 text-2xl font-semibold">About Page Editor</h1>

      <div className="rounded-lg border bg-white shadow-sm">
        <Toolbar editor={editor} />

        <EditorContent
          editor={editor}
          className="prose min-h-[400px] max-w-none p-4 focus:outline-none"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={saveContent}
          className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Save About Page
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;
