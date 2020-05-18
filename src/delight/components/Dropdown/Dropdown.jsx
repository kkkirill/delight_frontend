import React, {useState, useRef} from 'react';
import classnames from 'classnames';
import useOnClickOutside from "../../utils/OnClickOutside";

import './Dropdown.css';

function Dropdown({title, icon, children, upper, className, itemClassName}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useOnClickOutside(ref, () => setIsOpen(false));

    const onDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={ref} className="dropdown">
            <button type="button" className={classnames("dropdown__button", className)} onClick={onDropdownClick}>
                <p className={classnames("dropdown__title", itemClassName)}>{title}</p>
              {icon && <img className="dropdown__icon" src={icon} />}
            </button>
            <div className={classnames('dropdown__content', {dropdown__content_open: isOpen, dropdown__upper: upper})}>{children}</div>
        </div>
    );
}

export default Dropdown;