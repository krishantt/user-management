import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="flex justify-between items-center shadow-lg p-4 rounded-xl border-gray-100 bg-white">
      <p className="font-bold text-xl">User Management Portal</p>
      <form method="POST" className="flex gap-x-4">
        <input type="hidden" name="_action" value="logout" />
        <Button>
          <LogOut /> Log Out
        </Button>
      </form>
    </div>
  );
}
