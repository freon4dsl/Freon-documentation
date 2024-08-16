export class NavTree {
  constructor(name: string, path: string, content: NavTree[]) {
    this.name = name;
    this.path = path;
    this.content = content;
  }

  name: string;
  path: string;
  content?: NavTree[];
}
