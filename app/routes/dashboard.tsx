import type { MetaFunction } from "@vercel/remix";
import { LoaderFunction } from "@vercel/remix";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - User Management" },
    { name: "description", content: "Welcome to User Mangement!" },
  ];
};

export default function Dashboard() {
  return (
    <div className="flex h-screen items-center justify-center">
      Sucessfully signed in.
    </div>
  );
}
