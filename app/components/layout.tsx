import Header from "./section/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen p-4 bg-gray-200">
      <Header />
      <div className="flex">
        <main className="p-4 mt-4 ml-4 w-full">{children}</main>
      </div>
    </div>
  );
}
