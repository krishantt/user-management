import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import { User } from "~/types/user";
import { Link } from "@remix-run/react";

export function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => (
          <TableRow key={user.name}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.dob.toISOString().split("T")[0]}</TableCell>
            <TableCell>{user.createdAt.toISOString().split("T")[0]}</TableCell>
            <TableCell>{user.updatedAt.toISOString().split("T")[0]}</TableCell>
            <TableCell className="capitalize">
              {user.role.toLowerCase()}
            </TableCell>
            <TableCell className="flex gap-x-2 items-end">
              {user.role !== "ADMIN" && (
                <>
                  <Link to={`/admin/edit/${user.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil />
                    </Button>
                  </Link>
                  <form method="POST">
                    <input type="hidden" name="_action" value="delete" />
                    <input type="hidden" name="id" value={user.id} />
                    <Button variant="destructive" size="icon" type="submit">
                      <Trash />
                    </Button>
                  </form>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Users</TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
