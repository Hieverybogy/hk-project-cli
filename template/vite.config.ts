import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    target: "es2015",
    outDir: "dist", // 指定输出路径
    assetsDir: "static", // 指定生成静态资源的存放路径
    sourcemap: false, // 输出.map文件
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true, // 生产环境移除debugger
      },
    },
  },
  server: {
    port: 3000,
    open: true, // 设置服务启动时是否自动打开浏览器
    proxy: {
      // '/api': 'http://localhost:8000',
    },
  },
});
