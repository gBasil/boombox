const Stripes = (props: { absolute?: boolean; }) => (
	/* Note: With "fixed", it doesn't scroll */
	<div className={` ${props.absolute ? 'absolute' : 'fixed'} inset-0 -z-50 h-full [@media_(max-width:_936px)]:hidden`}>
		<div className='m-auto flex h-full w-page justify-between'>
			{/* Not pixel perfect nor pretty code. Dashed borders are weird */}
			<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
			<div className='flex flex-row gap-[24px]'>
				<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
				<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
			</div>
			<div className='flex flex-row gap-[24px]'>
				<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
				<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
			</div>
			<div className='flex flex-row gap-[24px]'>
				<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
				<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
			</div>
			<div className='h-full w-0 border-l-[1px] border-dashed border-darkGreen' />
		</div>
	</div>
);

export default Stripes;
