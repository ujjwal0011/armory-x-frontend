import Editor from "@monaco-editor/react";

const CodeViewer = ({ code, language }) => {
  const beforeMount = (monaco) => {
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
  };

  return (
    <div
      className="overflow-hidden rounded-md border border-gray-800"
      style={{ height: "400px" }}
    >
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="purpleDark"
        beforeMount={beforeMount}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 15,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            verticalSliderSize: 8,
            horizontalSliderSize: 8,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            arrowSize: 15,
          },
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Source Code Pro', Consolas, 'Courier New', monospace",
          fontLigatures: true,
        }}
      />
    </div>
  );
};

export default CodeViewer;
