# Pixel Editor
A web based pixel editor that utilizes the html canvas element to display pixels and handle user input. The goal of this package was provide a minimal interface to the canvas that would allow consumers to create their own tools and UI elements.

## Features
* Configurable width and height
* Undo/Redo/Clear
* Mobile/Desktop event handling and pointer positions
* Custom UI/tool compatibility

## Default Tool Set
Even though the editor implementation empowers the consumer to create their own tools, the project has included some default tools:
* Pencil
* Rectangle
* Line

## Installation
```
yarn add @curtishughes/pixel-editor
```

```
npm install @curtishughes/pixel-editor
```

## Usage
*Pixel Editor* is not coupled with any specific framework. However, I have included some examples of how it can be used with a few of the popular frontend frameworks:

### React
```tsx
import React, { useRef, useEffect, useState } from 'react';
import { PixelEditor, Pencil } from '@curtishughes/pixel-editor';

function App() {
  const editorRef = useRef<HTMLCanvasElement>(null);
  const [editor, setEditor] = useState<PixelEditor>();

  useEffect(() => {
    if (editorRef.current) {
      setEditor(new PixelEditor(editorRef.current, 64, 64, new Pencil('black')));
    }
  }, []);

  return (
    <>
      <canvas ref={editorRef} />
      <button onClick={() => { if (editor) editor.tool = new Pencil() }}>Eraser</button>
      <button onClick={() => { if (editor) editor.tool = new Pencil('black') }}>Pencil</button>
      <button onClick={() => { if (editor) editor.undo() }}>Undo</button>
      <button onClick={() => { if (editor) editor.redo() }}>Redo</button>
    </>
  );
}

export default App;
```

### Vue
```vue
<template>
  <div>
    <canvas ref="editor" />
    <button @click="editor.tool = eraser">Eraser</button>
    <button @click="editor.tool = pencil">Pencil</button>
    <button @click="() => editor.undo()">Undo</button>
    <button @click="() => editor.redo()">Redo</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PixelEditor, Pencil } from '@curtishughes/pixel-editor';

@Component
export default class Editor extends Vue {
  private editor!: PixelEditor;

  private pencil = new Pencil('black');

  private eraser = new Pencil();

  mounted() {
    const canvas = this.$refs.editor as HTMLCanvasElement;
    this.editor = new PixelEditor(canvas, 64, 64, this.pencil);
  }
}
</script>
```

## Creating Custom Tools
Custom tools will need to implement the `Tool` interface in order to handle user events:
```typescript
export interface Tool {
  handlePointerDown: (position: Point, editor: PixelEditor) => void;
  handlePointerMove: (position: Point, editor: PixelEditor) => void;
  handlePointerUp: (position: Point, editor: PixelEditor) => void;
}
```

Once implemented, a custom tool can be used by assigning the editor's `tool` property to an instance of the custom tool:
```typescript
editor.tool = new CustomTool();
```

Please refer to the default tool implementations for specific examples: [Pencil](src/tools/Pencil), [Rectangle](src/tools/Rectangle), [Line](src/tools/Line)
