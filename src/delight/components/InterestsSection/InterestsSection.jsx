import React from 'react';
import classnames from 'classnames';

import './InterestsSection.css';

function InterestsSection({ className, children }) {
    return (
        <div className={classnames("interests-section", className)}>
            {children}
        </div>
    )
}

export default InterestsSection;
