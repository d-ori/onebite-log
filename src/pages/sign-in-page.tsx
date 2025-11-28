import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import githubLogo from "@/assets/github-mark.svg";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignwithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });
  const { mutate: signInwithOAuth, isPending: isSignInWithOAuthPeding } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithGithubClick = () => {
    signInwithOAuth("github");
  };

  const isPending = isSignwithPasswordPending || isSignInWithOAuthPeding;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={handleSignInClick}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          disabled={isPending}
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGithubClick}
        >
          <img src={githubLogo} className="h-4 w-4" /> Github 계정으로 로그인
        </Button>
      </div>
      <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
        계정이 없으시다면? 회원가입
      </Link>
    </div>
  );
}
