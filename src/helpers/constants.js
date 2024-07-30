import { format } from 'date-fns'

export const TRANSACTION_STATUS = {
    PENDING: 'Pendiente',
    SELLER_APPROVED: 'Aprobada por el vendedor',
    ENDED: 'Finalizada'
}

export const TRANSACTION_STATUS_LIST = [
    TRANSACTION_STATUS.PENDING,
    TRANSACTION_STATUS.SELLER_APPROVED,
    TRANSACTION_STATUS.ENDED
]

export const STATUS_CODES = {
    SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNIQUE_VIOLATION: 409,
    OK: 200,
    CREATED: 201,
    FORBIDDEN: 403
}

export const OPEN_TYPES = {
    REGISTER: 'REGISTER',
    PURCHASE: 'PURCHASE',
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}

export const SALE_COLUMNS = [
    {
        id: 'id',
        label: '#',
        accessor: 'id'
    },
    {
        id: 'title',
        label: 'Título',
        accessor: 'title'
    },
    {
        id: 'description',
        label: 'Descripción',
        accessor: 'description'
    },
    {
        id: 'price',
        label: 'Precio (ETH)',
        accessor: 'price'
    },
    {
        id: 'is_allowed',
        label: 'Permitido',
        accessor: (row) => row.is_allowed ? 'Sí' : 'No'
    },
    {
        id: 'is_visible',
        label: 'Visible',
        accessor: (row) => row.is_visible ? 'Sí' : 'No'
    },
    {
        id: 'created_at',
        label: 'Creado',
        accessor: (row) => format(new Date(row.created_at), 'dd/MM/yyyy')
    },
    {
        id: 'updated_at',
        label: 'Modificado',
        accessor: (row) => format(new Date(row.updated_at), 'dd/MM/yyyy')
    }
]