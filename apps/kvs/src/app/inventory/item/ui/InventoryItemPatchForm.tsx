import { useNavigate, useParams } from "@tanstack/react-router";
import {
	BackIcon,
	Button,
	type Form,
	FormCls,
	FormField,
	onSubmit,
	Tx,
} from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { InventoryItemPatchSchema } from "~/app/inventory/item/db/InventoryItemPatchSchema";
import { useKvsForm } from "~/app/kvs/ui/useKvsForm";
import { InventoryIcon } from "~/app/ui/icon/InventoryIcon";

export namespace InventoryItemPatchForm {
	export interface Props extends Form.Props<InventoryItemPatchSchema> {
		inventoryItemId: string;
	}
}

export const InventoryItemPatchForm: FC<InventoryItemPatchForm.Props> = ({
	inventoryItemId,
	mutation,
	defaultValues,
	variant,
	tva = FormCls,
	cls,
}) => {
	const navigate = useNavigate();
	const { locale } = useParams({
		from: "/$locale",
	});

	const form = useKvsForm({
		defaultValues: {
			name: "",
			description: "",
			...defaultValues,
		} satisfies InventoryItemPatchSchema.Type as InventoryItemPatchSchema.Type,
		validators: {
			onChange: InventoryItemPatchSchema,
			onSubmit: InventoryItemPatchSchema,
		},
		onSubmit: onSubmit({
			mutation,
			toast: {
				loading: <Tx label={"Saving..."} />,
				success: <Tx label={"Saved!"} />,
				error: <Tx label={"Error!"} />,
			},
		}),
	});

	const { slots } = tva(
		{
			...variant,
			isSubmitting: form.state.isSubmitting,
		},
		cls,
	);

	return (
		<form
			className={slots.base()}
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.AppField name="name">
				{(field) => (
					<FormField
						label={<Tx label="Item Name" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							className={slots.input()}
							value={field.state.value ?? ""}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormField>
				)}
			</form.AppField>

			<form.AppField name="description">
				{(field) => (
					<FormField
						label={<Tx label="Description" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							className={slots.input()}
							value={field.state.value ?? ""}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormField>
				)}
			</form.AppField>

			<div
				className={tvc([
					"flex",
					"flex-row",
					"justify-between",
					"gap-8",
				])}
			>
				<Button
					iconEnabled={BackIcon}
					variant={{
						borderless: true,
						variant: "light",
					}}
					onClick={() =>
						navigate({
							to: "/$locale/inventory/$id/view",
							params: {
								locale,
								id: inventoryItemId,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton iconEnabled={InventoryIcon}>
					<Tx label="Update Item" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
