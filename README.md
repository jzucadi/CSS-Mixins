# CSS Mixins

A curated collection of reusable CSS preprocessor mixins and utilities for Sass, SCSS, and Stylus. This library includes common UI patterns, grid systems, and helper functions to streamline your CSS development workflow.

### Core Mixins

#### SCSS (`_mixins.scss`)
- **Transitions** - Quick transition mixin with configurable duration
- **List Resets** - Remove default list styling, margins, and padding
- **Hover Effects** - Lighten or darken backgrounds on hover
- **Typography** - Reusable font mixins with optional color
- **Opacity** - Cross-browser opacity (including IE8 support)
- **REM Calculator** - Font sizes in REMs with pixel fallback
- **Gradients** - Simplified gradient syntax (requires Compass)

#### Stylus (`_mixins.styl`)
- **Material Design Shadows** - 5 elevation levels plus inset shadows
- **Triangle Generator** - Create CSS triangles in any direction (up, down, left, right, and diagonals)
- **Transitions** - Smooth easing transitions
- **List Resets** - Clean list styling
- **Hover Effects** - Interactive color changes
- **Z-index System** - Predefined z-index hierarchy
- **Social Media Colors** - Brand color constants (Twitter, Facebook, Google, YouTube)

### Grid Systems

- **Jeet Grid** (`_grid.scss`, `_grid.styl`) - Lightweight fraction-based grid system
- **Lost Grid** (`_grid_lost.scss`) - PostCSS-based grid using calc()

### UI Components & Utilities

- **Aspect Ratio** (`aspect_ratio.scss`, `aspect_ratio.html`) - Maintain responsive aspect ratios
- **Burger Menu** (`burger_menu.html`) - Animated hamburger menu implementation
- **Hover Effects** (`hover.styl`) - Additional hover state utilities

### JavaScript Utilities

- **Lazy Loading** (`lazyload.ts`) - TypeScript lazy load implementation
- **Element Selection** (`select.ts`) - DOM selection helper
- **XHR Demo** (`xhr_demo.ts`) - AJAX request example

## Usage

### SCSS Example
```scss
@import 'mixins';

.button {
  @include trans(0.3s);
  @include hovDark(#3498db);
  @include font-size(16px);
}
```

### Stylus Example
```stylus
@import '_mixins'

.card
  shadow-level(2)
  trans(0.4s)
  
.arrow
  triangle('right', 10px, #333)
```

### Grid System
```scss
@import 'grid';

.container {
  @include column(1/2);
}
```

## Features

- **Multi-preprocessor Support** - Works with Sass, SCSS, and Stylus
- **Production-Ready** - Battle-tested mixins for real-world projects
- **Modular** - Import only what you need
- **Well-Documented** - Inline comments explain each mixin's purpose
- **Modern & Legacy** - Includes fallbacks for older browsers

## License

Open source - feel free to use in your projects.
