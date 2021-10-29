import { ComponentEntity, CompositeEntity, CubeEntity } from "../../model/ComponentEntity";
import { Cube, CubeProps } from "../canvas/components/cube";
import { selectComponent } from "../../store/canvasSlice";
import { useDispatch } from 'react-redux';
import { CSG } from 'three-csg-ts';



export const FactoryComponent2 = (entity: ComponentEntity, orbit: React.MutableRefObject<null>) => {




    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity

            let cubeProps: CubeProps = { color: cubeEntity.color, width: cubeEntity.width, height: cubeEntity.height, depth: cubeEntity.depth }
            return (
                Cube(cubeProps)
            )

        case "SUBTRACTION":
            let subtractionEntity = entity as CompositeEntity
            let elementToSubtract = FactoryComponent2(subtractionEntity.elementKeys.componentToSubtract, orbit)
            elementToSubtract?.geometry.computeBoundingBox()
            elementToSubtract?.updateMatrix()
            //elementToSubtract?.applyMatrix4(elementToSubtract.matrixWorld)
            let elementThatSubtract = FactoryComponent2(subtractionEntity.elementKeys.componentThatSubtract, orbit)
            elementThatSubtract?.geometry.computeBoundingBox()
            elementThatSubtract?.updateMatrix()
            //elementThatSubtract?.applyMatrix4(elementThatSubtract.matrixWorld)
           

            if (elementThatSubtract && elementToSubtract) {
                let newMesh = CSG.subtract(elementToSubtract, elementThatSubtract)
                return newMesh
            } else { return null }

        default: return null

    }



}