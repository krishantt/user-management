import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { useState } from "react";

import { User } from "~/types/user";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function UpdateForm({
  user,
  showRole = false,
  message = "",
  success = false,
}: {
  user: User;
  showRole?: boolean;
  message?: string;
  success?: boolean;
}) {
  const [userState, setUserState] = useState<User>(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <form method="POST" className="grid gap-4 py-4">
      {message && (
        <p
          className={cn("text-sm", success ? "text-green-500" : "text-red-500")}
        >
          {message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="name" className="text-right">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={userState.name}
          className="col-span-3 bg-white border border-gray-300 rounded-md px-3 py-2"
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="email" className="text-right">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={userState.email}
          className="col-span-3 bg-white border border-gray-300 rounded-md px-3 py-2"
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="dob" className="text-right">
          DOB
        </label>
        <input
          id="dob"
          name="dob"
          value={userState.dob.toISOString().split("T")[0]}
          className="col-span-3 bg-white border border-gray-300 rounded-md px-3 py-2"
          onChange={handleInputChange}
        />
      </div>
      {showRole && (
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="role" className="text-right">
            Role
          </label>
          <Select
            value={userState.role}
            onValueChange={(value) => {
              setUserState({ ...userState, role: value });
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      <input type="hidden" name="id" value={userState.id} />
      <input type="hidden" name="role" value={userState.role} />
      <input type="hidden" name="_action" value="update" />
      <Button type="submit">Save changes</Button>
    </form>
  );
}
