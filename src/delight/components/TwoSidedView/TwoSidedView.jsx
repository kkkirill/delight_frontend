import React from 'react';
import classnames from 'classnames';

import './TwoSidedView.css';

function TwoSidedView({leftSide, rightSide, className}) {
    return (
        <div className={classnames("two-sided-view", className)}>
            <div className="two-sided-view__content">
                {leftSide}
                <div className="two-sided-view__vertical-line"/>
                {rightSide}
            </div>
        </div>
    );
}

export default TwoSidedView;