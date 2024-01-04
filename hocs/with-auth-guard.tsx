import { AuthGuard } from "@/guards/auth-guard"
import { PropsWithChildren } from "react";

export const withAuthGuard =
    (Component: React.FC<PropsWithChildren>) => (props: PropsWithChildren) => {
        <AuthGuard>
            <Component {...props} />
        </AuthGuard>
    }