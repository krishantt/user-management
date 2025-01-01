import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import {
  LoaderFunction,
  LoaderFunctionArgs,
  ActionFunction,
  json,
  redirect,
} from "@vercel/remix";
import { requireUserId } from "~/utils/auth.server";
import { get_user_by_id, update_user, delete_user } from "~/utils/user.server";
import {
  validateEmail,
  validateName,
  validateDob,
  validateRole,
} from "~/utils/validators.server";

import { UpdateForm } from "~/components/admin/update-form";
import { useLoaderData, useNavigate, useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  await requireUserId(request);
  const { id } = params;
  const user = await get_user_by_id(id as string);
  if (!user) {
    return json({ message: "User not found", success: false }, { status: 404 });
  }
  return { user };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("_action");

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
      return json({ message: error, success: false }, { status: 400 });
    }

    await update_user(id, { email, name, dob, role });
    return json({ message: "User updated.", success: true }, { status: 200 });
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

export default function EditDialog() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate("/dashboard");
    }
  };
  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UpdateForm
          user={user}
          message={actionData?.message}
          success={actionData?.success}
          showRole={user.role != "ADMIN"}
        />
      </DialogContent>
    </Dialog>
  );
}
