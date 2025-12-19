import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Highlighter,
} from "lucide-react";

const fonts = ["Inter", "Arial", "Times New Roman", "Georgia", "Courier New"];

export const Toolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b bg-white p-2 shadow-sm">
      {/* Undo / Redo */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
        <Redo size={16} />
      </ToolbarButton>

      <Divider />

      {/* Text styles */}
      <ToolbarButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={16} />
      </ToolbarButton>

      <Divider />

      {/* Font family */}
      <select
        className="h-9 rounded-md border px-2 text-sm focus:outline-none"
        onChange={(e) =>
          editor.chain().focus().setFontFamily(e.target.value).run()
        }
      >
        {fonts.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      {/* Text color */}
      <input
        type="color"
        className="h-9 w-9 cursor-pointer rounded border"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter size={16} />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <Divider />

      {/* Link */}
      <ToolbarButton
        onClick={() => {
          const url = prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        <Link2 size={16} />
      </ToolbarButton>

      {/* Image */}
      <ToolbarButton
        onClick={() => {
          const url = prompt("Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      >
        <ImageIcon size={16} />
      </ToolbarButton>
    </div>
  );
};

const ToolbarButton = ({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex h-9 w-9 items-center justify-center rounded-md border transition
      ${
        active
          ? "bg-blue-100 border-blue-400 text-blue-600"
          : "hover:bg-gray-100"
      }`}
  >
    {children}
  </button>
);

const Divider = () => <div className="mx-1 h-6 w-px bg-gray-300" />;
