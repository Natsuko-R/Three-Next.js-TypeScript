import React, { useCallback, useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [visible, setVisible] = useState(false);

		const handleVisible = useCallback(() => {
			setVisible((prev) => !prev);
		}, []);

		return (
			<div className="relative">
				<input
					type={visible ? "text" : "password"}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				{visible ? (
					<EyeOpenIcon
						className="absolute h-4 w-4 top-3 right-3 cursor-pointer select-none"
						onClick={handleVisible}
					/>
				) : (
					<EyeClosedIcon
						className="absolute h-4 w-4 top-3 right-3 cursor-pointer select-none"
						onClick={handleVisible}
					/>
				)}
			</div>
		);
	}
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
