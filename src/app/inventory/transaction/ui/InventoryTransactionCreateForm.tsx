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
import { InventoryTransactionCreateSchema } from "~/app/inventory/transaction/db/InventoryTransactionCreateSchema";
import { useKvsForm } from "~/app/kvs/ui/useKvsForm";

export namespace InventoryTransactionCreateForm {
	export interface Props
		extends Form.Props<InventoryTransactionCreateSchema> {
		inventoryItemId: string;
	}
}

export const InventoryTransactionCreateForm: FC<
	InventoryTransactionCreateForm.Props
> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCls,
	cls,
	inventoryItemId,
}) => {
	const navigate = useNavigate();
	const { locale } = useParams({
		from: "/$locale",
	});

	const form = useKvsForm({
		defaultValues: {
			amount: 0,
			inventoryItemId,
			note: "",
			...defaultValues,
		} satisfies InventoryTransactionCreateSchema.Type as InventoryTransactionCreateSchema.Type,
		validators: {
			onChange: InventoryTransactionCreateSchema,
			onSubmit: InventoryTransactionCreateSchema,
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
			<form.AppField name="amount">
				{(field) => (
					<FormField
						label={<Tx label="Amount" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							type="number"
							className={slots.input()}
							value={field.state.value ?? 0}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) =>
								field.handleChange(
									parseFloat(e.target.value) || 0,
								)
							}
							step="0.01"
							min="0"
						/>
					</FormField>
				)}
			</form.AppField>

			<form.AppField name="note">
				{(field) => (
					<FormField
						label={<Tx label="Note" />}
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

				<form.SubmitButton>
					<Tx label="Create Transaction" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
