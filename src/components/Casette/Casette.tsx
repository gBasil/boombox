import { SVGProps } from 'react';
import Song from '../../types/Song';
import Cover from './Cover';

type CasetteProps = {
	song?: Song;
	progress?: number;
} & SVGProps<SVGSVGElement>;

// Exported from Figma, then cleaned up to work with gradient filters.
const Casette = (props: CasetteProps) => {
	const duration =
		(props.progress || 0.1) / (props.song?.media.duration || 150);

	return (
		<svg
			width='936'
			height='584'
			viewBox='0 0 936 584'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			// This adds the song and progress props, but it's fine and won't break anything.
			{...props}
			className={`ignore-no-scaling ${props.className}`}
		>
			<filter id='noise'>
				<feTurbulence baseFrequency='0.5' />
			</filter>

			<g clipPath='url(#clip0_18_20)'>
				<g filter='url(#filter0_i_18_20)'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0 24C0 10.7452 10.7452 0 24 0H912C925.255 0 936 10.7452 936 24V560C936 573.255 925.255 584 912 584H24C10.7452 584 0 573.255 0 560V24ZM344 532C344 543.046 335.046 552 324 552C312.954 552 304 543.046 304 532C304 520.954 312.954 512 324 512C335.046 512 344 520.954 344 532ZM228 568C239.046 568 248 559.046 248 548C248 536.954 239.046 528 228 528C216.954 528 208 536.954 208 548C208 559.046 216.954 568 228 568ZM708 568C719.046 568 728 559.046 728 548C728 536.954 719.046 528 708 528C696.954 528 688 536.954 688 548C688 559.046 696.954 568 708 568ZM612 552C623.046 552 632 543.046 632 532C632 520.954 623.046 512 612 512C600.954 512 592 520.954 592 532C592 543.046 600.954 552 612 552ZM268 184C226.026 184 192 218.026 192 260C192 301.974 226.026 336 268 336H668C709.974 336 744 301.974 744 260C744 218.026 709.974 184 668 184H268Z'
						fill='url(#paint0_radial_18_20)'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0 24C0 10.7452 10.7452 0 24 0H912C925.255 0 936 10.7452 936 24V560C936 573.255 925.255 584 912 584H24C10.7452 584 0 573.255 0 560V24ZM344 532C344 543.046 335.046 552 324 552C312.954 552 304 543.046 304 532C304 520.954 312.954 512 324 512C335.046 512 344 520.954 344 532ZM228 568C239.046 568 248 559.046 248 548C248 536.954 239.046 528 228 528C216.954 528 208 536.954 208 548C208 559.046 216.954 568 228 568ZM708 568C719.046 568 728 559.046 728 548C728 536.954 719.046 528 708 528C696.954 528 688 536.954 688 548C688 559.046 696.954 568 708 568ZM612 552C623.046 552 632 543.046 632 532C632 520.954 623.046 512 612 512C600.954 512 592 520.954 592 532C592 543.046 600.954 552 612 552ZM268 184C226.026 184 192 218.026 192 260C192 301.974 226.026 336 268 336H668C709.974 336 744 301.974 744 260C744 218.026 709.974 184 668 184H268Z'
						fill='url(#pattern0)'
						fillOpacity='0.5'
					/>
				</g>
				<g filter='url(#filter1_ii_18_20)'>
					<circle cx='24' cy='560' r='8' fill='#AFAFAF' />
					<circle
						cx='24'
						cy='560'
						r='8'
						fill='url(#pattern1)'
						fillOpacity='0.25'
					/>
					<path
						d='M24 556V564M28 560H20'
						stroke='#525252'
						strokeWidth='2'
					/>
				</g>
				<g filter='url(#filter2_ii_18_20)'>
					<circle cx='912' cy='560' r='8' fill='#AFAFAF' />
					<circle
						cx='912'
						cy='560'
						r='8'
						fill='url(#pattern2)'
						fillOpacity='0.05'
					/>
					<path
						d='M912 556V564M916 560H908'
						stroke='#525252'
						strokeWidth='2'
					/>
				</g>
				<g filter='url(#filter3_ii_18_20)'>
					<circle cx='912' cy='24' r='8' fill='#AFAFAF' />
					<circle
						cx='912'
						cy='24'
						r='8'
						fill='url(#pattern3)'
						fillOpacity='0.05'
					/>
					<path
						d='M912 20V28M916 24H908'
						stroke='#525252'
						strokeWidth='2'
					/>
				</g>
				<g filter='url(#filter4_ii_18_20)'>
					<circle cx='24' cy='24' r='8' fill='#AFAFAF' />
					<circle
						cx='24'
						cy='24'
						r='8'
						fill='url(#pattern4)'
						fillOpacity='0.05'
					/>
					<path
						d='M24 20V28M28 24H20'
						stroke='#525252'
						strokeWidth='2'
					/>
				</g>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M136 584L164.97 468.119C166.751 460.997 173.151 456 180.492 456H771.508C778.849 456 785.249 460.997 787.03 468.119L816 584H136ZM324 552C335.046 552 344 543.046 344 532C344 520.954 335.046 512 324 512C312.954 512 304 520.954 304 532C304 543.046 312.954 552 324 552ZM248 548C248 559.046 239.046 568 228 568C216.954 568 208 559.046 208 548C208 536.954 216.954 528 228 528C239.046 528 248 536.954 248 548ZM728 548C728 559.046 719.046 568 708 568C696.954 568 688 559.046 688 548C688 536.954 696.954 528 708 528C719.046 528 728 536.954 728 548ZM632 532C632 543.046 623.046 552 612 552C600.954 552 592 543.046 592 532C592 520.954 600.954 512 612 512C623.046 512 632 520.954 632 532Z'
					fill='url(#paint1_radial_18_20)'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M136 584L164.97 468.119C166.751 460.997 173.151 456 180.492 456H771.508C778.849 456 785.249 460.997 787.03 468.119L816 584H136ZM324 552C335.046 552 344 543.046 344 532C344 520.954 335.046 512 324 512C312.954 512 304 520.954 304 532C304 543.046 312.954 552 324 552ZM248 548C248 559.046 239.046 568 228 568C216.954 568 208 559.046 208 548C208 536.954 216.954 528 228 528C239.046 528 248 536.954 248 548ZM728 548C728 559.046 719.046 568 708 568C696.954 568 688 559.046 688 548C688 536.954 696.954 528 708 528C719.046 528 728 536.954 728 548ZM632 532C632 543.046 623.046 552 612 552C600.954 552 592 543.046 592 532C592 520.954 600.954 512 612 512C623.046 512 632 520.954 632 532Z'
					fill='url(#pattern5)'
					fillOpacity='0.5'
				/>
				<g filter='url(#filter5_di_18_20)'>
					<path
						d='M164.97 468.119L136 584H816L787.03 468.119C785.249 460.997 778.849 456 771.508 456H180.492C173.151 456 166.751 460.997 164.97 468.119Z'
						fill='#24242D'
						fillOpacity='0.01'
						shapeRendering='crispEdges'
					/>
				</g>
				<g filter='url(#filter6_i_18_20)'>
					<mask
						id='cover_mask'
						style={{ maskType: 'alpha' }}
						maskUnits='userSpaceOnUse'
						x='48'
						y='48'
						width='840'
						height='368'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M888 416H48V96L96 48H840L888 96V416ZM268 184C226.026 184 192 218.026 192 260C192 301.974 226.026 336 268 336H668C709.974 336 744 301.974 744 260C744 218.026 709.974 184 668 184H268Z'
							fill='#D9D9D9'
						/>
					</mask>
					<g mask='url(#cover_mask)'>
						<svg
							width={840}
							height={368}
							viewBox='0 0 840 368'
							x={48}
							y={48}
						>
							<Cover song={props.song} />
						</svg>
					</g>
				</g>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M268 184C226.026 184 192 218.026 192 260C192 301.974 226.026 336 268 336H668C709.974 336 744 301.974 744 260C744 218.026 709.974 184 668 184H268ZM568 216H368V304H568V216ZM720 260C720 288.719 696.719 312 668 312C639.281 312 616 288.719 616 260C616 231.281 639.281 208 668 208C696.719 208 720 231.281 720 260ZM268 312C296.719 312 320 288.719 320 260C320 231.281 296.719 208 268 208C239.281 208 216 231.281 216 260C216 288.719 239.281 312 268 312Z'
					fill='url(#paint2_radial_18_20)'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M268 184C226.026 184 192 218.026 192 260C192 301.974 226.026 336 268 336H668C709.974 336 744 301.974 744 260C744 218.026 709.974 184 668 184H268ZM568 216H368V304H568V216ZM720 260C720 288.719 696.719 312 668 312C639.281 312 616 288.719 616 260C616 231.281 639.281 208 668 208C696.719 208 720 231.281 720 260ZM268 312C296.719 312 320 288.719 320 260C320 231.281 296.719 208 268 208C239.281 208 216 231.281 216 260C216 288.719 239.281 312 268 312Z'
					fill='url(#pattern7)'
					fillOpacity='0.5'
				/>
				<g filter='url(#filter7_i_18_20)'>
					<mask
						id='mask1_18_20'
						style={{ maskType: 'alpha' }}
						maskUnits='userSpaceOnUse'
						x='368'
						y='216'
						width='200'
						height='88'
					>
						<rect
							x='368'
							y='216'
							width='200'
							height='88'
							fill='white'
						/>
					</mask>
					<g mask='url(#mask1_18_20)'>
						{/* 100 - smallest, 180 - Max */}
						<circle
							cx='668'
							cy='260'
							r={100 + 80 * duration}
							fill='#311C15'
							className='transition-[r_0.1s_ease]'
						/>
						<circle
							cx='268'
							cy='260'
							r={100 + 80 * (1 - duration)}
							fill='#311C15'
							className='transition-[r_0.1s_ease]'
						/>
					</g>
				</g>
				<g filter='url(#filter8_i_18_20)'>
					<circle
						cx='268'
						cy='260'
						r='48'
						stroke='white'
						strokeWidth='8'
					/>
					<mask
						id='mask2_18_20'
						style={{ maskType: 'alpha' }}
						maskUnits='userSpaceOnUse'
						x='216'
						y='208'
						width='104'
						height='104'
					>
						<circle cx='268' cy='260' r='52' fill='white' />
					</mask>
					<g mask='url(#mask2_18_20)'>
						<rect
							x='273.999'
							y='228'
							width='12'
							height='20'
							transform='rotate(180 273.999 228)'
							fill='white'
						/>
						<rect
							x='261.999'
							y='292'
							width='12'
							height='20'
							fill='white'
						/>
						<rect
							x='243.286'
							y='238.803'
							width='12'
							height='20'
							transform='rotate(120 243.286 238.803)'
							fill='white'
						/>
						<rect
							x='292.712'
							y='281.196'
							width='12'
							height='20'
							transform='rotate(-60 292.712 281.196)'
							fill='white'
						/>
						<rect
							x='237.286'
							y='270.803'
							width='12'
							height='20'
							transform='rotate(60 237.286 270.803)'
							fill='white'
						/>
						<rect
							x='298.712'
							y='249.196'
							width='12'
							height='20'
							transform='rotate(-120 298.712 249.196)'
							fill='white'
						/>
					</g>
				</g>
				<g filter='url(#filter9_i_18_20)'>
					<circle
						cx='668'
						cy='260'
						r='48'
						stroke='white'
						strokeWidth='8'
					/>
					<mask
						id='mask3_18_20'
						style={{ maskType: 'alpha' }}
						maskUnits='userSpaceOnUse'
						x='616'
						y='208'
						width='104'
						height='104'
					>
						<circle cx='668' cy='260' r='52' fill='white' />
					</mask>
					<g mask='url(#mask3_18_20)'>
						<rect
							x='673.999'
							y='228'
							width='12'
							height='20'
							transform='rotate(180 673.999 228)'
							fill='white'
						/>
						<rect
							x='661.999'
							y='292'
							width='12'
							height='20'
							fill='white'
						/>
						<rect
							x='643.286'
							y='238.803'
							width='12'
							height='20'
							transform='rotate(120 643.286 238.803)'
							fill='white'
						/>
						<rect
							x='692.712'
							y='281.196'
							width='12'
							height='20'
							transform='rotate(-60 692.712 281.196)'
							fill='white'
						/>
						<rect
							x='637.286'
							y='270.803'
							width='12'
							height='20'
							transform='rotate(60 637.286 270.803)'
							fill='white'
						/>
						<rect
							x='698.712'
							y='249.196'
							width='12'
							height='20'
							transform='rotate(-120 698.712 249.196)'
							fill='white'
						/>
					</g>
				</g>
			</g>
			<defs>
				<filter
					id='filter0_i_18_20'
					x='0'
					y='0'
					width='936'
					height='588'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='10' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
				</filter>
				<pattern
					id='pattern0'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='0.986301'
				>
					<use
						xlinkHref='#image0_18_20'
						transform='scale(0.00106838 0.00171233)'
					/>
				</pattern>
				<filter
					id='filter1_ii_18_20'
					x='16'
					y='548'
					width='16'
					height='24'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='-4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='effect1_innerShadow_18_20'
						result='effect2_innerShadow_18_20'
					/>
				</filter>
				<pattern
					id='pattern1'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use xlinkHref='#image1_18_20' transform='scale(0.0625)' />
				</pattern>
				<filter
					id='filter2_ii_18_20'
					x='904'
					y='548'
					width='16'
					height='24'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='-4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='effect1_innerShadow_18_20'
						result='effect2_innerShadow_18_20'
					/>
				</filter>
				<pattern
					id='pattern2'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use xlinkHref='#image1_18_20' transform='scale(0.0625)' />
				</pattern>
				<filter
					id='filter3_ii_18_20'
					x='904'
					y='12'
					width='16'
					height='24'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='-4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='effect1_innerShadow_18_20'
						result='effect2_innerShadow_18_20'
					/>
				</filter>
				<pattern
					id='pattern3'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use xlinkHref='#image1_18_20' transform='scale(0.0625)' />
				</pattern>
				<filter
					id='filter4_ii_18_20'
					x='16'
					y='12'
					width='16'
					height='24'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='-4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='effect1_innerShadow_18_20'
						result='effect2_innerShadow_18_20'
					/>
				</filter>
				<pattern
					id='pattern4'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use xlinkHref='#image1_18_20' transform='scale(0.0625)' />
				</pattern>
				<pattern
					id='pattern5'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use
						xlinkHref='#image2_18_20'
						transform='scale(0.00147059 0.0078125)'
					/>
				</pattern>
				<filter
					id='filter5_di_18_20'
					x='112'
					y='456'
					width='728'
					height='184'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='32' />
					<feGaussianBlur stdDeviation='12' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_18_20'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_18_20'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='2' />
					<feGaussianBlur stdDeviation='8' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect2_innerShadow_18_20'
					/>
				</filter>
				<filter
					id='filter6_i_18_20'
					x='48'
					y='48'
					width='840'
					height='372'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='8' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
				</filter>
				<pattern
					id='pattern6'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use
						xlinkHref='#image3_18_20'
						transform='scale(0.00119048 0.00271739)'
					/>
				</pattern>
				<pattern
					id='pattern7'
					patternContentUnits='objectBoundingBox'
					width='1'
					height='1'
				>
					<use
						xlinkHref='#image4_18_20'
						transform='scale(0.00181159 0.00657895)'
					/>
				</pattern>
				<filter
					id='filter7_i_18_20'
					x='368'
					y='216'
					width='200'
					height='104'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='16' />
					<feGaussianBlur stdDeviation='8' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
				</filter>
				<filter
					id='filter8_i_18_20'
					x='216'
					y='208'
					width='104'
					height='108'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='4' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
				</filter>
				<filter
					id='filter9_i_18_20'
					x='616'
					y='208'
					width='104'
					height='108'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='4' />
					<feGaussianBlur stdDeviation='4' />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2='-1'
						k3='1'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_18_20'
					/>
				</filter>
				<radialGradient
					id='paint0_radial_18_20'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(468) rotate(90) scale(576 936)'
				>
					<stop stopColor='#2A2A31' />
					<stop offset='1' stopColor='#17171A' />
				</radialGradient>
				<radialGradient
					id='paint1_radial_18_20'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(476 456) rotate(90) scale(128 680)'
				>
					<stop stopColor='#333344' />
					<stop offset='1' stopColor='#1B1B25' />
				</radialGradient>
				<radialGradient
					id='paint2_radial_18_20'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(468 184) rotate(90) scale(152 552)'
				>
					<stop stopColor='#292930' />
					<stop offset='1' stopColor='#18181B' />
				</radialGradient>
				<clipPath id='clip0_18_20'>
					<rect width='936' height='584' fill='white' />
				</clipPath>
				<clipPath id='clip1_18_20'>
					<rect
						width='48'
						height='80'
						fill='white'
						transform='translate(344 76)'
					/>
				</clipPath>
				<clipPath id='clip2_18_20'>
					<rect
						width='48'
						height='80'
						fill='white'
						transform='translate(444 76)'
					/>
				</clipPath>
				<clipPath id='clip3_18_20'>
					<rect
						width='48'
						height='80'
						fill='white'
						transform='translate(544 76)'
					/>
				</clipPath>

				{/* Grain */}
				<rect
					id='image0_18_20'
					width='936'
					height='576'
					filter='url(#noise)'
				/>
				<rect
					id='image1_18_20'
					width='16'
					height='16'
					filter='url(#noise)'
				/>
				<rect
					id='image2_18_20'
					width='680'
					height='128'
					filter='url(#noise)'
				/>
				<rect
					id='image3_18_20'
					width='840'
					height='368'
					filter='url(#noise)'
				/>
				<rect
					id='image4_18_20'
					width='552'
					height='152'
					filter='url(#noise)'
				/>
			</defs>
		</svg>
	);
};

export default Casette;
