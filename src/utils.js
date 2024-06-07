export function isAllLetters(input) {
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const charCode = char.charCodeAt(0);

    // Check if the character is not a letter (A-Z or a-z)
    if (
      !(
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      )
    ) {
      return false;
    }
  }
  return true;
}
export const saveToLocaleStorage = (dataString, data) => {
  console.log(data);
  localStorage.setItem(dataString, data);
};
export const getDataFromLocalStorage = (dataString) => {
  const getDataFromLocalStorage = localStorage.getItem(dataString);

  const parseddataString = JSON.parse(getDataFromLocalStorage);
  return parseddataString ? parseddataString : 0;
};
