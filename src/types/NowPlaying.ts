type NowPlaying =
	| {
			playing: true;
			song: {
				id: number;
				title: string;
				authors: string;
			};
	  }
	| {
			playing: false;
	  };

export default NowPlaying;
