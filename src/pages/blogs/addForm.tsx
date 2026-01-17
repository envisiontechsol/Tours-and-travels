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
import { addBlogReq } from "../../services/api/blogs/blogsApi";
import { getBlogFormFields } from "./formFields";
import { convertStringToUrlSlug } from "../../utils/functions/stringToUrlSlug";

type BlogFormValues = z.infer<typeof blogSchema>;

const AddForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
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

  const [loading, setLoading] = useState(false);

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

  const formFields = useMemo(() => getBlogFormFields(), []);

  const postTitleValue = watch("postTitle");

  useEffect(() => {
    if (typeof postTitleValue !== "string") return;

    setValue("blogUrl", convertStringToUrlSlug(postTitleValue));
  }, [postTitleValue]);

  const onResetForm = () => {
    reset();
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      (input as HTMLInputElement).value = "";
    });
  };

  const onSubmit = async (data: BlogFormValues) => {
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
      formData.append("createdBy", data.createdBy);

      if (data.featuredImage?.length) {
        formData.append("featuredImage", data.featuredImage[0]);
      }
      if (!!editor) {
        formData.append("content", editor?.getHTML() || "");
      }
      await addBlogReq(formData);
      toast.success("Blog added successfully");
      onResetForm();
    } catch (err: any) {
      toast.error(err?.message || "Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm relative bg-white">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Blog
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        <div className="mt-5">
          {!!editor && (
            <div className="rounded-lg border bg-white shadow-sm">
              <Toolbar editor={editor} />

              <EditorContent
                editor={editor}
                className="prose min-h-[400px] max-w-none p-4 focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-primary text-white rounded-md"
          >
            {loading ? "Saving..." : "Save Blog"}
          </button>

          <button
            type="button"
            onClick={() => onResetForm()}
            className="px-5 py-2 border rounded-md"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
