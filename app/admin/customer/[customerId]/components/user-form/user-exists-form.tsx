import { Box } from "@/components/custom-ui/box"

interface UserExistsFormProps {
    title: string
}

export const UserExistsForm: React.FC<UserExistsFormProps> = ({ title }) => {


    return (
        <Box>
            UserExistsForm
            <Box>{title}</Box>
        </Box>
    )
}
