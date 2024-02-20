export class SelectionModel<K, V> {
  private selection = new Map<K, V>();

  set(key: K, value: V) {
    this.selection.set(key, value);
  }

  get(key: K): V | undefined {
    return this.selection.get(key);
  }
}
