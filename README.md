# vite-plugin-optimize-image

🚀 A Vite plugin that automatically converts `.jpg`, `.jpeg`, and `.png` image references to `.webp` format in both source code and built files, but only applies in production mode. Now supports configurable output directory!

## 📌 Features

- Replaces image references in source code to use `.webp`
- Converts actual image files in the `dist` directory (or custom directory) to `.webp`
- Recursively processes directories (excluding `/assets`)
- **Applies only in production mode**
- Supports **customizable output directory**

## 📞 Installation

```sh
npm install vite-plugin-optimize-image --save-dev
```

or

```sh
yarn add vite-plugin-optimize-image -D
```

## 🚀 Usage

### Vite Configuration (`vite.config.ts`)

Add the plugin to your Vite configuration:

```ts
import { defineConfig } from "vite";
import optimizeImagePlugin from "vite-plugin-optimize-image";

export default defineConfig({
  plugins: [optimizeImagePlugin()],
});
```

### With Custom Output Directory

You can specify a custom output directory instead of the default `dist`:

```ts
export default defineConfig({
  plugins: [optimizeImagePlugin({ distDir: "custom-output" })],
});
```

## 📝 How It Works

1. The plugin **only applies in production mode** to avoid modifying images during development.
2. During the transformation phase, the plugin updates image file references in the source code from `.jpg`, `.jpeg`, and `.png` to `.webp`.
3. During the `closeBundle` phase, it recursively scans the specified output directory (`dist` by default) and renames actual image files to `.webp`.
4. The `/assets` directory is ignored to avoid unnecessary modifications.

### Example:

#### Original source code:

```ts
const imgSrc = "./images/sample.png";
```

#### Transformed source code (only in production mode):

```ts
const imgSrc = "./images/sample.webp";
```

#### Before build (file structure in default `dist`):

```
dist/
  images/
    sample.png
```

#### After build (file structure, only in production mode):

```
dist/
  images/
    sample.webp
```

## 🛠️ Plugin Options

| Option    | Type     | Default  | Description                             |
| --------- | -------- | -------- | --------------------------------------- |
| `distDir` | `string` | `"dist"` | Custom output directory for built files |

## 💜 License

MIT

## 📩 Contributing

Feel free to open issues or pull requests if you have suggestions or improvements! 🚀

### Author

- Maintainer: [yunseul lee](https://github.com/yunzzng)
- Email: yun.zzang9.me@gmail.com