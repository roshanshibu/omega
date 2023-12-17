import "./globals.css";

const APP_NAME = "Lizt";
const APP_DEFAULT_TITLE = "Lizt: Shopping List";
const APP_TITLE_TEMPLATE = "%s - Shopping List App";
const APP_DESCRIPTION = "A small shopping list PWA";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FFFDF5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
