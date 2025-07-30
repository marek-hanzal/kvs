import { Button, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { DateRangeSchema } from "~/app/schema/DateRangeSchema";

export namespace DateRangeToolbar {
	export interface Props {
		accountToType?: DateRangeSchema.Type;
		onRangeClick(accountToType: DateRangeSchema.Type): void;
	}
}

export const DateRangeToolbar: FC<DateRangeToolbar.Props> = ({
	accountToType,
	onRangeClick,
}) => {
	return (
		<>
			<Button
				variant={{
					size: "sm",
					variant:
						accountToType === "current-month" ? "primary" : "light",
				}}
				onClick={() => onRangeClick("current-month")}
			>
				<Tx label="Current month" />
			</Button>
			<Button
				variant={{
					size: "sm",
					variant:
						accountToType === "last-month" ? "primary" : "light",
				}}
				onClick={() => onRangeClick("last-month")}
			>
				<Tx label="Last month" />
			</Button>
			<Button
				variant={{
					size: "sm",
					variant:
						accountToType === "last-three-months"
							? "primary"
							: "light",
				}}
				onClick={() => onRangeClick("last-three-months")}
			>
				<Tx label="Last three months" />
			</Button>
			<Button
				variant={{
					size: "sm",
					variant:
						accountToType === "last-half-year"
							? "primary"
							: "light",
				}}
				onClick={() => onRangeClick("last-half-year")}
			>
				<Tx label="Last half a year" />
			</Button>
		</>
	);
};
