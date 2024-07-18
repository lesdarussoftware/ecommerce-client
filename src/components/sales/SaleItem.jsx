import { useContext } from "react";

import { AuthContext } from "../../providers/AuthProvider";

import { IPFS_PUBLIC_GATEWAY } from "../../helpers/urls";

export function SaleItem({ sale, setPurchase }) {

    const { auth } = useContext(AuthContext)

    return (
        <div className="sale-item-container">
            <div className="sale-item-content">
                <div className="sale-item-images">
                    {sale.images.map(i => (
                        <img key={i.id} src={`${IPFS_PUBLIC_GATEWAY}/${i.cid}`} width={250} alt="" />
                    ))}
                </div>
                <div className="sale-item-info">
                    <p>{sale.description}</p>
                </div>
            </div>
            {auth && auth !== sale.seller &&
                <button type="button" onClick={() => setPurchase(sale)}>
                    Comprar
                </button>
            }
        </div>
    )
}