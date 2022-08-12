export const capitalizeFirstLetter = (str: string) => {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};

export const toggleShowPassword = (
  isPasswordShowing: boolean,
  cb: (a: boolean) => void
) => {
  if (isPasswordShowing === true) {
    cb(false);
  } else {
    cb(true);
  }
};

export const UrlExists = (url: string | URL) => {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status;
}
