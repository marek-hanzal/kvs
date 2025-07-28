import type { PropsWithChildren } from "react";
import { TileSetCls } from "./TileSetCls";

export namespace TileSet {
	export interface Props extends TileSetCls.Props<PropsWithChildren> {
		children: React.ReactNode;
	}
}

export const TileSet = ({
	children,
	variant,
	tva = TileSetCls,
	cls,
}: TileSet.Props) => {
	const { slots } = tva(variant, cls);

	return <div className={slots.base()}>{children}</div>;
};
