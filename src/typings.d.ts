/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery<TElement extends Node = HTMLElement> extends Iterable<TElement> {
  mCustomScrollbar(options?: any, callback?: Function) : any;
}
