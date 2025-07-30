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
import { useKvsForm } from "~/app/kvs/ui/useKvsForm";
import { SubjectPatchSchema } from "~/app/subject/db/SubjectPatchSchema";

export namespace SubjectPatchForm {
	export interface Props extends Form.Props<SubjectPatchSchema> {
		subjectId: string;
	}
}

export const SubjectPatchForm: FC<SubjectPatchForm.Props> = ({
	subjectId,
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
			vat: "",
			street: "",
			city: "",
			zip: "",
			...defaultValues,
		} satisfies SubjectPatchSchema.Type as SubjectPatchSchema.Type,
		validators: {
			onChange: SubjectPatchSchema,
			onSubmit: SubjectPatchSchema,
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
						label={<Tx label="Subject Name" />}
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

			<form.AppField name="vat">
				{(field) => (
					<FormField
						label={<Tx label="VAT" />}
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

			<form.AppField name="street">
				{(field) => (
					<FormField
						label={<Tx label="Street" />}
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

			<form.AppField name="city">
				{(field) => (
					<FormField
						label={<Tx label="City" />}
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

			<form.AppField name="zip">
				{(field) => (
					<FormField
						label={<Tx label="ZIP" />}
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
							to: "/$locale/subject/$id/view",
							params: {
								locale,
								id: subjectId,
							},
						})
					}
				>
					<Tx label="Cancel" />
				</Button>

				<form.SubmitButton>
					<Tx label="Update Subject" />
				</form.SubmitButton>
			</div>
		</form>
	);
};
