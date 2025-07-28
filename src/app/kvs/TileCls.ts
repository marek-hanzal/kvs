import { cls } from "@use-pico/common";

export const TileCls = cls({
	slot: {
		base: [
			"bg-white",
			"rounded-xl",
			"border",
			"border-slate-200",
			"p-6",
			"h-full",
			"w-full",
			"overflow-hidden",
		],
		content: [
			"text-center",
			"flex",
			"flex-col",
			"h-full",
			"w-full",
		],
		iconContainer: [
			"w-12",
			"h-12",
			"bg-slate-100",
			"rounded-full",
			"flex",
			"items-center",
			"justify-center",
			"mx-auto",
			"mb-4",
			"p-3",
			"flex-shrink-0",
		],
		icon: [
			"w-6",
			"h-6",
			"text-slate-400",
		],
		textContainer: [
			"mb-4",
			"flex-1",
			"min-w-0",
			"w-full",
		],
		title: [
			"text-xl",
			"font-semibold",
			"text-slate-800",
			"mb-2",
			"break-words",
			"overflow-wrap-break-word",
			"word-break-break-word",
			"whitespace-normal",
		],
		description: [
			"text-sm",
			"text-slate-600",
			"break-words",
			"overflow-wrap-break-word",
			"word-break-break-word",
			"whitespace-normal",
		],
	},
	variant: {
		disabled: {
			true: [],
		},
	},
	match: [
		{
			if: {
				disabled: true,
			},
			do: {
				base: [
					"bg-white",
					"rounded-xl",
					"border",
					"border-slate-200",
					"p-6",
					"opacity-60",
					"h-full",
					"w-full",
					"overflow-hidden",
				],
				content: [
					"text-center",
					"flex",
					"flex-col",
					"h-full",
					"w-full",
				],
				iconContainer: [
					"w-12",
					"h-12",
					"bg-slate-100",
					"rounded-full",
					"flex",
					"items-center",
					"justify-center",
					"mx-auto",
					"mb-4",
					"p-3",
					"flex-shrink-0",
				],
				icon: [
					"w-6",
					"h-6",
					"text-slate-400",
				],
				textContainer: [
					"mb-4",
					"flex-1",
					"min-w-0",
					"w-full",
				],
				title: [
					"text-xl",
					"font-semibold",
					"text-slate-400",
					"mb-2",
					"break-words",
					"overflow-wrap-break-word",
					"word-break-break-word",
					"whitespace-normal",
				],
				description: [
					"text-sm",
					"text-slate-400",
					"break-words",
					"overflow-wrap-break-word",
					"word-break-break-word",
					"whitespace-normal",
				],
			},
		},
	],
	defaults: {
		disabled: false,
	},
});

export type TileCls = typeof TileCls;

export namespace TileCls {
	export type Props<P = unknown> = cls.Props<TileCls, P>;
}
