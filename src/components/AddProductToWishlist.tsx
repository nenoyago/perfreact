export interface AddProductToWishlistProps {
  onAddToWishlist: () => void;
  onRequestToClose: () => void;
}

export function AddProductToWishlist({ onAddToWishlist, onRequestToClose }: AddProductToWishlistProps) {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button type="button" onClick={onAddToWishlist}>
        Sim
      </button>
      <button type="button" onClick={onRequestToClose}>
        Nao
      </button>
    </span>
  );
}
