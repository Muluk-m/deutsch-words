import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";
import { initializeApp } from "./utils/initializeApp";
import { WordsProvider } from "./contexts/WordsContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // PWA manifest
  { rel: "manifest", href: "/manifest.webmanifest" },
  // Icons
  { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/icons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/icons/favicon-16x16.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/icons/apple-touch-icon.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#4f46e5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Deutsche Drill" />
        <meta name="application-name" content="Deutsche Drill" />
        <meta
          name="description"
          content="德语词汇学习与练习应用，支持SRS间隔重复记忆"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // 初始化应用（仅在客户端执行一次）
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeApp();

      // 注册 Service Worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[PWA] Service Worker registered:", registration.scope);

            // 检查更新
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    // 新版本已安装，可以提示用户刷新
                    console.log("[PWA] New version available!");
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error("[PWA] Service Worker registration failed:", error);
          });
      }
    }
  }, []);

  return (
    <WordsProvider>
      <Outlet />
    </WordsProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
