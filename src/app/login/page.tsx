import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="grid min-h-svh w-full bg-background lg:grid-cols-[30%_70%]">
      <div className="flex flex-col p-6">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block" />
    </div>
  );
}
