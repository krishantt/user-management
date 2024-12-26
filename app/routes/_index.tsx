import type { MetaFunction } from "@remix-run/node";
import { LayoutDashboard, LogIn } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "User Management" },
    { name: "description", content: "Welcome to User Mangement!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h2 className="leading text-2xl text-gray-800">
            Welcome to 
          </h2>
          <h1 className="text-4xl font-semibold">User Management Portal</h1>
          <div className="h-[144px] w-[434px] mb-16">
            <img src="/home.png" alt="Remix" className="block w-full" />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
          <ul>
            {resources.map(({ href, text, icon }) => (
              <li key={href}>
                <a
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {icon}
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

const resources = [
  {
    href: "/login",
    text: "Login/ Signup",
    icon: <LogIn />,
  },
  {
    href: "/dashboard",
    text: "Dashboard",
    icon: <LayoutDashboard />,
  },
];
