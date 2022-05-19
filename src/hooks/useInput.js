import { useState } from 'react';
import useValidation from './useValidation';

const useInput = (initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const error = useValidation(value, type);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    isDirty,
    error,
    onChange,
    onBlur,
  };
};

export default useInput;
