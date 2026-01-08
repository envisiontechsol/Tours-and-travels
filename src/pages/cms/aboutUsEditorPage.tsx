import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import { Toolbar } from "../../components/editor/toolbar";
import { toast } from "react-toastify";
import { addAboutReq, fetchAboutReq } from "../../services/api/cms/aboutApi";

const AboutEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    const getContent = async () => {
      setLoading(true);
      try {
        const res = await fetchAboutReq();
        if (res?.data?.content) {
          editor.commands.setContent(res.data.content);
        }
      } catch (error: any) {
        toast.error(error?.errorMsg || "Failed to load About content");
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [editor]);

  const saveContent = async () => {
    if (!editor || saving) return;

    setSaving(true);
    try {
      await addAboutReq({
        content: editor.getHTML(),
      });
      toast.success("About page saved successfully");
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to save About page");
    } finally {
      setSaving(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-4 text-2xl font-semibold">About Page Editor</h1>

      <div className="rounded-lg border bg-white shadow-sm">
        <Toolbar editor={editor} />

        {loading ? (
          <div className="flex h-[400px] items-center justify-center text-gray-500">
            Loading content...
          </div>
        ) : (
          <EditorContent
            editor={editor}
            className="prose min-h-[400px] max-w-none p-4 focus:outline-none"
          />
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={saveContent}
          disabled={saving}
          className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save About Page"}
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;
