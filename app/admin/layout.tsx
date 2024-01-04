import { withAuthGuard } from "@/hocs/with-auth-guard"

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> =
    // withAuthGuard(
    ({ children }) => {
        return (
            <>
                <div>HEADER</div>
                <div className="flex flex-1 flex-col h-full min-h-full items-center">
                    <div className="flex-1 flex-col flex w-full items-center">
                        {children}
                    </div>
                </div>
                <div>FOOTER</div>
            </>
        )
    }
// )

export default AdminLayout