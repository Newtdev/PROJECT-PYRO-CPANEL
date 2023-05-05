export default function useIsSelected(selected: string[]) {
	const isSelected = (name: string) => selected.indexOf(name) !== -1;
	return { isSelected };
}
