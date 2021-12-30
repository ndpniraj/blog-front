import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const ErrorContext = createContext();

let timeoutId;

let background = "";
export default function ErrorProvider({ children }) {
  const [notification, setNotification] = useState({ value: "", type: "" });
  //   const [background, setBackground] = useState("red");
  const errorContainer = useRef();

  const updateError = (type, value) => {
    if (!value) return;

    if (timeoutId) clearTimeout(timeoutId);

    setNotification({ value, type });
    switch (type) {
      case "error":
        background = "red";
        break;
      case "success":
        background = "green";
        break;
      case "warning":
        background = "orange";
        break;
      default:
        background = "red";
    }
    timeoutId = setTimeout(
      () => setNotification({ value: "", type: "" }),
      2500
    );
    // console.log(background);
  };

  const hideNotification = (classesToHide, classesToDisplay) => {
    timeoutId = setTimeout(() => {
      setNotification({ value: "", type: "" });
      errorContainer.current?.classList.add(...classesToHide);
      errorContainer.current?.classList.remove(...classesToDisplay);
    }, 2500);
  };

  const displayNotification = () => {
    const { type } = notification;

    let background = "";
    switch (type) {
      case "error":
        background = "red";
        break;
      case "success":
        background = "green";
        break;
      case "warning":
        background = "orange";
        break;
      default:
        background = "red";
    }

    const classesToHide = ["bottom-14", "opacity-0"];
    const classesToDisplay = ["bottom-10", "opacity-1", background];

    errorContainer.current?.classList.remove(...classesToHide);
    errorContainer.current?.classList.add(...classesToDisplay);
    hideNotification(classesToHide, classesToDisplay);
  };

  useEffect(() => {
    // displayNotification();
    // console.log(errorContainer);
    errorContainer.current?.classList.remove("bottom-14", "opacity-0");
    errorContainer.current?.classList.add("bottom-10", "opacity-1");
    return () => {
      errorContainer.current?.classList.add("bottom-14", "opacity-0");
      errorContainer.current?.classList.remove("bottom-10", "opacity-1");
    };
  }, [notification.value]);

  return (
    <>
      <ErrorContext.Provider value={{ updateError }}>
        {children}
      </ErrorContext.Provider>
      {notification.value ? (
        <div
          ref={errorContainer}
          className={
            `bg-${background}-400` +
            " transition-all duration-150 ease-linear fixed bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 p-2 text-white rounded"
          }
        >
          {notification.value}
        </div>
      ) : null}
    </>
  );
}

export const useError = () => useContext(ErrorContext);
