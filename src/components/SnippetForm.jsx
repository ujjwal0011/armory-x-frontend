import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSnippets } from "../store/slice/snippetSlice";
import { Editor } from "@monaco-editor/react";
import { ChevronDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SnippetForm = ({ initialData = {}, onSubmit, buttonText = "Save" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { snippets } = useSelector((state) => state.snippet);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    programmingLanguage: "javascript",
    tags: [],
    ...initialData,
  });

  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (snippets.length === 0) {
      dispatch(getAllSnippets());
    }
  }, [dispatch, snippets.length]);

  useEffect(() => {
    if (snippets.length > 0) {
      const uniqueTags = Array.from(
        new Set(snippets.flatMap((snippet) => snippet.tags || []))
      ).sort();
      setAvailableTags(uniqueTags);
    }
  }, [snippets]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTagDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (initialData.tags && Array.isArray(initialData.tags)) {
      setFormData((prev) => ({
        ...prev,
        tags: initialData.tags,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (value) => {
    setFormData((prev) => ({ ...prev, code: value }));
  };

  const addTag = (tagToAdd = tagInput.trim()) => {
    if (tagToAdd && !formData.tags.includes(tagToAdd)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagToAdd],
      }));
      setTagInput("");
      setShowTagDropdown(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "ArrowDown" && showTagDropdown) {
      e.preventDefault();
      document.querySelector(".tag-option")?.focus();
    } else if (e.key === "Escape") {
      setShowTagDropdown(false);
    }
  };

  const filteredTags = tagInput.trim()
    ? availableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(tagInput.toLowerCase()) &&
          !formData.tags.includes(tag)
      )
    : availableTags.filter((tag) => !formData.tags.includes(tag));

  const programmingLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "objectivec", label: "Objective-C" },
    { value: "scala", label: "Scala" },
    { value: "dart", label: "Dart" },
    { value: "perl", label: "Perl" },
    { value: "lua", label: "Lua" },
    { value: "haskell", label: "Haskell" },
    { value: "r", label: "R" },
    { value: "shell", label: "Shell" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-base font-medium text-gray-200">
          Title<span className="text-purple-400">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter snippet title"
          className="bg-gray-800/60 border-gray-700/60 text-gray-200 focus-visible:ring-purple-500 placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="description"
          className="text-base font-medium text-gray-200"
        >
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter snippet description"
          className="resize-none bg-gray-800/60 border-gray-700/60 text-gray-200 focus-visible:ring-purple-500 placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="programmingLanguage"
          className="text-base font-medium text-gray-200"
        >
          Programming Language<span className="text-purple-400">*</span>
        </Label>
        <Select
          value={formData.programmingLanguage}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, programmingLanguage: value }))
          }
        >
          <SelectTrigger className="w-full bg-gray-800/60 border-gray-700/60 text-gray-200 focus:ring-purple-500">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
            {programmingLanguages.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className="focus:bg-gray-700 focus:text-gray-100"
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="code" className="text-base font-medium text-gray-200">
          Code<span className="text-purple-400">*</span>
        </Label>
        <div
          className="overflow-hidden rounded-md border border-gray-800"
          style={{ height: "400px" }}
        >
          <Editor
            height="100%"
            language={formData.programmingLanguage}
            value={formData.code}
            onChange={handleCodeChange}
            theme="purpleDark"
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("purpleDark", {
                base: "vs-dark",
                inherit: true,
                rules: [
                  { token: "comment", foreground: "6272a4" },
                  { token: "keyword", foreground: "bd93f9" },
                  { token: "string", foreground: "f1fa8c" },
                  { token: "number", foreground: "8be9fd" },
                  { token: "function", foreground: "50fa7b" },
                ],
                colors: {
                  "editor.background": "#0f0f17",
                  "editor.foreground": "#f8f8f2",
                  "editorLineNumber.foreground": "#6272a4",
                  "editor.selectionBackground": "#44475a",
                  "editor.lineHighlightBackground": "#1a1a2e",
                  "editorCursor.foreground": "#bd93f9",
                  "editorWhitespace.foreground": "#3b3949",
                  "editorIndentGuide.background": "#3b3949",
                },
              });
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12, bottom: 12 },
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
                verticalSliderSize: 8,
                horizontalSliderSize: 8,
              },
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
            }}
            className="border-0"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags" className="text-base font-medium text-gray-200">
          Tags
        </Label>
        <div className="flex items-center gap-2">
          <Popover open={showTagDropdown} onOpenChange={setShowTagDropdown}>
            <div className="flex-1 flex gap-2">
              <PopoverTrigger asChild>
                <div className="relative flex-1">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                      setShowTagDropdown(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag or select from dropdown"
                    className="w-full bg-gray-800/60 border-gray-700/60 text-gray-200 focus-visible:ring-purple-500 placeholder:text-gray-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full text-gray-400 hover:text-gray-200 cursor-pointer"
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                  >
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </div>
              </PopoverTrigger>
              <Button
                type="button"
                onClick={() => addTag()}
                className="shrink-0 bg-purple-600 hover:bg-purple-500 text-white border-0 cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0 bg-gray-800 border-gray-700"
              align="start"
            >
              <Command ref={dropdownRef} className="bg-transparent">
                <CommandInput
                  placeholder="Search tags..."
                  value={tagInput}
                  onValueChange={setTagInput}
                  className="text-gray-200 border-b border-gray-700"
                />
                <CommandList className="text-gray-200 max-h-48">
                  <CommandEmpty className="py-2 text-gray-400">
                    No tags found
                  </CommandEmpty>
                  <CommandGroup>
                    {filteredTags.map((tag, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => addTag(tag)}
                        className="cursor-pointer hover:bg-gray-700 text-purple-300"
                      >
                        {tag}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm font-medium bg-purple-900/50 text-purple-200 border border-purple-700/50"
              >
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 text-purple-300 hover:text-purple-100 cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-6 bg-gray-700/60" />

      <div className="flex gap-4">
        <Button
          type="submit"
          className="px-6 bg-purple-600 hover:bg-purple-500 text-white border-0 cursor-pointer"
        >
          {buttonText}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          className="border-none text-gray-100 bg-gray-700 hover:bg-gray-800 hover:text-gray-100 cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SnippetForm;
