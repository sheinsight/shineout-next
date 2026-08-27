# Shineout Semantic DOM API

Shineout supports Semantic DOM customization through `classNames` and `styles` props.
Each component exposes named DOM slots (semantic keys) that you can target individually.

## Usage

```tsx
import { Button } from 'shineout'

// Per-instance customization
<Button
  classNames={{ root: 'my-btn', loading: 'my-spinner' }}
  styles={{ root: { borderRadius: 8 } }}
/>
```

## Global Configuration

```tsx
import { setConfig } from 'shineout'

setConfig({
  button: { classNames: { root: 'global-btn' } },
  modal: { styles: { mask: { background: 'rgba(0,0,0,0.8)' } } },
})
```

---

## Components

### Button

| Key | Description |
|-----|-------------|
| root | Button element (button or anchor tag) |
| loading | Loading indicator container |

### Link

| Key | Description |
|-----|-------------|
| root | Link element (anchor tag) |
| icon | Icon container |

### Divider

| Key | Description |
|-----|-------------|
| root | Divider container element |
| content | Text content area |

### Gap

| Key | Description |
|-----|-------------|
| root | Outer flex container |
| item | Child element wrapper |

### Grid

| Key | Description |
|-----|-------------|
| root | Grid container element |

### Breadcrumb

| Key | Description |
|-----|-------------|
| root | Breadcrumb outermost wrapper element |
| item | Each breadcrumb item container |
| separator | Separator element between items |
| content | Text or link content element |
| dropdown | Dropdown panel (popup when a data item is an array) |
| dropdownItem | Each item inside the dropdown panel |

### Dropdown

| Key | Description |
|-----|-------------|
| root | Dropdown outermost wrapper element |
| button | Trigger button |
| caret | Arrow icon |
| list | Dropdown menu panel |
| item | Menu item |
| group | Group title |

### Menu

| Key | Description |
|-----|-------------|
| root | Menu outermost wrapper element |
| header | Menu header area (inline mode only) |
| list | Menu list container (ul element) |
| item | Menu item (li element) |
| itemContent | Menu item content area |
| title | Menu item title/link |
| icon | Menu item icon |
| expand | Expand/collapse arrow |

### Pagination

| Key | Description |
|-----|-------------|
| root | Pagination outermost wrapper element |
| item | Page number button (including  |
| prev | Previous page button |
| next | Next page button |
| jumper | Jump-to-page input section |
| sizeList | Page size selector section |

### Steps

| Key | Description |
|-----|-------------|
| root | Steps outermost wrapper element |
| step | Outermost wrapper of a single step |
| tail | Connector line between steps (default / dot type) |
| icon | Icon or number indicator area (default / dot type) |
| title | Title text |
| description | Description text |
| content | Content container wrapping title and description |

### Avatar

| Key | Description |
|-----|-------------|
| group | Avatar.Group container element |
| root | Avatar outermost wrapper (can be passed from Avatar.Group to child Avatars) |

### Badge

| Key | Description |
|-----|-------------|
| root | Badge outermost wrapper element |
| badge | Badge indicator element (count/dot) |

### Card

| Key | Description |
|-----|-------------|
| root | Card outermost wrapper element |
| header | Header section container |
| headerContent | Header title content area |
| headerExtra | Header extra content area |
| body | Main content area |
| footer | Footer section |

### Carousel

| Key | Description |
|-----|-------------|
| root | Carousel outermost wrapper element |
| slider | Slider container with overflow hidden |
| item | Each carousel slide item |
| indicator | Indicator dots/numbers container |
| indicatorItem | Each indicator element (supports functional classNames with { active } state) |
| arrow | Arrow buttons (prev/next) |

### Collapse

| Key | Description |
|-----|-------------|
| root | Collapse outermost wrapper element |
| header | Panel header section |
| title | Panel title text |
| extra | Extra content area in header |
| content | Panel expanded content area |
| icon | Expand/collapse icon |

### Descriptions

| Key | Description |
|-----|-------------|
| root | Descriptions outermost wrapper element |
| header | Header section container |
| title | Title element |
| extra | Extra content element |
| table | Table element |
| label | Description item label |
| value | Description item value |

### Empty

| Key | Description |
|-----|-------------|
| root | Empty outermost wrapper element |
| icon | Icon or image container |
| description | Description text |

### Image

| Key | Description |
|-----|-------------|
| root | Image outermost wrapper element |
| img | Image content (img element or backgroundImage container) |
| placeholder | Loading placeholder area |
| error | Error state area |

### List

| Key | Description |
|-----|-------------|
| root | List outermost wrapper element |
| item | Each list item |
| footer | Footer content area |

### Popover

| Key | Description |
|-----|-------------|
| root | Outer wrapper of the popup (equivalent to className) |
| arrow | The small arrow pointing at the trigger element |
| content | The inner content area |

### Skeleton

| Key | Description |
|-----|-------------|
| root | Skeleton outermost wrapper element |
| image | Image/avatar placeholder area |
| text | Text lines area |
| button | Button placeholder area |

### Spin

| Key | Description |
|-----|-------------|
| root | Outermost wrapper element |
| section | Loading overlay section (covers children in container mode) |
| indicator | The animated spinner indicator |
| description | The tip/description text |

### Table

| Key | Description |
|-----|-------------|
| root | Table outermost wrapper element |
| header | Table header wrapper (only in sticky/virtual mode) |
| headerRow | Table header row (tr element) |
| headerCell | Table header cell (th element) |
| bodyRow | Table body row (tr element) |
| bodyCell | Table body cell (td element) |
| footer | Table footer wrapper (only in sticky/virtual mode) |
| footerCell | Table footer cell (td element) |
| pagination | Pagination wrapper |

### Tabs

| Key | Description |
|-----|-------------|
| root | Tabs outermost wrapper element |
| header | Tab bar header area |
| tab | Each tab item |
| panel | Content panel area |
| extra | Extra content area |
| ink | Ink bar indicator (line/dash shape) |
| prev | Previous scroll button |
| next | Next scroll button |
| collapsible | Collapsible button |

### Tag

| Key | Description |
|-----|-------------|
| root | Tag outermost wrapper element |
| wrapper | Content wrapper area |
| closeIcon | Close icon button |

### Tooltip

| Key | Description |
|-----|-------------|
| root | Outer wrapper of the tooltip popup (equivalent to className) |
| arrow | The small arrow pointing at the trigger element |
| content | The inner content area |

### Tree

| Key | Description |
|-----|-------------|
| root | Tree outermost wrapper element |
| node | Each tree node wrapper |
| content | Node content area (includes checkbox and text) |
| icon | Expand/collapse icon |

### Cascader

| Key | Description |
|-----|-------------|
| root | Cascader outermost wrapper element |
| header | Header area (shows selected values / placeholder) |
| popup | Dropdown popup panel |
| list | Each column list container |
| option | List item option |

### Checkbox

| Key | Description |
|-----|-------------|
| root | Checkbox outermost wrapper element |
| indicator | Checkbox indicator area (includes the box icon) |
| label | Label text area |
| group | Checkbox.Group container |

### DatePicker

| Key | Description |
|-----|-------------|
| root | DatePicker outermost wrapper element |
| header | Header area (shows selected values / placeholder) |
| popup | Dropdown popup panel |
| popupHeader | Panel header navigation area (year/month switch arrows) |
| cell | Date/time cell |
| popupFooter | Panel footer area (confirm button, etc) |

### Form

| Key | Description |
|-----|-------------|
| root | Form outermost wrapper element (<form>) |
| item | Form.Item outermost wrapper element |
| label | Label area |
| control | Control area (contains form element, error, and tip) |
| error | Error message area |
| tip | Tip message area |

### Input

| Key | Description |
|-----|-------------|
| root | Input outermost wrapper element |
| input | Inner <input> element |

### Radio

| Key | Description |
|-----|-------------|
| root | Radio outermost wrapper element |
| indicator | Radio indicator area (includes the circle icon) |
| label | Label text area |
| group | Radio.Group container |

### Rate

| Key | Description |
|-----|-------------|
| root | Rate outermost wrapper element |
| star | Each rating item (star icon) |
| text | Auxiliary text area |

### Select

| Key | Description |
|-----|-------------|
| root | Select outermost wrapper element |
| header | Header area (shows selected values / placeholder) |
| popup | Dropdown popup panel |
| list | Options list container |
| option | Option item |
| optionInner | Option inner content area |

### Slider

| Key | Description |
|-----|-------------|
| root | Slider outermost wrapper element |
| track | Track area |
| indicator | Slider indicator (drag handle) |
| scale | Scale area |

### Switch

| Key | Description |
|-----|-------------|
| root | Switch outermost wrapper (button element) |
| indicator | Toggle indicator (circle button) |
| content | Text content area |

### Textarea

| Key | Description |
|-----|-------------|
| root | Textarea outermost wrapper element |
| textarea | Inner textarea element |

### Transfer

| Key | Description |
|-----|-------------|
| root | Transfer outermost wrapper element |
| header | Panel header area (includes select-all + title) |
| list | List container |
| item | Individual list item |
| operations | Middle operation buttons area |

### TreeSelect

| Key | Description |
|-----|-------------|
| root | TreeSelect outermost wrapper element |
| header | Header area (shows selected values / placeholder) |
| popup | Dropdown popup panel |
| list | Tree list container |
| option | Tree node option |

### Upload

| Key | Description |
|-----|-------------|
| root | Upload outermost wrapper element |
| handler | Upload trigger area (button / image add box) |
| item | Uploaded file result item |

### Alert

| Key | Description |
|-----|-------------|
| root | Outermost wrapper element (equivalent to className) |
| icon | Icon area |
| title | Title element |
| content | Content text area |
| close | Close button |

### Drawer

| Key | Description |
|-----|-------------|
| root | Outermost wrapper (controls animation and visibility) |
| mask | Mask overlay layer |
| container | Content panel |
| header | Header area |
| body | Body content area |
| footer | Footer action area |
| close | Close button |

### Message

| Key | Description |
|-----|-------------|
| root | Outermost wrapper (position-based message container) |
| item | Individual message wrapper (animation controller) |
| message | Message content area (Alert wrapper) |

### Modal

| Key | Description |
|-----|-------------|
| root | Outermost wrapper (controls animation and visibility) |
| mask | Mask overlay layer |
| container | Content panel |
| header | Header area (contains title and close button) |
| body | Body content area |
| footer | Footer action area |
| close | Close button |

### Progress

| Key | Description |
|-----|-------------|
| root | Outermost wrapper element |
| track | Background track (bar background for line; background circle for circle) |
| indicator | Progress indicator (foreground bar for line; foreground arc for circle) |
| content | Content area where children are rendered |
| icon | Status icon area |
