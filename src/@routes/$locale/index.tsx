import { createFileRoute, useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import { Tile } from "~/app/kvs/ui/Tile";
import { TileSet } from "~/app/kvs/ui/TileSet";
import { InventoryItemIcon } from "~/app/ui/icon/InventoryItemIcon";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";
import logo from "~/assets/logo.svg";

export const Route = createFileRoute("/$locale/")({
	component() {
		const { locale } = useParams({
			from: "/$locale",
		});

		return (
			<div
				className={tvc([
					"min-h-screen",
					"bg-gradient-to-br",
					"from-slate-50",
					"to-slate-100",
					"p-8",
				])}
			>
				<div
					className={tvc([
						"max-w-6xl",
						"mx-auto",
					])}
				>
					{/* Header */}
					<div
						className={tvc([
							"text-center",
							"mb-8",
						])}
					>
						<h1
							className={tvc([
								"text-4xl",
								"font-bold",
								"text-slate-800",
								"mb-4",
							])}
						>
							<Tx label="Welcome to KVS" />
						</h1>
						<div
							className={tvc([
								"text-lg",
								"text-slate-600",
								"max-w-2xl",
								"mx-auto",
							])}
						>
							<Tx label="Select a module to get started" />
						</div>
					</div>

					{/* Logo */}
					<div
						className={tvc([
							"flex",
							"justify-center",
							"mb-12",
						])}
					>
						<img
							src={logo}
							alt="KVS Logo"
							className={tvc([
								"w-1/5",
								"max-w-md",
								"h-auto",
								"object-contain",
								"drop-shadow-lg",
							])}
						/>
					</div>

					{/* Tiles Grid */}
					<TileSet>
						<Tile
							title={<Tx label="Inventory" />}
							description={
								<Tx label="Track and manage your inventory" />
							}
							icon={InventoryItemIcon}
							wrapper={(props) => {
								return (
									<LinkTo
										to={"/$locale/inventory"}
										params={{
											locale,
										}}
										{...props}
									/>
								);
							}}
						/>

						<Tile
							title={<Tx label="Transactions" />}
							description={
								<Tx label="Track and manage your transactions" />
							}
							icon={TransactionIcon}
							wrapper={(props) => {
								return (
									<LinkTo
										to={"/$locale/transaction"}
										params={{
											locale,
										}}
										{...props}
									/>
								);
							}}
						/>

						<Tile
							title={<Tx label="Moving Average Cost" />}
							description={
								<Tx label="Calculate and track moving average costs for inventory management" />
							}
							icon="icon-[mdi--calculator]"
							wrapper={(props) => {
								return (
									<LinkTo
										to={"/$locale/mac"}
										params={{
											locale,
										}}
										{...props}
									/>
								);
							}}
						/>

						<Tile
							title={<Tx label="Diary" />}
							description={<Tx label="Coming soon" />}
							icon="icon-[mdi--clock-outline]"
							disabled={true}
						/>

						<Tile
							title={<Tx label="Todo list" />}
							description={<Tx label="Coming soon" />}
							icon="icon-[mdi--clock-outline]"
							disabled={true}
						/>

						<Tile
							title={<Tx label="Notifications" />}
							description={<Tx label="Coming soon" />}
							icon="icon-[mdi--clock-outline]"
							disabled={true}
						/>

						<Tile
							title={<Tx label="Coming Soon" />}
							description={
								<Tx label="New modules are being developed" />
							}
							icon="icon-[mdi--clock-outline]"
							disabled={true}
						/>

						<Tile
							title={<Tx label="Coming Soon" />}
							description={
								<Tx label="More exciting features on the way" />
							}
							icon="icon-[mdi--star-outline]"
							disabled={true}
						/>
					</TileSet>
				</div>
			</div>
		);
	},
});
