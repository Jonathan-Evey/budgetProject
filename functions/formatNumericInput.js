const formatExpenseInput = (
  input,
  setNewTotalFunction,
  originalTotal,
  setErrorFunction,
) => {
  input = input.replace(/[^0-9]/g, '');
  if (input.length > 8) {
    setNewTotalFunction(originalTotal);
  } else if (input.length > 5) {
    setNewTotalFunction(
      `${input.slice(0, input.length - 5)},${input.slice(
        input.length - 5,
        input.length - 2,
      )}.${input.slice(input.length - 2, input.length)}`,
    );
  } else if (input.length > 2) {
    setNewTotalFunction(
      `${input.slice(0, input.length - 2)}.${input.slice(
        input.length - 2,
        input.length,
      )}`,
    );
  } else if (input.length === 1) {
    if (input === '0') {
      setNewTotalFunction('');
    } else {
      setErrorFunction(false);
      setNewTotalFunction(input);
    }
  } else {
    setNewTotalFunction(input);
  }
};
export default formatExpenseInput;
