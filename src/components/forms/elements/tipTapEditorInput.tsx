// components/editor/TipTapEditorInput.tsx
import React, { forwardRef, useEffect, useImperativeHandle } from "react";

import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Toolbar } from "../../editor/toolbar";
import { TipTapEditorInputRefType } from "../../../types/tipTapEditorTypes";

type Props = {
  initialContent?: string;
  label: string;
  required?: boolean;
};

const TipTapEditorInput = forwardRef<TipTapEditorInputRefType, Props>(
  ({ initialContent = "", label, required }, ref) => {
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
      content: initialContent,
      immediatelyRender: false,
    });

    useEffect(() => {
      if (editor && initialContent) {
        editor.commands.setContent(initialContent, { emitUpdate: false });
      }
    }, [editor, initialContent]);

    useImperativeHandle(ref, () => ({
      getHTML: () => editor?.getHTML() || "",
      setContent: (html: string) => editor?.commands.setContent(html),
      clear: () => editor?.commands.clearContent(),
    }));

    if (!editor) return null;

    return (
      <div>
        <label className="block text-[14px] font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
        <div className="rounded-lg border bg-white shadow-sm">
          <Toolbar editor={editor} />
          <EditorContent
            editor={editor}
            className="prose min-h-[200px] max-w-none p-4"
          />
        </div>
      </div>
    );
  }
);

export default TipTapEditorInput;
