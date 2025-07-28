import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import {
	BoolInput,
	Select,
	SubmitButton,
	TextInput,
	Transfer,
} from "@use-pico/client";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm: useKvsForm } = createFormHook({
	fieldComponents: {
		BoolInput,
		Select,
		TextInput,
		Transfer,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
