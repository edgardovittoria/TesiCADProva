import {canvasStateSelector, incrementNumberOfGeneratedKey} from "../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";

export const useGetNewKey = () => {
    const canvasState = useSelector(canvasStateSelector);
    const dispatch = useDispatch();
    const newKey = canvasState.numberOfGeneratedKey + 1;
    dispatch(incrementNumberOfGeneratedKey())
    return newKey;
}