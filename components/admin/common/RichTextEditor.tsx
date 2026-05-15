"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import { Button, Space, Divider, Tooltip, Select } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
const { Option } = Select;

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "পণ্যের বিবরণ লিখুন...",
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter a Valid Url:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const getActiveTextStyle = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    return "paragraph";
  };

  const handleTextStyleChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "h1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else if (value === "h2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (value === "h3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    } else if (value === "h4") {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    }
  };

  return (
    <div className="rich-editor-wrapper">
      <div className="rich-editor-toolbar">
        <Space size={2} wrap>
          {/* Heading Dropdown */}
          <Select
            size="small"
            value={getActiveTextStyle()}
            onChange={handleTextStyleChange}
            style={{ width: 120 }}
            popupMatchSelectWidth={false}>
            <Option value="paragraph">Paragraph</Option>
            <Option value="h1">
              <span style={{ fontSize: 18, fontWeight: 700 }}>Heading 1</span>
            </Option>
            <Option value="h2">
              <span style={{ fontSize: 16, fontWeight: 600 }}>Heading 2</span>
            </Option>
            <Option value="h3">
              <span style={{ fontSize: 14, fontWeight: 600 }}>Heading 3</span>
            </Option>
            <Option value="h4">
              <span style={{ fontSize: 12, fontWeight: 500 }}>Heading 4</span>
            </Option>
          </Select>

          <Divider type="vertical" />

          <Tooltip title="Bold">
            <Button
              type={editor.isActive("bold") ? "primary" : "text"}
              size="small"
              icon={<BoldOutlined />}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
          </Tooltip>
          <Tooltip title="Italic">
            <Button
              type={editor.isActive("italic") ? "primary" : "text"}
              size="small"
              icon={<ItalicOutlined />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
          </Tooltip>
          <Tooltip title="Strikethrough">
            <Button
              type={editor.isActive("strike") ? "primary" : "text"}
              size="small"
              icon={<StrikethroughOutlined />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            />
          </Tooltip>

          <Divider type="vertical" />

          <Tooltip title="Bullet List">
            <Button
              type={editor.isActive("bulletList") ? "primary" : "text"}
              size="small"
              icon={<UnorderedListOutlined />}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
          </Tooltip>
          <Tooltip title="Ordered List">
            <Button
              type={editor.isActive("orderedList") ? "primary" : "text"}
              size="small"
              icon={<OrderedListOutlined />}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
          </Tooltip>

          <Divider type="vertical" />

          <Tooltip title="Link">
            <Button
              type={editor.isActive("link") ? "primary" : "text"}
              size="small"
              icon={<LinkOutlined />}
              onClick={setLink}
            />
          </Tooltip>

          <Divider type="vertical" />

          <Tooltip title="Undo">
            <Button
              type="text"
              size="small"
              icon={<UndoOutlined />}
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            />
          </Tooltip>
          <Tooltip title="Redo">
            <Button
              type="text"
              size="small"
              icon={<RedoOutlined />}
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            />
          </Tooltip>
        </Space>
      </div>

      <EditorContent editor={editor} className="rich-editor-content" />
    </div>
  );
};

export default RichTextEditor;
