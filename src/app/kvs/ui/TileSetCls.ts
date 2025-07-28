import { cls } from "@use-pico/common";

export const TileSetCls = cls({
	slot: {
		base: [
			"grid",
			"grid-cols-3",
			"gap-6",
			"items-start",
		],
	},
	variant: {},
	defaults: {},
});

export type TileSetCls = typeof TileSetCls;

export namespace TileSetCls {
	export type Props<P = unknown> = cls.Props<TileSetCls, P>;
}
