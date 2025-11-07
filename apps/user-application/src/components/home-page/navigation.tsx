import { Button } from "@/components/ui/button";
import { LoginPopup } from "@/components/auth/login-popup";
import { UserCircle } from "@/components/auth/user-icon";
import { authClient } from "@/components/auth/client";
import {IconClick} from "@tabler/icons-react";

export function Navigation() {
  const { data: user, isPending } = authClient.useSession();

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full px-4">
      <div className="bg-background/80 backdrop-blur-md border border-border/50  px-6 py-3">
        <div className="flex items-center justify-between  max-w-4xl  mx-auto">
          {/* Company Logo/Name */}
          <div className="flex items-center gap-1">
              <span className="text-primary-foreground font-bold text-sm">
                 <IconClick className="size-6 scale-x-[-1]" />
              </span>
            <span className="font-semibold text-foreground">ClickAudit</span>
          </div>
          {isPending ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserCircle />
          ) : (
            <LoginPopup>
              {/* Login Button */}
              <Button
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/80"
              >
                Login
              </Button>
            </LoginPopup>
          )}
        </div>
      </div>
    </nav>
  );
}
