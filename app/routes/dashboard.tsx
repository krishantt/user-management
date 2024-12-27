import type { MetaFunction } from "@vercel/remix";
import { LoaderFunction } from "@vercel/remix";
import { requireUserId, getUser } from "~/utils/auth.server";
import { get_all_users } from "~/utils/user.server";
import { useLoaderData } from "@remix-run/react";
import Admin from "~/components/pages/admin";
import User from "~/components/pages/user";
import DashboardLayout from "~/components/layout";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const user = await getUser(request);
  if (user?.role == 'ADMIN'){
    return { user, allUsers: await get_all_users() };
  }
  return user ? { user } : null;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - User Management" },
    { name: "description", content: "Welcome to User Mangement!" },
  ];
};

export default function Dashboard() {
  const { user, allUsers } = useLoaderData<typeof loader>();
  return (
    <DashboardLayout>
      <div className="flex h-full items-center justify-center">
        {user.role === "ADMIN" ? <Admin users={allUsers}/> : <User />}
      </div>
    </DashboardLayout>
  );
}
