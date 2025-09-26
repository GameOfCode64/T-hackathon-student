import { Button } from "@/components/ui/button";
import { SignIn, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <Link href="/sign-in">
  <Button>
    Sign In
  </Button>
  </Link>
    </main>
  );
}
