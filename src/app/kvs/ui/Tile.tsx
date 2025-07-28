import { Icon } from "@use-pico/client";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { TileCls } from "./TileCls";

export namespace Tile {
	export interface Props extends TileCls.Props {
		title: ReactNode;
		description: ReactNode;
		icon: string;
		disabled?: boolean;
		wrapper?: FC<PropsWithChildren>;
	}
}

export const Tile = ({
	title,
	description,
	icon,
	disabled = false,
	variant,
	tva = TileCls,
	cls,
	wrapper: Wrapper = ({ children }) => children,
}: Tile.Props) => {
	const { slots } = tva(
		{
			...variant,
			disabled,
		},
		cls,
	);

	return (
		<div className={slots.base()}>
			<Wrapper>
				<div className={slots.content()}>
					<div className={slots.iconContainer()}>
						<Icon
							icon={icon}
							cls={{
								base: slots.icon(),
							}}
						/>
					</div>
					<div className={slots.textContainer()}>
						<h3 className={slots.title()}>{title}</h3>
						<div className={slots.description()}>{description}</div>
					</div>
				</div>
			</Wrapper>
		</div>
	);
};
