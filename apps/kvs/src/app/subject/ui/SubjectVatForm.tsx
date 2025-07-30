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
import type { z } from "zod";
import { useKvsForm } from "~/app/kvs/ui/useKvsForm";
import { SubjectCreateSchema } from "~/app/subject/db/SubjectCreateSchema";

const SubjectVatSchema = SubjectCreateSchema.pick({
	vat: true,
});

type SubjectVatSchemaType = z.infer<typeof SubjectVatSchema>;

export namespace SubjectVatForm {
	export interface Props extends Form.Props<typeof SubjectVatSchema> {
		//
	}
}

export const SubjectVatForm: FC<SubjectVatForm.Props> = ({
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
			vat: "",
			...defaultValues,
		} satisfies SubjectVatSchemaType as SubjectVatSchemaType,
		validators: {
			onChange: SubjectVatSchema,
			onSubmit: SubjectVatSchema,
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
			<form.AppField name="vat">
				{(field) => (
					<FormField
						label={<Tx label="VAT" />}
						hint={<Tx label="Subject lookup VAT number (hint)" />}
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
							to: "/$locale/subject/list",
							params: {
								locale,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton>
					<Tx label="Save VAT" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
