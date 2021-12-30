import {FC} from "react";
import {Component} from "../canvas/components/Component";
import { ComponentEntity, FactoryShapes } from "@Draco112358/cad-library";


interface FactoryComponentProps {
    entity: ComponentEntity,
}

export const FactoryComponent: FC<FactoryComponentProps> = ({entity}) => {
    return (
        <Component key={entity.keyComponent} keyComponent={entity.keyComponent} transformationParams={entity.transformationParams}>
                <FactoryShapes entity={entity}/>
        </Component>
    )
}



