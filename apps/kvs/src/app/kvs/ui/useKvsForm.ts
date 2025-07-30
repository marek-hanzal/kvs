import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import {
	BoolInput,
	Select,
	SubmitButton,
	TextInput,
	Transfer,
} from "@use-pico/client";
import { InventoryItemMultiPopupSelect } from "~/app/inventory/item/ui/InventoryItemMultiPopupSelect";
import { TransactionMultiPopupSelect } from "~/app/transaction/ui/TransactionMultiPopupSelect";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm: useKvsForm } = createFormHook({
	fieldComponents: {
		BoolInput,
		Select,
		TextInput,
		Transfer,
		InventoryItemMultiPopupSelect,
		TransactionMultiPopupSelect,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
