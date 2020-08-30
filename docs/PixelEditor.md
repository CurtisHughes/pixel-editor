# PixelEditor

### Public Properties
| Name          | Type                         | Description                                                        |
| ------------- |:----------------------------:| ------------------------------------------------------------------:|
| width         | number                       | number of horizontal pixels                                        |
| height        | number                       | number of vertical pixels                                          |
| tool          | [Tool](../src/types.ts)     | reference to the active tool handling user events                  |
| history       | [History](../src/History.ts) | history object which contains an array of pixel changes (deltas)   |
| pixels        | [Pixel\[\]](../src/types.ts) | an array of the modified pixels within the editor                  |

### Public Methods
| Name                                                     | Description                                                                                             |
| -------------------------------------------------------- |:-------------------------------------------------------------------------------------------------------:|
| get(x: number, y: number): Pixel                         | Returns the Pixel data at the given coordinates.                                                        |
| set(pixels: Pixel[], logToHistory: boolean = true): Pixel| Sets the Pixel data within the editor. Setting logToHistory to false will not log the change.           |
| clear(): Pixel                                           | Clears all the pixel values within the editor.                                                          |
| undo(): Pixel                                            | Reverts the last pixel changes.                                                                         |
| redo(): Pixel                                            | Restores any pixels that have been previously undone using undo().                                      |
