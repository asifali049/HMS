import "./globals.css";
import QueryProvider from "@/providers/react-query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}