import { withMutation } from "@use-pico/client";
import { DateTime, genId } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import type { MvcRecordCreateSchema } from "../db/MvcRecordCreateSchema";
import type { MvcRecordSchema } from "../db/MvcRecordSchema";

export namespace withMvcRecordCreateMutation {
	export interface Props
		extends withMutation.PropsEx<
			MvcRecordCreateSchema.Type,
			MvcRecordSchema.Type
		> {
		//
	}
}

export const withMvcRecordCreateMutation = (
	_: withMvcRecordCreateMutation.Props,
) => {
	return withMutation<MvcRecordCreateSchema.Type, MvcRecordSchema.Type>({
		keys(data) {
			return [
				"mvc-record",
				"create",
				data,
			];
		},
		async mutationFn(values) {
			const now = DateTime.now().toUTC().toSQLTime();

			console.log("values", {
				id: genId(),
				stamp: now,
				...values,
			});

			return kysely
				.insertInto("MvaRecord")
				.values({
					id: genId(),
					stamp: now,
					...values,
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
	});
};
