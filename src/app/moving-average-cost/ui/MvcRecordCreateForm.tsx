import { useNavigate, useParams } from "@tanstack/react-router";
import {
	Button,
	type Form,
	FormCls,
	FormField,
	onSubmit,
	Tx,
} from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { useKvsForm } from "~/app/kvs/ui/useKvsForm";
import { MvcRecordCreateSchema } from "~/app/moving-average-cost/db/MvcRecordCreateSchema";

export namespace MvcRecordCreateForm {
	export interface Props extends Form.Props<MvcRecordCreateSchema> {
		//
	}
}

export const MvcRecordCreateForm: FC<MvcRecordCreateForm.Props> = ({
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
			amount: 1,
			cost: 1,
			gross: 1,
			...defaultValues,
		} satisfies MvcRecordCreateSchema.Type as MvcRecordCreateSchema.Type,
		validators: {
			onChange: MvcRecordCreateSchema,
			onSubmit: MvcRecordCreateSchema,
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
						label={<Tx label="Resource Name" />}
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

			<form.AppField name="amount">
				{(field) => (
					<FormField
						label={<Tx label="Amount Produced" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							type="number"
							min={0.01}
							step={0.01}
							className={slots.input()}
							value={field.state.value ?? 0}
							onChange={(e) =>
								field.handleChange(
									parseFloat(e.target.value) || 0,
								)
							}
						/>
					</FormField>
				)}
			</form.AppField>

			<form.AppField name="cost">
				{(field) => (
					<FormField
						label={<Tx label="Company Runtime Cost" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							type="number"
							min={0.01}
							step={0.01}
							className={slots.input()}
							value={field.state.value ?? 0}
							onChange={(e) =>
								field.handleChange(
									parseFloat(e.target.value) || 0,
								)
							}
						/>
					</FormField>
				)}
			</form.AppField>

			<form.AppField name="gross">
				{(field) => (
					<FormField
						label={<Tx label="Cost per Unit" />}
						name={field.name}
						meta={field.state.meta}
					>
						<field.TextInput
							type="number"
							min={0.01}
							step={0.01}
							className={slots.input()}
							value={field.state.value ?? 0}
							onChange={(e) =>
								field.handleChange(
									parseFloat(e.target.value) || 0,
								)
							}
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
					variant={{
						borderless: true,
						variant: "light",
					}}
					onClick={() =>
						navigate({
							to: "/$locale/moving-average-cost/list",
							params: {
								locale,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton>
					<Tx label="Create Record" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
