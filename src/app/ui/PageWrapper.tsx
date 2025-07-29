import { Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC, ReactNode } from "react";

export namespace FormWrapper {
	export interface Props {
		title: string;
		hint?: string;
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
				<h1
					className={tvc([
						"text-3xl",
						"font-bold",
						"text-gray-900",
						"mb-2",
					])}
				>
					<Tx label={title} />
				</h1>
				{hint && (
					<p
						className={tvc([
							"text-gray-600",
							"text-lg",
						])}
					>
						<Tx label={hint} />
					</p>
				)}
			</div>

			{children}
		</div>
	);
};
