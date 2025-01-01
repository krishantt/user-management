import type { MetaFunction } from "@vercel/remix";
import { LoaderFunction, ActionFunction, json } from "@vercel/remix";
import { requireUserId, getUser, logout } from "~/utils/auth.server";
import { delete_user, update_user } from "~/utils/user.server";
import { useLoaderData, redirect, useActionData } from "@remix-run/react";
import DashboardLayout from "~/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UpdateForm } from "~/components/admin/update-form";
import {
  validateDob,
  validateName,
  validateEmail,
  validateRole,
} from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const user = await getUser(request);
  if (user?.role != "USER") {
    throw redirect("/admin");
  }
  return { user };
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
      return json(
        { message: "Invalid Request", success: false },
        { status: 400 }
      );
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
        { message: `Invalid Form Data`, success: false },
        { status: 400 }
      );
    }

    const error =
      validateEmail(email) ||
      validateName(name) ||
      validateDob(dob) ||
      validateRole(role);
    if (error) {
      return json({ message: "Invalid Data", success: false }, { status: 400 });
    }

    await update_user(id, { email, name, dob, role });
    return json(
      { message: "Profile Updated Sucessfully", success: true },
      { status: 200 }
    );
  }

  if (action === "delete") {
    const id = formData.get("id");
    if (typeof id !== "string") {
      return json(
        { message: "Invalid Request", success: "False" },
        { status: 400 }
      );
    }
    await delete_user(id);
    return redirect("/dashboard");
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - User Management" },
    { name: "description", content: "Welcome to User Mangement!" },
  ];
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <DashboardLayout>
      <div className="flex h-full items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Update your profile</CardTitle>
            <CardDescription>
              Please make sure to update with the correct information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateForm
              user={user}
              message={actionData?.message}
              success={actionData?.success}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
