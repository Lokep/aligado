interface IRawData {
  id: number;
  parentId: number;
  title: string;
}

interface ITreeNode extends IRawData {
  children: ITreeNode[];
}

const rawData: IRawData[] = [
  {
    id: 1,
    title: '节点 1',
    parentId: 0,
  },
  {
    id: 2,
    title: '节点 2',
    parentId: 0,
  },
  {
    id: 11,
    title: '节点 1-1',
    parentId: 1,
  },
  {
    id: 12,
    title: '节点 1-2',
    parentId: 1,
  },
  {
    id: 21,
    title: '节点 2-1',
    parentId: 2,
  },
  {
    id: 111,
    title: '节点 1-1-1',
    parentId: 11,
  },
];

const treeTransfer = (list: IRawData): ITreeNode => {};
