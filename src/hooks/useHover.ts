import {useCallback, useState} from "react";

const useHover = () => {
    const [hovered, setHover] = useState(false)
    const hover = useCallback((e) => (e.stopPropagation(), setHover(true)), [])
    const unhover = useCallback((e) => setHover(false), [])
    return [{ onPointerOver: hover, onPointerOut: unhover }, hovered]
}
