import type { MetaFunction } from "@vercel/remix";
import { LoaderFunction, ActionFunction, json } from "@vercel/remix";
import { requireUserId, getUser, logout } from "~/utils/auth.server";
import { get_all_users, delete_user, update_user } from "~/utils/user.server";
import { useLoaderData, redirect, Outlet } from "@remix-run/react";
import Admin from "~/components/pages/admin";
import DashboardLayout from "~/components/layout";
import {
  validateDob,
  validateName,
  validateEmail,
  validateRole,
} from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const user = await getUser(request);
  if (user?.role != "ADMIN") {
    throw redirect("/dashboard");
  }
  return { user, allUsers: await get_all_users() };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("_action");

  if (action === "logout") {
    return await logout(request);
  }

  if (action === "update") {
    const id = formData.get("id");
    if (typeof id !== "string") {
      return json({ error: "Invalid Request" }, { status: 400 });
    }
    const email = formData.get("email");
    const name = formData.get("name");
    const dob = formData.get("dob");
    const role = formData.get("role");
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof dob !== "string" ||
      typeof role !== "string"
    ) {
      return json(
        { error: `Invalid Form Data`, form: action },
        { status: 400 }
      );
    }

    const error =
      validateEmail(email) ||
      validateName(name) ||
      validateDob(dob) ||
      validateRole(role);
    if (error) {
      return json({ error }, { status: 400 });
    }

    return await update_user(id, { email, name, dob, role });
  }

  if (action === "delete") {
    const id = formData.get("id");
    if (typeof id !== "string") {
      return json({ error: "Invalid Request" }, { status: 400 });
    }
    await delete_user(id);
    return redirect("/dashboard");
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Admin - User Management" },
    { name: "description", content: "Welcome to User Mangement!" },
  ];
};

export default function AdminPanel() {
  const { allUsers } = useLoaderData<typeof loader>();
  return (
    <DashboardLayout>
      <div className="flex h-full items-center justify-center">
        <Admin users={allUsers} />
        <Outlet />
      </div>
    </DashboardLayout>
  );
}
