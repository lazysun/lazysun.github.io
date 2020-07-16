export class HighlightConfig {
   isCircularFocusEnabled():boolean {
       return true;
   }

   getFocusRadius():number {
     return 60;
   }

   isDragRectEnabled():boolean { //circular focus will be disabled
     return false;
   }

   leaveMarkEnabled():boolean {
     return true;
   }

  isBorderEnabled() {
    return true;
  }

  isGridEnabled() {
     return false;
  }
}