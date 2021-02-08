import { generateAPI } from './generate/api';
import { generateDoc } from './generate/doc';
import schema from "vega-lite/build/vega-lite-schema";
export function build() {
    return Promise.all([
        generateAPI(schema, "src"),
        generateDoc(schema, "docs/api", "vl."),
    ]);
}
