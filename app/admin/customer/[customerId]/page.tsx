import { CustomerClient } from "./components/customer-client"
import { Box } from "@/components/custom-ui/box"

interface CustomerPageProps {
    params: {
        customerId: string
    }
}

const CustomerPage: React.FC<CustomerPageProps> = ({ params: { customerId } }) => {
    return (
        <Box className="p-4 w-full flex-col gap-4 max-w-screen-2xl">
            <CustomerClient customerId={customerId} />
        </Box>
    );
};

export default CustomerPage