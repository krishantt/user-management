import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UserTable } from "~/components/admin/user-table";
import { User } from "~/types/user";

export default function Admin({ users }: { users: User[] }) {
  return (
    <div className="flex flex-col gap-y-4 w-full items-center">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <Card className="w-11/12 items-center">
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>
            Please make sure to update with the correct information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users ? <UserTable users={users} /> : "No users found."}
        </CardContent>
      </Card>
    </div>
  );
}
