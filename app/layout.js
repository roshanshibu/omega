import "./globals.css";

const APP_NAME = "Omega";
const APP_DEFAULT_TITLE = "Omega: Shopping List";
const APP_TITLE_TEMPLATE = "%s - Shopping List App";
const APP_DESCRIPTION = "Project Omega description here";

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
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
