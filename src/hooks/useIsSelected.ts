export default function useIsSelected(selected: string[]) {
	const isSelected = (id: string) => selected.indexOf(id) !== -1;
	return { isSelected };
}
