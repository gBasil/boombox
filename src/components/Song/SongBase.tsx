import Image from 'next/future/image';
import Song from '../../types/Song';
import formatAuthors from '../../utils/formatAuthors';
import formatSeconds from '../../utils/formatSeconds';

type Props = {
	song: Song;
	playing?: boolean;
	className?: string;
	cache?: string;
	onClick?: () => void;
};

const Song = (props: Props) => (
	<button
		className={`group flex w-full gap-2 ${props.className}`}
		onClick={props.onClick}
	>
		<div className='relative w-[72px] shrink-0'>
			<Image
				// Don't cache images
				src={`/api/cover/${props.song.id}${
					props.cache ? `?c=${props.cache}` : ''
				}`}
				// Don't proxy the image
				unoptimized
				alt=''
				width={72}
				height={72}
				className={`rounded-1 border-2 ${
					props.song.media.flagged
						? 'border-red shadow-red'
						: 'border-lightestGreen shadow-lightestGreen'
				} transition-shadow ${
					props.playing
						? 'motion-safe:animate-glow-pulse motion-reduce:shadow-glow'
						: ''
				}`}
			/>
			<div
				className={`absolute inset-0 rounded-1 pointer-events-none ${
					props.song.media.flagged ? 'bg-red' : 'bg-lightestGreen'
				} opacity-0 transition-opacity group-hover:opacity-30`}
			/>
			<span
				className={`absolute bottom-0 right-0 rounded-tl-1 rounded-br-1 ${
					props.song.media.flagged ? 'bg-red' : 'bg-lightestGreen'
				} py-[2px] px-[6px] text-[12px] font-bold leading-[16px] text-darkestGreen`}
			>
				{formatSeconds(props.song.media.duration)}
			</span>
		</div>

		<div className='my-auto flex w-[calc(100%_-_88px)] flex-col items-start'>
			<h3
				className={`w-full truncate text-left text-[20px] font-bold leading-[32px] ${
					props.song.media.flagged ? 'text-red' : 'text-lightestGreen'
				}`}
				title={props.song.title}
			>
				{props.song.title}
			</h3>
			<p
				className='w-full truncate text-left text-lightGreen'
				title={formatAuthors(props.song.authors)}
			>
				{formatAuthors(props.song.authors)}
			</p>
		</div>
	</button>
);

export default Song;
