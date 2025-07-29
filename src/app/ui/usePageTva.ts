import { useRouteContext } from "@tanstack/react-router";

export const usePageTva = () => {
	const { tva } = useRouteContext({
		from: "__root__",
	});

	return tva;
};
