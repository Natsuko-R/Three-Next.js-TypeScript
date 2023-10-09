import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import BoxInfo from "./BoxInfo";


interface PopoverProps {
    box: BoxInfo | null;
}

const ShowPopover: React.FC<PopoverProps> = ({ box }) => {
    if (!box) {
        return null;
    }

    return (
        <div className="container mx-auto">

            <Popover>
                <PopoverTrigger>
                    Open
                </PopoverTrigger>
                <PopoverContent>
                    <h2>ID: {box.id}</h2>
                    <p>Name: {box.name}</p>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default ShowPopover