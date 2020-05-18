import React, {useEffect, useState} from 'react';
import classnames from 'classnames';

import './MultipleSelection.css';

function MultipleSelection({className, options, selected, nameField, setSelected}) {
  const onSelect = e => {
    setSelected([].filter.call(e.target.options, each => each.selected).map(each => each.value));
  }

  options = options.results || options || [];
  selected = selected || [];

  return (<select multiple onChange={onSelect} className={classnames('multiple-selection', className)}>
    {options.map((each, key) => <option value={key} selected={selected.includes(key)}>{nameField ? each[nameField] : each}</option>)}
  </select>);
}

export default MultipleSelection;