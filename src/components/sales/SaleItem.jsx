import { OPEN_TYPES } from "../../helpers/constants";
import { IPFS_PUBLIC_GATEWAY } from "../../helpers/env";

export function SaleItem({ sale, setPurchase, setOpen }) {
    return (
        <div className="sale-item-container">
            <div className="sale-item-content">
                <div className="sale-item-images">
                    {sale.images.map(i => (
                        <img key={i.id} src={`${IPFS_PUBLIC_GATEWAY}/${i.cid}`} width={250} alt="" />
                    ))}
                </div>
                <div className="sale-item-info">
                    <p>#{sale.id}</p>
                    <p>{sale.title}</p>
                    <p>{sale.description}</p>
                    <p>{sale.price.toFixed(8)} ETH</p>
                </div>
            </div>
            <button type="button" onClick={() => {
                setPurchase(sale)
                setOpen(OPEN_TYPES.PURCHASE)
            }}>
                Comprar
            </button>
        </div>
    )
}