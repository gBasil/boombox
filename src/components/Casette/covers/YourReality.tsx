const YourReality = () => (
	/*
		Note! According to the MDN docs (https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image),
		the svg <image> element doesn't actually specify what to do when faced with an animated gif, but
		the latest versions of both Arc (Chromium based), Firefox, and Safari seem to support it. The
		gif plays noticably slower on Safari and other parts of the website are also broken.
	*/
	<image
		href='/img/puff.gif'
		width={840}
		height={368}
		preserveAspectRatio='xMidYMid slice'
	/>
);

export default YourReality;
