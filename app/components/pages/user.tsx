import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function User() {
  return (
    <Card className="w-max">
      <CardHeader>
        <CardTitle>Update your profile</CardTitle>
        <CardDescription>
          Please make sure to update with the correct information.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
