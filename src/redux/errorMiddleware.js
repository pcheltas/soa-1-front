import {toast} from "react-toastify";

const errorMiddleware = ({ dispatch }) => next => action => {
    if (action.error || action.payload instanceof Error) {
        const payload = action.payload;
        const status = payload?.status || payload?.response?.status;
        const errorMessage =
            typeof payload === "string"
                ? payload
                : payload?.message || "Произошла ошибка";

        if (status === 404) {
            window.location.href = "/not-found";
        } else {
            setTimeout(() => {
                toast.error(status + ": " + errorMessage, { autoClose: 5000 });
            }, 700);
        }
    }

    return next(action);
};

export default errorMiddleware;