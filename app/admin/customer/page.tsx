import { SearchHeader } from "./components/table-header"
import { CustomerTable } from "./components/list-table"
import { Box } from "@/components/custom-ui/box"

const CustomerListPage = () => {
    return (
        <Box className="p-4 flex-col w-full items-center space-y-4 h-full max-w-screen-2xl">
            <SearchHeader />
            <CustomerTable />
        </Box>
    );
};

export default CustomerListPage