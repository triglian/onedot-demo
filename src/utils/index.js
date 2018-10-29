export const consistencyErrorsPerRow = (errors, length) => {
  var errorsPerRow = [];
  while(length--) errorsPerRow[length] = [];

  errors.forEach( err => {
    errorsPerRow[err.indexA].push(err);
    errorsPerRow[err.indexB].push(err);
  })
  console.log(errorsPerRow)
  return errorsPerRow;
}

