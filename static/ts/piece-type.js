export var PieceType;
(function (PieceType) {
    PieceType[PieceType["DIGIT"] = 0] = "DIGIT";
    PieceType[PieceType["NUMBER"] = 1] = "NUMBER";
    PieceType[PieceType["STRING"] = 2] = "STRING";
    PieceType[PieceType["OPERATOR"] = 3] = "OPERATOR";
})(PieceType || (PieceType = {}));
