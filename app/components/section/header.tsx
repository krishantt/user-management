import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="flex justify-between items-center shadow-lg p-4 mx-6 rounded-xl border-gray-100 bg-blue-700">
      <p className="font-bold text-xl text-white">User Management Portal</p>
      <form method="POST" className="flex gap-x-4">
        <input type="hidden" name="_action" value="logout" />
        <Button className="bg-blue-700 hover:bg-gray-100 hover:text-black">
          <LogOut /> Log Out
        </Button>
      </form>
    </div>
  );
}
