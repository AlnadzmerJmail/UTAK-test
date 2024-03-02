import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const buttonIcons = {
	trash: faTrash,
	pen: faPen,
	create: faPlus,
};

const buttonClassNames = {
	create: 'create-btn',
	danger: 'danger-btn',
	primary: 'primary-btn',
};

export function MyButton({
	type,
	variant,
	onClick,
	icon,
	ml = 0,
	mr = 0,
	className = '',
	label = '',
}) {
	const otherProps = type === 'submit' ? {} : { onClick };
	return (
		<button
			type={type || 'button'}
			className={`${buttonClassNames[variant]} ${className}`}
			style={{ marginLeft: ml, marginRight: mr }}
			{...otherProps}
		>
			{icon && <FontAwesomeIcon icon={buttonIcons[icon]} />} {label}
		</button>
	);
}

MyButton.defaultProps = {
	onClick: () => alert('You were not passing Click Handler!'),
};
