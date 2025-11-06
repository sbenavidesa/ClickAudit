import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siGithub } from "simple-icons";

import { useState } from "react";
import { authClient } from "./client";


interface LoginPopupProps {
  children: React.ReactNode;
}

export function LoginPopup({ children }: LoginPopupProps) {
  const [loading, setLoading] = useState(false);
    const signInWithGithub = async () => {
        setLoading(true);
        try {
            const response = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/app",
            });

            // Type guard: check if 'url' exists
            if ("url" in response && response.url) {
                // @ts-ignore
                window.location.href = response.url;
            } else if ("user" in response) {
                // Already signed in? Maybe redirect manually
                window.location.href = "/app";
            } else {
                throw new Error("Unexpected auth response");
            }
        } catch (error) {
            console.error("GitHub sign-in error:", error);
            // Handle error (e.g., toast)
        } finally {
            setLoading(false);
        }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-2xl font-bold">
            Continue with Github
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Login or signup by continuing with Github
          </p>
        </DialogHeader>

        <div className="mt-6">
          <Button
            onClick={signInWithGithub}
            variant="outline"
            className="w-full h-12 text-base font-medium relative overflow-hidden group hover:bg-accent/50 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 mr-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={siGithub.path} />
                </svg>
                Continue with Github
              </>
            )}
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
