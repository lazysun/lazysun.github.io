export class Config {
    constructor() {
        this._textMode = 'mathlive';
    }
    isMathliveEnabledForTextMode() {
        if (this._textMode == 'mathlive') {
            return true;
        }
        return false;
    }
    isVisualizationEnabledByDefault() {
        return true;
    }
    getMaxNumforVisualization() {
        return 20;
    }
    isVisualizationShared() {
        return true;
    }
    isTextModeEnabledOnDblClick() {
        return true;
    }
    isGridEnabled() {
        return false;
    }
}
