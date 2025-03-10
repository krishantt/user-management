import type { MetaFunction } from "@vercel/remix";
import { useEffect, useRef, useState } from "react";
import { FormField } from "~/components/form-field";
import { getUser, loginUser, registerUser } from "~/utils/auth.server";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ActionFunction, LoaderFunction, redirect, json } from "@vercel/remix";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateDob,
} from "~/utils/validators.server";
import { useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/dashboard") : null;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Login/Signup - User Management" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let name = form.get("name");
  let dob = form.get("dob");
  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }
  if (
    action === "register" &&
    typeof name !== "string" &&
    typeof dob !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  name = name as string;
  dob = dob as string;
  const error =
    action === "login"
      ? validateEmail(email) || validatePassword(password)
      : validateEmail(email) ||
        validatePassword(password) ||
        validateName(name) ||
        validateDob(dob);
  if (error) {
    return json({ error: error }, { status: 400 });
  }

  switch (action) {
    case "login":
      return await loginUser({ email, password });
    case "signup": {
      return await registerUser({ email, password, name, dob });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const firstLoad = useRef(true);
  const [formError, setFormError] = useState(actionData?.error || "");

  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        name: "",
        dob: "",
      };
      setFormError("");
      setFormData(newState);
    }
  }, [action]);
  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <div className="flex gap-x-16 h-screen items-center justify-start">
      <div className="px-16 text-4xl font-extrabold w-1/2 bg-blue-700 h-full flex flex-col items-start justify-center">
        <h2 className="leading text-2xl text-white">Welcome to</h2>
        <h1 className="text-4xl font-semibold text-white">
          User Management Portal
        </h1>
      </div>
      <div className="w-1/2 space-y-8">
        <Tabs defaultValue={action} className="min-w-full">
          <TabsList>
            <TabsTrigger value="login" onClick={() => setAction("login")}>
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" onClick={() => setAction("signup")}>
              Sign Up
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Card className="w-11/12">
          <CardHeader>
            <CardTitle>{action == "login" ? "Login" : "Sign Up"}</CardTitle>
            <CardDescription>
              {action == "login"
                ? "Login to your exisitng account."
                : "Create a new account."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form method="POST" className="space-y-4">
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <FormField
                htmlFor="email"
                label="Email"
                value={formData.email}
                placeholder="johndoe@gmail.com"
                onChange={(e) => handleInputChange(e, "email")}
              />
              <FormField
                htmlFor="password"
                label="Password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
              />
              {action === "signup" && (
                <>
                  <FormField
                    htmlFor="name"
                    label="Name"
                    onChange={(e) => handleInputChange(e, "name")}
                    value={formData.name}
                    placeholder="John Doe"
                  />
                  <FormField
                    htmlFor="dob"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    value={formData.dob}
                    onChange={(e) => handleInputChange(e, "dob")}
                  />
                </>
              )}
              <Button type="submit" name="_action" value={action} className="bg-blue-700">
                {action === "login" ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
