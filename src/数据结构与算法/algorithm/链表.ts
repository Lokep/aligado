export class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}

export class LinkedList<T> {
  constructor(public element: T) {}

  private length: number = 0;

  private head?: Node<T>;

  /**
   * 向链表尾部插入元素
   * @param element
   */
  public push(element: T): void {
    const node: Node<T> = new Node(element);

    if (this.head === undefined) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.length++;
  }

  /**
   *
   * @param position
   * @param element
   */
  insert(position: number, element: T): Boolean {
    if (position < 0 || position >= this.length) {
      return false;
    }

    const node: Node<T> = new Node(element);

    if (position === 0) {
      const current = this.head;

      node.next = current;
      this.head = node;
    }

    return true;
  }
}
