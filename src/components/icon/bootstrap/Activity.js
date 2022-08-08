import * as React from 'react';

function SvgActivity(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path
				fillRule='evenodd'
				d='M6 2a.5.5 0 01.47.33L10 12.036l1.53-4.208A.5.5 0 0112 7.5h3.5a.5.5 0 010 1h-3.15l-1.88 5.17a.5.5 0 01-.94 0L6 3.964 4.47 8.171A.5.5 0 014 8.5H.5a.5.5 0 010-1h3.15l1.88-5.17A.5.5 0 016 2z'
			/>
		</svg>
	);
}

export default SvgActivity;
