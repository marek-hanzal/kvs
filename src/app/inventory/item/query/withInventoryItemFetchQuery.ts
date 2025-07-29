import { withFetch, withQuery } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { kysely } from "~/app/database/kysely";
import { InventoryItemSchema } from "~/app/inventory/item/db/InventoryItemSchema";

export namespace withInventoryItemFetchQuery {
	export interface Props
		extends withQuery.PropsEx<
			IdentitySchema.Type,
			InventoryItemSchema.Type
		> {
		//
	}
}

export const withInventoryItemFetchQuery = ({
	data,
}: withInventoryItemFetchQuery.Props) => {
	return withQuery({
		data,
		keys(data) {
			return [
				"inventory-item",
				"fetch",
				data,
			];
		},
		async queryFn({ id }) {
			return withFetch({
				select: kysely.selectFrom("InventoryItem as ii").selectAll(),
				output: InventoryItemSchema,
				where: {
					id,
				},
				query({ select, where }) {
					let $select = select;

					if (where?.id) {
						$select = $select.where("ii.id", "=", where.id);
					}

					return $select;
				},
			});
		},
	});
};
