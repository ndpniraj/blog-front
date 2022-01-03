import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ value: "", type: "" });
  const [background, setBackground] = useState("");
  const errorContainer = useRef();

  const updateNotification = (type, value) => {
    if (!value) return;

    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setBackground("bg-red-400");
        break;
      case "success":
        setBackground("bg-green-400");
        break;
      case "warning":
        setBackground("bg-orange-400");
        break;
      default:
        setBackground("bg-red-400");
    }
    setNotification({ value, type });
    timeoutId = setTimeout(
      () => setNotification({ value: "", type: "" }),
      2500
    );
  };

  useEffect(() => {
    errorContainer.current?.classList.remove("bottom-14", "opacity-0");
    errorContainer.current?.classList.add("bottom-10", "opacity-1");
    return () => {
      errorContainer.current?.classList.add("bottom-14", "opacity-0");
      errorContainer.current?.classList.remove("bottom-10", "opacity-1");
    };
  }, [notification.value]);

  return (
    <>
      <NotificationContext.Provider value={{ updateNotification }}>
        {children}
      </NotificationContext.Provider>
      {notification.value ? (
        <div
          ref={errorContainer}
          className={`${background} transition-all duration-150 ease-linear fixed bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 p-2 rounded text-white`}
        >
          {notification.value}
        </div>
      ) : null}
    </>
  );
}

export const useNotification = () => useContext(NotificationContext);
