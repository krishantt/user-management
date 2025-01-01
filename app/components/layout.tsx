import Header from "./section/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen max-h-screen p-4 bg-gray-200 overflow-clip">
      <Header />
      <main className="m-6 max-w-full max-h-full h-full">{children}</main>
    </div>
  );
}
