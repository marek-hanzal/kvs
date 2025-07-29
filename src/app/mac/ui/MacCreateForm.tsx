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
import { MacCreateSchema } from "~/app/mac/db/MacCreateSchema";

export namespace MacCreateForm {
	export interface Props extends Form.Props<MacCreateSchema> {
		//
	}
}

export const MacCreateForm: FC<MacCreateForm.Props> = ({
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
			accountTo: DateTime.now().toFormat("yyyy-MM"),
			...defaultValues,
		} satisfies MacCreateSchema.Type as MacCreateSchema.Type,
		validators: {
			onChange: MacCreateSchema,
			onSubmit: MacCreateSchema,
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
							to: "/$locale/mac/list",
							params: {
								locale,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton>
					<Tx label="Create MAC" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
