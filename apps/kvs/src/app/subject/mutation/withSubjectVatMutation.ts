import { vyhledejEkonomickeSubjekty } from "@kvs/ares";
import { withMutation } from "@use-pico/client";
import { genId, mapper } from "@use-pico/common";
import type { z } from "zod";
import { kysely } from "~/app/database/kysely";
import { SubjectCreateSchema } from "~/app/subject/db/SubjectCreateSchema";
import { SubjectSchema } from "~/app/subject/db/SubjectSchema";
import { withSubjectListQuery } from "~/app/subject/query/withSubjectListQuery";

const SubjectVatSchema = SubjectCreateSchema.pick({
	vat: true,
});

type SubjectVatSchemaType = z.infer<typeof SubjectVatSchema>;

export namespace withSubjectVatMutation {
	export interface Props
		extends withMutation.PropsEx<SubjectVatSchemaType, SubjectSchema.Type> {
		//
	}
}

export const withSubjectVatMutation = (_: withSubjectVatMutation.Props) => {
	return withMutation<SubjectVatSchemaType, SubjectSchema.Type>({
		keys(data) {
			return [
				"subject",
				"vat",
				data,
			];
		},
		async mutationFn({ vat }) {
			if (!vat) {
				throw new Error("VAT is required");
			}

			const { data: subjects } = await vyhledejEkonomickeSubjekty({
				ico: [
					vat,
				],
			});

			if (!subjects.ekonomickeSubjekty?.length) {
				throw new Error("Subject not found");
			}

			const [subject] = subjects.ekonomickeSubjekty;

			return kysely
				.insertInto("Subject")
				.values(
					SubjectSchema.parse({
						id: genId(),
						// biome-ignore lint/style/noNonNullAssertion: This is already checked
						...mapper(subject!, {
							name({ obchodniJmeno }) {
								return obchodniJmeno ?? "";
							},
							street({ sidlo }) {
								return sidlo?.nazevUlice;
							},
							city({ sidlo }) {
								return sidlo?.nazevObce;
							},
							zip({ sidlo }) {
								return sidlo?.psc?.toString();
							},
						}),
						vat,
					}),
				)
				.returningAll()
				.executeTakeFirstOrThrow();
		},
		invalidate: [
			withSubjectListQuery(),
		],
	});
};
