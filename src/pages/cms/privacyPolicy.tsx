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
import {
  addPrivacyPolicyReq,
  fetchPrivacyPolicyReq,
} from "../../services/api/cms/privacyPolicyApi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicFormFields from "../../components/forms/dynamicFormFields";

import { metaSchema, MetaValues } from "../../schema/cmsSchema";
import { metaFields } from "./formFields";

const PrivacyPolicyEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ----------------- Meta Form ----------------- */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetaValues>({
    resolver: zodResolver(metaSchema),
    defaultValues: {
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
    },
  });

  /* ----------------- Editor ----------------- */
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

  /* ----------------- Load API ----------------- */
  useEffect(() => {
    if (!editor) return;

    const load = async () => {
      try {
        const res = await fetchPrivacyPolicyReq();
        if (res?.data) {
          editor.commands.setContent(res.data.content || "");

          reset({
            metaTitle: res.data.metaTitle || "",
            metaKeywords: res.data.metaKeywords || "",
            metaDescription: res.data.metaDescription || "",
          });
        }
      } catch (error: any) {
        toast.error(error?.errorMsg || "Failed to load Privacy Policy");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [editor]);

  /* ----------------- Submit ----------------- */
  const onSubmit = async (data: MetaValues) => {
    if (!editor) return;

    setSaving(true);
    try {
      await addPrivacyPolicyReq({
        content: editor.getHTML(),
        ...data,
      });

      toast.success("Privacy Policy page saved successfully");
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to save Privacy Policy");
    } finally {
      setSaving(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-4 text-2xl font-semibold">
        Privacy Policy Page Editor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -------- Editor -------- */}
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

        {/* -------- Meta Fields -------- */}
        <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicFormFields
              control={control}
              errors={errors}
              fields={metaFields}
            />
          </div>
        </div>

        {/* -------- Save Button -------- */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Privacy Policy Page"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacyPolicyEditor;
