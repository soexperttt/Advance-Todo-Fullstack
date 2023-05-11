const errorToast = (message) => {
  return {
    title: message,
    status: "error",
    position: "top",

    duration: 2000,
    isClosable: false,
  };
};
const warningToast = (message) => {
  return {
    title: message,
    status: "warning",
    position: "top",

    duration: 2000,
    isClosable: false,
  };
};
const successToast = (message) => {
  return {
    title: message,
    status: "success",
    position: "top",

    duration: 2000,
    isClosable: false,
  };
};
export { errorToast, warningToast, successToast };
