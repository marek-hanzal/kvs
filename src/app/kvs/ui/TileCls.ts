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
			"transition-all",
			"duration-200",
			"hover:shadow-lg",
			"hover:border-slate-300",
			"hover:scale-105",
			"[&>a]:block",
			"[&>a]:w-full",
			"[&>a]:h-full",
			"[&>a]:no-underline",
			"[&>a]:text-inherit",
		],
		content: [
			"text-center",
			"flex",
			"flex-col",
			"h-full",
			"gap-4",
		],
		iconContainer: [
			"w-12",
			"h-12",
			"bg-blue-100",
			"rounded-full",
			"border",
			"border-blue-500",
			"flex",
			"items-center",
			"justify-center",
			"mx-auto",
			"flex-shrink-0",
		],
		icon: [
			"w-6",
			"h-6",
			"text-blue-500",
		],
		textContainer: [
			"flex-1",
			"min-w-0",
		],
		title: [
			"text-xl",
			"font-semibold",
			"text-slate-800",
			"break-words",
			"overflow-wrap-break-word",
			"word-break-break-word",
			"whitespace-normal",
			"w-full",
		],
		description: [
			"text-sm",
			"text-slate-600",
			"break-words",
			"overflow-wrap-break-word",
			"word-break-break-word",
			"whitespace-normal",
			"w-full",
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
					"opacity-60",
					"hover:shadow-none",
					"hover:border-slate-200",
					"hover:scale-100",
					"cursor-not-allowed",
				],
				iconContainer: [
					"bg-slate-100",
					"border-slate-200",
				],
				icon: [
					"text-slate-400",
				],
				title: [
					"text-slate-400",
				],
				description: [
					"text-slate-400",
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
