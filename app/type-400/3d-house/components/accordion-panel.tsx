
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { CreateObject } from "./create-object";
// import { CreateHouse } from "./create-house";

export const AccordionPanel = () => {

	return (
		<Accordion type="single" collapsible>
			{/* <AccordionItem value="item-1">
				<AccordionTrigger>ハウスオブジェクト作成</AccordionTrigger>
				<AccordionContent>
					<CreateHouse />
				</AccordionContent>
			</AccordionItem> */}

			<AccordionItem value="item-2">
				<AccordionTrigger>オブジェクト作成</AccordionTrigger>
				<AccordionContent>
					<CreateObject />
				</AccordionContent>
			</AccordionItem>
		</Accordion>

	);
};