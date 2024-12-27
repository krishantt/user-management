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
import { Pencil, Trash } from "lucide-react";
import { User } from "~/types/user";

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
            <TableCell>{user.role}</TableCell>
            <TableCell className="flex gap-x-2">
              {user.role !== "ADMIN" && (
                <>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                  >
                    <Trash />
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Users</TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
