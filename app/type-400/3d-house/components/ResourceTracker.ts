import { Object3D } from "three";

export class ResourceTracker {

    public resources: any[]

    public constructor() {
        this.resources = [];
    }

    public track(resource: any) {
        if (resource.dispose || resource instanceof Object3D) {
            this.resources.push(resource);
        }
        console.log("this.resources:", this.resources);

        return resource
    }

    public untrack(resource: any) {
        const index = this.resources.indexOf(resource);
        if (index !== -1) {
            this.resources.splice(index, 1);
        }
    }

    public dispose() {

        this.resources.forEach(resource => {

            if (resource instanceof Object3D && resource.parent) {
                resource.parent.remove(resource);
                console.log("11111111");

            }

            if (resource.dispose) {
                console.log("2222222");

                resource.dispose();
            }
        });

    }

}