import { Link, useParams } from "@tanstack/react-router";
import { Toaster } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC, PropsWithChildren } from "react";
import { Footer } from "~/app/moving-average-cost/ui/Footer";
import { LayoutCls } from "~/app/moving-average-cost/ui/LayoutCls";
import { Menu } from "~/app/moving-average-cost/ui/Menu";
import logo from "~/assets/logo.svg";

export namespace Layout {
	export interface Props extends LayoutCls.Props<PropsWithChildren> {
		//
	}
}

export const Layout: FC<Layout.Props> = ({
	variant,
	tva = LayoutCls,
	cls,
	children,
}) => {
	const { locale } = useParams({
		from: "/$locale",
	});

	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			<Toaster position={"top-center"} />
			<div className={slots.header()}>
				<div>
					<Link
						to={"/$locale"}
						params={{
							locale,
						}}
					>
						<img
							alt={"logo"}
							className={tvc([
								"h-12",
							])}
							src={logo}
						/>
					</Link>
				</div>
				<div className={"flex-grow"}>
					<Menu />
				</div>
				<div className={"flex flex-row gap-2 items-center"}>Foo</div>
			</div>
			<div className={slots.content()}>{children}</div>
			<Footer />
		</div>
	);
};
