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
import { MacPatchSchema } from "~/app/mac/db/MacPatchSchema";

export namespace MacPatchForm {
	export interface Props extends Form.Props<MacPatchSchema> {
		macId: string;
	}
}

export const MacPatchForm: FC<MacPatchForm.Props> = ({
	macId,
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
			...defaultValues,
			accountTo: defaultValues?.accountTo
				? DateTime.fromISO(defaultValues.accountTo).toFormat("yyyy-MM")
				: DateTime.now().toFormat("yyyy-MM"),
		} satisfies MacPatchSchema.Type as MacPatchSchema.Type,
		validators: {
			onChange: MacPatchSchema,
			onSubmit: MacPatchSchema,
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
						hint={<Tx label="MAC Account To (hint)" />}
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
							to: "/$locale/mac/$id/view",
							params: {
								locale,
								id: macId,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton>
					<Tx label="Save" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
