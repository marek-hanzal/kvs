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
import { TransactionPatchSchema } from "~/app/transaction/db/TransactionPatchSchema";
import { TransactionIcon } from "~/app/ui/icon/TransactionIcon";

export namespace TransactionPatchForm {
	export interface Props extends Form.Props<TransactionPatchSchema> {
		transactionId: string;
	}
}

export const TransactionPatchForm: FC<TransactionPatchForm.Props> = ({
	transactionId,
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
			amount: 0,
			note: "",
			...defaultValues,
			accountTo: defaultValues?.accountTo
				? DateTime.fromISO(defaultValues.accountTo).toFormat("yyyy-MM")
				: DateTime.now().toFormat("yyyy-MM"),
		} satisfies TransactionPatchSchema.Type as TransactionPatchSchema.Type,
		validators: {
			onChange: TransactionPatchSchema,
			onSubmit: TransactionPatchSchema,
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
						hint={<Tx label="Transaction Account To (hint)" />}
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
							onChange={(e) =>
								field.handleChange(Number(e.target.value))
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
							to: "/$locale/transaction/$id/view",
							params: {
								locale,
								id: transactionId,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton iconEnabled={TransactionIcon}>
					<Tx label="Save" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
