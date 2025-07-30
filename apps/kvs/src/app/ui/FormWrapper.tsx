import { tvc } from "@use-pico/common";
import type { FC, ReactNode } from "react";

export namespace FormWrapper {
	export interface Props {
		title: ReactNode;
		hint?: ReactNode;
		children: ReactNode;
	}
}

export const FormWrapper: FC<FormWrapper.Props> = ({
	title,
	hint,
	children,
}) => {
	return (
		<div
			className={tvc([
				"mx-auto",
				"w-1/2",
				"p-6",
			])}
		>
			<div
				className={tvc([
					"mb-8",
					"text-center",
				])}
			>
				<div
					className={tvc([
						"text-3xl",
						"font-bold",
						"text-gray-900",
						"mb-2",
					])}
				>
					{title}
				</div>
				{hint && (
					<div
						className={tvc([
							"text-gray-600",
							"text-lg",
						])}
					>
						{hint}
					</div>
				)}
			</div>

			{children}
		</div>
	);
};
