import { stringOrNumber } from "src/helpers/alias";

type imageType = {
	image: string;
	alt?: string;
	width: stringOrNumber;
	height: stringOrNumber;
	styles?: string;
};

const Image = ({
	image,
	alt = "image",
	width,
	height,
	styles = "",
}: imageType) => {
	return (
		<img
			src={image}
			alt={alt}
			width={width}
			height={height}
			className={styles}
		/>
	);
};

export default Image;
