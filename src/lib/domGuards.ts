/**
 * La traduction automatique (GTranslate / Google Translate) remplace des nœuds de texte
 * par des <font>. React tente ensuite de retirer ou d'insérer des nœuds qui ne sont plus
 * là où il les attend et plante (« Failed to execute 'removeChild' on 'Node' »).
 * Ces deux garde-fous ignorent ces opérations devenues impossibles au lieu de lever une erreur.
 */
export function installDomGuards() {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}
