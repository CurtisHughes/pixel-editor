# Pixel Editor
A web based pixel editor that utilizes the html canvas element to display pixels and handle user input. The goal of this package was provide a minimal interface to the canvas that would allow consumers to create their own tools and UI elements.

## Features
* Undo/Redo
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
```typescript
import React, { useRef, useEffect } from 'react';
import { PixelEditor, Pencil, ToolFactory} from '@curtishughes/pixel-editor';

function App() {
  const editorRef = useRef<HTMLCanvasElement>(null);

  const pencil = new Pencil('black');

  const factory: ToolFactory = {
    getTool: () => pencil,
  }

  useEffect(() => {
    if (editorRef.current) {
      new PixelEditor(editorRef.current, 64, 64, factory);
    }
  });

  return (
    <canvas ref={editorRef} />
  );
}

export default App;
```

### Vue
```vue
<template>
  <canvas ref="editor" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PixelEditor, ToolFactory, Pencil } from '@curtishughes/pixel-editor';

@Component
export default class Editor extends Vue {
  private editor!: PixelEditor;

  private pencil = new Pencil('black');

  private get factory(): ToolFactory {
    return {
      getTool: () => this.pencil,
    };
  }

  mounted() {
    const canvas = this.$refs.editor as HTMLCanvasElement;
    this.editor = new PixelEditor(canvas, 64, 64, this.factory);
  }
}
</script>
```
