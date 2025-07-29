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
import { DateTime, tvc } from "@use-pico/common";
import type { FC } from "react";
import { useKvsForm } from "~/app/kvs/ui/useKvsForm";
import { TransactionCreateSchema } from "~/app/transaction/db/TransactionCreateSchema";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace TransactionCreateForm {
	export interface Props extends Form.Props<TransactionCreateSchema> {
		//
	}
}

export const TransactionCreateForm: FC<TransactionCreateForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCls,
	cls,
}) => {
	const { locale } = useParams({
		from: "/$locale",
	});
	const navigate = useNavigate();

	const form = useKvsForm({
		defaultValues: {
			amount: 0,
			note: "",
			mac: 0,
			accountTo: DateTime.now().toFormat("yyyy-MM"),
			...defaultValues,
		} satisfies TransactionCreateSchema.Type as TransactionCreateSchema.Type,
		validators: {
			onChange: TransactionCreateSchema,
			onSubmit: TransactionCreateSchema,
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
			<form.AppField name="accountTo">
				{(field) => (
					<FormField
						label={<Tx label="Account To" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							type="month"
							className={slots.input()}
							value={field.state.value ?? ""}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</FormField>
				)}
			</form.AppField>

			<form.AppField name="amount">
				{(field) => (
					<FormField
						label={<Tx label="Transaction amount" />}
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

			<form.AppField name="mac">
				{(field) => (
					<FormField
						label={<Tx label="With MAC" />}
						name={field.name}
						meta={field.state.meta}
						hint={<Tx label="With MAC (hint)" />}
					>
						<field.BoolInput
							value={Boolean(field.state.value)}
							onChange={(value) =>
								field.handleChange(value ? 1 : 0)
							}
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
							to: "/$locale/transaction/list",
							params: {
								locale,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton iconEnabled={TransactionIcon}>
					<Tx label="Create Transaction" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
