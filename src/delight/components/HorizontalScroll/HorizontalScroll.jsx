import React, {useRef, useState} from 'react';
import classnames from 'classnames';
import useSmoothScroll from 'use-smooth-scroll';

import './HorizontalScroll.css';

function HorizontalScroll({className, children}) {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [leftButtonVisible, setLeftButtonVisible] = useState(false);
  const [rightButtonVisible, setRightButtonVisible] = useState(true);

  const innerData = children.map((val, index) => (
    <div className="horizontal-scroll__wrapper" key={index}>{val}</div>
  ));

  const getScrollWidth = node => node.scrollWidth;
  const getCurrentWidth = node => node.offsetWidth;

  const ref = React.useRef();
  const scrollTo = useSmoothScroll('x', ref);

  const scrollLeft = () => {
    let nextScroll;

    if (currentScroll - 200 > 0) {
      nextScroll = currentScroll - 200;
      setLeftButtonVisible(true);
    } else {
      nextScroll = 0;
      setLeftButtonVisible(false);
    }
    setRightButtonVisible(true);

    scrollTo(nextScroll);
    setCurrentScroll(nextScroll);
  };

  const scrollRight = () => {
    const maxWidth = getScrollWidth(ref.current) - getCurrentWidth(ref.current);
    let nextScroll;

    if (currentScroll + 200 < maxWidth) {
      nextScroll = currentScroll + 200;
      setRightButtonVisible(true);
    } else {
      nextScroll = maxWidth;
      setRightButtonVisible(false);
    }
    setLeftButtonVisible(true);

    scrollTo(nextScroll);
    setCurrentScroll(nextScroll);
  };

  return (
    <div className={classnames('horizontal-scroll', className)}>
      {innerData.length &&
      <>
        {leftButtonVisible &&
        <button className="horizontal-scroll__left" onClick={scrollLeft}>{''}</button>}
        <div ref={ref} className="horizontal-scroll__center">{innerData}</div>
        {rightButtonVisible &&
        <button className="horizontal-scroll__right" onClick={scrollRight}>{''}</button>}
      </>
      }
    </div>
  );
}

export default HorizontalScroll;
