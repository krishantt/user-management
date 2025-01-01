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
    <div className="flex flex-col pb-8 w-full items-center h-full">
      {/* <div className="flex justify-center items-center w-full">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div> */}
      <Card className="w-full items-center max-h-[90%] p-0">
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>
            Please make sure to update with the correct information.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[95%]">
          {users ? <UserTable users={users} /> : "No users found."}
        </CardContent>
      </Card>
    </div>
  );
}
