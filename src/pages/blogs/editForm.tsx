import { zodResolver } from "@hookform/resolvers/zod";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Toolbar } from "../../components/editor/toolbar";
import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { blogSchema } from "../../schema/blogSchema";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { getBlogFormFields } from "./formFields";
import { upadteBlogReq } from "../../services/api/blogs/blogsApi";

type BlogFormValues = z.infer<typeof blogSchema>;

const EditForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editBlogData);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      postTitle: "",
      blogUrl: "",
      showComments: false,
      showHome: false,
      metaTitle: "",
      metaKeyword: "",
      metaDescription: "",
      featuredImage: undefined,
    },
  });

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
    if (!editData) return;

    reset({
      postTitle: editData.postTitle,
      blogUrl: editData.blogUrl,
      showComments: editData.showComments,
      showHome: editData.showHome,
      metaTitle: editData.metaTitle,
      metaKeyword: editData.metaKeyword,
      metaDescription: editData.metaDescription,
      featuredImage: undefined,
    });

    if (editor && editData.content) {
      editor.commands.setContent(editData.content);
    }
  }, [editData, editor, reset]);

  const formFields = useMemo(() => getBlogFormFields(editData), [editData]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: BlogFormValues) => {
    if (!editData?.id) {
      return toast.error("Blog ID not found");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("postTitle", data.postTitle);
      formData.append("blogUrl", data.blogUrl);
      formData.append("showComments", String(data.showComments));
      formData.append("showHome", String(data.showHome));
      formData.append("metaTitle", data.metaTitle);
      formData.append("metaKeyword", data.metaKeyword);
      formData.append("metaDescription", data.metaDescription);

      if (data.featuredImage?.length) {
        formData.append("featuredImage", data.featuredImage[0]);
      }

      if (editor) {
        formData.append("content", editor.getHTML());
      }

      await upadteBlogReq(editData.id, formData);

      toast.success("Blog updated successfully");
      onCancelOrClose();
      reset();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (!editData) return null;

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm relative bg-white">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Blog
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        {!!editor && (
          <div className="rounded-lg border bg-white shadow-sm">
            <Toolbar editor={editor} />
            <EditorContent
              editor={editor}
              className="prose min-h-[400px] max-w-none p-4 focus:outline-none"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-primary text-white rounded-md"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>

          <button
            type="button"
            onClick={onCancelOrClose}
            className="px-5 py-2 border rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
