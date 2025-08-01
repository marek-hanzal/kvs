import { withQuery } from "@use-pico/client";
import { kysely } from "~/app/database/kysely";

export const withTransactionSumQuery = () => {
	return withQuery<void, number>({
		keys: () => [
			"transaction",
			"sum",
		],
		async queryFn() {
			const result = await kysely
				.selectFrom("Transaction")
				.select((eb) => eb.fn.sum<number | null>("amount").as("sum"))
				.executeTakeFirstOrThrow();

			return Number(result.sum ?? 0);
		},
	});
};
